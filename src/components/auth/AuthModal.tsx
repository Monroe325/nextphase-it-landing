import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { User, Lock, Warning } from "@phosphor-icons/react"
import { PasswordResetModal } from "./PasswordResetModal"
import { EmailVerificationModal } from "./EmailVerificationModal"
import { EmailService } from "@/lib/emailService"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthSuccess: (user: AuthUser) => void
}

export interface AuthUser {
  id: string
  email: string
  name: string
  role: "client" | "admin"
  createdAt: string
  emailVerified?: boolean
}

export function AuthModal({ open, onOpenChange, onAuthSuccess }: AuthModalProps) {
  const [users, setUsers] = useKV<AuthUser[]>("auth-users", [])
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [verificationModalOpen, setVerificationModalOpen] = useState(false)
  const [pendingUser, setPendingUser] = useState<{ email: string; name: string; userId: string } | null>(null)
  const [showUnverifiedMessage, setShowUnverifiedMessage] = useState(false)
  const [unverifiedUserInfo, setUnverifiedUserInfo] = useState<{ email: string; name: string; userId: string } | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const user = users?.find(u => u.email === loginEmail.toLowerCase())
    
    if (!user) {
      toast.error("Invalid email or password")
      setIsLoading(false)
      setShowUnverifiedMessage(false)
      setUnverifiedUserInfo(null)
      return
    }

    if (!user.emailVerified) {
      toast.error("Please verify your email before logging in", {
        description: "Check your inbox for the verification code"
      })
      setUnverifiedUserInfo({ email: user.email, name: user.name, userId: user.id })
      setShowUnverifiedMessage(true)
      setIsLoading(false)
      return
    }

    await EmailService.sendLoginAlertEmail(user.email, user.name)

    toast.success(`Welcome back, ${user.name}!`)
    onAuthSuccess(user)
    onOpenChange(false)
    setLoginEmail("")
    setLoginPassword("")
    setIsLoading(false)
    setShowUnverifiedMessage(false)
    setUnverifiedUserInfo(null)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (signupPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    const existingUser = users?.find(u => u.email === signupEmail.toLowerCase())
    if (existingUser) {
      toast.error("An account with this email already exists")
      setIsLoading(false)
      return
    }

    const newUser: AuthUser = {
      id: Date.now().toString(),
      email: signupEmail.toLowerCase(),
      name: signupName,
      role: "client",
      createdAt: new Date().toISOString(),
      emailVerified: false
    }

    setUsers((current) => [...(current || []), newUser])
    
    toast.success("Account created! Please verify your email.", {
      description: "Check your inbox for the verification code"
    })

    setPendingUser({ email: newUser.email, name: newUser.name, userId: newUser.id })
    setSignupName("")
    setSignupEmail("")
    setSignupPassword("")
    setSignupConfirmPassword("")
    setIsLoading(false)
    onOpenChange(false)
    setVerificationModalOpen(true)
  }

  const handleVerificationComplete = async () => {
    if (!pendingUser) return

    const updatedUsers = await window.spark.kv.get<AuthUser[]>("auth-users") || []
    const verifiedUser = updatedUsers.find(u => u.id === pendingUser.userId)

    if (verifiedUser) {
      await EmailService.sendWelcomeEmail(verifiedUser.email, verifiedUser.name)
      toast.success("Email verified successfully! Welcome to NextPhase IT")
      onAuthSuccess(verifiedUser)
    }

    setPendingUser(null)
  }

  const handleResendVerificationCode = async () => {
    if (!unverifiedUserInfo) return
    
    setPendingUser(unverifiedUserInfo)
    setVerificationModalOpen(true)
    setShowUnverifiedMessage(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to NextPhase IT</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              {showUnverifiedMessage && unverifiedUserInfo && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <Warning size={20} className="text-accent mt-0.5 flex-shrink-0" weight="duotone" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Email Not Verified</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your account exists but needs verification. Check your email for the verification code.
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={handleResendVerificationCode}
                  >
                    Resend Verification Code
                  </Button>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <Button
                type="button"
                variant="link"
                className="w-full text-sm"
                onClick={() => {
                  onOpenChange(false)
                  setResetModalOpen(true)
                }}
              >
                Forgot password?
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Demo: Use any registered email to login
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="bg-muted/50 border border-border rounded-lg p-3 flex items-start gap-2">
                <Warning size={20} className="text-accent mt-0.5 flex-shrink-0" weight="duotone" />
                <p className="text-xs text-muted-foreground">
                  You'll need to verify your email address before you can log in
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Smith"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@company.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                New accounts are created as Client users
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
      <PasswordResetModal open={resetModalOpen} onOpenChange={setResetModalOpen} />
      {pendingUser && (
        <EmailVerificationModal 
          open={verificationModalOpen}
          onOpenChange={setVerificationModalOpen}
          email={pendingUser.email}
          name={pendingUser.name}
          userId={pendingUser.userId}
          onVerificationComplete={handleVerificationComplete}
        />
      )}
    </Dialog>
  )
}
