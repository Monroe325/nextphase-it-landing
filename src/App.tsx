import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { Solution } from "@/components/landing/Solution"
import { Process } from "@/components/landing/Process"
import { Outcomes } from "@/components/landing/Outcomes"
import { TargetClient } from "@/components/landing/TargetClient"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Outcomes />
      <TargetClient />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default App