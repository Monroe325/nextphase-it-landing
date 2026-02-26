import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Envelope, Key, Lock } from "@phosphor-icons/react"
import { EmailService } from "@/lib/emailService"
import type { AuthUser } from "./AuthModal"

interface PasswordResetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface PasswordResetToken {
  email: string
  token: string
  expiresAt: string
}

export function PasswordResetModal({ open, onOpenChange }: PasswordResetModalProps) {
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request')
  const [email, setEmail] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    setStep('request')
    setEmail("")
    setResetToken("")
    setNewPassword("")
    setConfirmPassword("")
    onOpenChange(false)
  }

  const generateResetToken = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const users = await window.spark.kv.get<AuthUser[]>("auth-users") || []
    const user = users.find(u => u.email === email.toLowerCase())

    if (!user) {
      toast.error("If an account exists with this email, a reset code will be sent")
      setIsLoading(false)
      return
    }

    const token = generateResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString()

    const resetTokenData: PasswordResetToken = {
      email: email.toLowerCase(),
      token,
      expiresAt
    }

    const existingTokens = await window.spark.kv.get<PasswordResetToken[]>("password-reset-tokens") || []
    const filteredTokens = existingTokens.filter(t => t.email !== email.toLowerCase())
    await window.spark.kv.set("password-reset-tokens", [...filteredTokens, resetTokenData])

    await EmailService.sendPasswordResetEmail(user.email, token)

    toast.success("Reset code sent! Check the console for the code (demo mode)")
    console.log(`🔑 Password Reset Code for ${user.email}: ${token}`)
    
    setStep('verify')
    setIsLoading(false)
  }

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const resetTokens = await window.spark.kv.get<PasswordResetToken[]>("password-reset-tokens") || []
    const tokenData = resetTokens.find(t => t.email === email.toLowerCase() && t.token === resetToken)

    if (!tokenData) {
      toast.error("Invalid reset code")
      setIsLoading(false)
      return
    }

    if (new Date(tokenData.expiresAt) < new Date()) {
      toast.error("Reset code has expired. Please request a new one")
      setStep('request')
      setIsLoading(false)
      return
    }

    toast.success("Code verified! Set your new password")
    setStep('reset')
    setIsLoading(false)
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    const users = await window.spark.kv.get<AuthUser[]>("auth-users") || []
    const user = users.find(u => u.email === email.toLowerCase())

    if (!user) {
      toast.error("User not found")
      setIsLoading(false)
      return
    }

    const resetTokens = await window.spark.kv.get<PasswordResetToken[]>("password-reset-tokens") || []
    const filteredTokens = resetTokens.filter(t => t.email !== email.toLowerCase())
    await window.spark.kv.set("password-reset-tokens", filteredTokens)

    await EmailService.sendPasswordChangedEmail(user.email, user.name)

    toast.success("Password changed successfully! You can now login")
    handleClose()
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Reset Password</DialogTitle>
          <DialogDescription>
            {step === 'request' && "Enter your email to receive a password reset code"}
            {step === 'verify' && "Enter the 6-digit code sent to your email"}
            {step === 'reset' && "Enter your new password"}
          </DialogDescription>
        </DialogHeader>

        {step === 'request' && (
          <form onSubmit={handleRequestReset} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <div className="relative">
                <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Code"}
              </Button>
            </div>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyToken} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="reset-token">6-Digit Reset Code</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="reset-token"
                  type="text"
                  placeholder="123456"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  className="pl-10 text-center text-2xl tracking-widest"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setStep('request')}>
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </div>

            <Button
              type="button"
              variant="link"
              className="w-full text-sm"
              onClick={() => {
                setStep('request')
                toast.info("Request a new reset code")
              }}
            >
              Didn't receive the code? Request new one
            </Button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="confirm-new-password"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
