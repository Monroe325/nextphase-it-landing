import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { Process } from "@/components/landing/Process"
import { Pricing } from "@/components/landing/Pricing"
import { Testimonials } from "@/components/landing/Testimonials"
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
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App