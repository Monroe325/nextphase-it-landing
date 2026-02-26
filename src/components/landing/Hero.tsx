import { Calendar } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
          Transform Your Business Operations Into Scalable Systems
        </h1>
        
        <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
          Custom CRM, workflow automation, and operational systems for UK trades and service businesses.
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
