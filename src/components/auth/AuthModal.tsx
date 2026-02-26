import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { User, Lock } from "@phosphor-icons/react"
import { PasswordResetModal } from "./PasswordResetModal"
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const user = users?.find(u => u.email === loginEmail.toLowerCase())
    
    if (!user) {
      toast.error("Invalid email or password")
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
      createdAt: new Date().toISOString()
    }

    setUsers((current) => [...(current || []), newUser])
    
    await EmailService.sendWelcomeEmail(newUser.email, newUser.name)
    
    toast.success("Account created successfully!")
    onAuthSuccess(newUser)
    onOpenChange(false)
    setSignupName("")
    setSignupEmail("")
    setSignupPassword("")
    setSignupConfirmPassword("")
    setIsLoading(false)
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
    </Dialog>
  )
}
