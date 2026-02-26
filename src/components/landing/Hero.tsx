import { Calendar } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-6">
          Transform Your Business Operations Into Scalable Systems
        </h1>
        
        <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-3xl mx-auto">
          We design and implement custom CRM, workflow, and automation systems for UK trades and service businesses ready to operate efficiently and scale confidently.
        </p>
        
        <div className="mb-8">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 h-auto transition-all duration-200"
            onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
          >
            <Calendar className="mr-2" size={24} />
            Book a Free Systems Audit
          </Button>
        </div>
        
        <p className="text-base text-muted-foreground font-medium">
          Operational clarity. Automated processes. Measurable growth.
        </p>
      </div>
    </section>
  )
}
