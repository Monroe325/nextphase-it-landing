import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { Solution } from "@/components/landing/Solution"
import { Process } from "@/components/landing/Process"
import { Outcomes } from "@/components/landing/Outcomes"
import { Testimonials } from "@/components/landing/Testimonials"
import { TargetClient } from "@/components/landing/TargetClient"
import { FAQ } from "@/components/landing/FAQ"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Outcomes />
      <Testimonials />
      <TargetClient />
      <FAQ />
      <FinalCTA />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App