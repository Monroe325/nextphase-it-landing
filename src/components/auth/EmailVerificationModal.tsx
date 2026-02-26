import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react"
import { EmailService } from "@/lib/emailService"

interface EmailVerificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  name: string
  userId: string
  onVerificationComplete: () => void
}

interface VerificationToken {
  userId: string
  code: string
  createdAt: string
  expiresAt: string
}

export function EmailVerificationModal({ 
  open, 
  onOpenChange, 
  email, 
  name, 
  userId,
  onVerificationComplete 
}: EmailVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (open) {
      sendVerificationCode()
    }
  }, [open])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendVerificationCode = async () => {
    const code = generateVerificationCode()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    const token: VerificationToken = {
      userId,
      code,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    }

    const existingTokens = await window.spark.kv.get<VerificationToken[]>('verification-tokens') || []
    const filteredTokens = existingTokens.filter(t => t.userId !== userId)
    
    await window.spark.kv.set('verification-tokens', [...filteredTokens, token])
    await EmailService.sendVerificationEmail(email, name, code)
    setCountdown(60)
  }

  const handleResendCode = async () => {
    if (countdown > 0) return
    
    setIsResending(true)
    await sendVerificationCode()
    toast.success("Verification code resent to your email")
    setIsResending(false)
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const tokens = await window.spark.kv.get<VerificationToken[]>('verification-tokens') || []
    const token = tokens.find(t => t.userId === userId)

    if (!token) {
      toast.error("Verification token not found. Please request a new code.")
      setIsLoading(false)
      return
    }

    const now = new Date()
    const expiresAt = new Date(token.expiresAt)

    if (now > expiresAt) {
      toast.error("Verification code has expired. Please request a new code.")
      setIsLoading(false)
      return
    }

    if (verificationCode !== token.code) {
      toast.error("Invalid verification code. Please try again.")
      setIsLoading(false)
      return
    }

    const users = await window.spark.kv.get<any[]>('auth-users') || []
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, emailVerified: true } : u
    )
    await window.spark.kv.set('auth-users', updatedUsers)

    const filteredTokens = tokens.filter(t => t.userId !== userId)
    await window.spark.kv.set('verification-tokens', filteredTokens)

    toast.success("Email verified successfully!")
    setVerificationCode("")
    setIsLoading(false)
    onVerificationComplete()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
            <EnvelopeSimple size={24} className="text-accent" weight="duotone" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Verify Your Email</DialogTitle>
          <DialogDescription className="text-center">
            We've sent a 6-digit verification code to <strong>{email}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleVerify} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-2xl tracking-widest font-mono"
              maxLength={6}
              required
              autoFocus
            />
            <p className="text-xs text-muted-foreground text-center">
              The code will expire in 24 hours
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading || verificationCode.length !== 6}>
            <CheckCircle size={18} className="mr-2" weight="bold" />
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
          
          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-sm"
              onClick={handleResendCode}
              disabled={isResending || countdown > 0}
            >
              {isResending ? "Sending..." : countdown > 0 ? `Resend code in ${countdown}s` : "Didn't receive the code? Resend"}
            </Button>
          </div>
        </form>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Check your spam folder if you don't see the email. If you're still having issues, contact us at info@nextphaseit.co.uk
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
