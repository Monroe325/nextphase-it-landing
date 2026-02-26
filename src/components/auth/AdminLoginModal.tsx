import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { ShieldCheck, Lock, User } from "@phosphor-icons/react"
import type { AuthUser } from "./AuthModal"

interface AdminLoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdminAuthSuccess: (admin: AuthUser) => void
}

export function AdminLoginModal({ open, onOpenChange, onAdminAuthSuccess }: AdminLoginModalProps) {
  const [users] = useKV<AuthUser[]>("auth-users", [])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    const user = users?.find(u => u.email === email.toLowerCase() && u.role === "admin")
    
    if (!user) {
      toast.error("Invalid admin credentials", {
        description: "Only admin accounts can access this portal"
      })
      setIsLoading(false)
      return
    }

    if (!user.emailVerified) {
      toast.error("Admin account not verified", {
        description: "Please contact system administrator"
      })
      setIsLoading(false)
      return
    }

    toast.success(`Welcome back, Admin!`)
    onAdminAuthSuccess(user)
    onOpenChange(false)
    setEmail("")
    setPassword("")
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <ShieldCheck size={28} className="text-accent" weight="duotone" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Admin Portal Access</DialogTitle>
          <DialogDescription className="text-center">
            Restricted access for NextPhase IT administrators only
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleAdminLogin} className="space-y-4 mt-4">
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
            <p className="text-xs text-center text-muted-foreground">
              This is a secure admin-only area. Client accounts cannot access this portal.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@nextphaseit.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Access Admin Portal"}
          </Button>
          
          <div className="text-center pt-2">
            <Button
              type="button"
              variant="link"
              className="text-sm"
              onClick={() => onOpenChange(false)}
            >
              Back to main site
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
