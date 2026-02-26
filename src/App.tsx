import { useState, useEffect } from "react"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { InteractiveTabs } from "@/components/landing/InteractiveTabs"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"
import { Toaster } from "@/components/ui/sonner"
import { AuthModal, type AuthUser } from "@/components/auth/AuthModal"
import { ClientPortal } from "@/components/portals/ClientPortal"
import { AdminPortal } from "@/components/portals/AdminPortal"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useKV<AuthUser | null>("current-user", null)
  const [showPortal, setShowPortal] = useState(false)

  useEffect(() => {
    const initAdminUser = async () => {
      const users = await window.spark.kv.get<AuthUser[]>("auth-users")
      if (!users || users.length === 0) {
        const adminUser: AuthUser = {
          id: "admin-1",
          email: "admin@nextphaseit.co.uk",
          name: "Admin User",
          role: "admin",
          createdAt: new Date().toISOString()
        }
        await window.spark.kv.set("auth-users", [adminUser])
      }
    }
    initAdminUser()
  }, [])

  useEffect(() => {
    if (currentUser) {
      setShowPortal(true)
    } else {
      setShowPortal(false)
    }
  }, [currentUser])

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user)
    toast.success(`Welcome ${user.role === "admin" ? "Admin" : "to your portal"}!`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setShowPortal(false)
    toast.success("Logged out successfully")
  }

  const handleBackToHome = () => {
    setShowPortal(false)
  }

  if (showPortal && currentUser) {
    if (currentUser.role === "admin") {
      return <AdminPortal onBackToHome={handleBackToHome} />
    } else {
      return <ClientPortal user={currentUser} onBackToHome={handleBackToHome} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser ? { name: currentUser.name, role: currentUser.role } : null}
      />
      <Hero />
      <Problem />
      <InteractiveTabs />
      <FinalCTA />
      <Footer />
      <Toaster />
      <AuthModal 
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  )
}

export default App