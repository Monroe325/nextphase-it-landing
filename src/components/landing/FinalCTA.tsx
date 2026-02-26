import { Button } from "@/components/ui/button"
import { Calendar } from "@phosphor-icons/react"

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          Your Business Deserves Systems Built for Growth
        </h2>
        
        <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          Stop managing your business through scattered spreadsheets and fragmented tools. Let's build the operational infrastructure you need to scale with confidence.
        </p>
        
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 h-auto transition-all duration-200"
          onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
        >
          <Calendar className="mr-2" size={24} />
          Book a Free Systems Audit
        </Button>
      </div>
    </section>
  )
}
