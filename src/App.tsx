import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { InteractiveTabs } from "@/components/landing/InteractiveTabs"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problem />
      <InteractiveTabs />
      <FinalCTA />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App