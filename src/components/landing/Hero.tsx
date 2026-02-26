import { Calendar, X, CheckCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ScrollIndicator } from "./ScrollIndicator"

export function Hero() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight mb-3">
          Transform Your Business Operations Into Scalable Systems
        </h1>
        
        <p className="text-base text-secondary leading-relaxed mb-6 max-w-2xl mx-auto">
          Custom CRM, workflow automation, and operational systems for UK trades and service businesses.
        </p>
        
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-5 h-auto transition-all duration-200"
          onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
        >
          <Calendar className="mr-2" size={20} />
          Book a Free Systems Audit
        </Button>

        <ScrollIndicator 
          targetId="problem-section" 
          label="See How We Help" 
          variant="hero"
          previewTitle="From Chaos to Structure"
          previewDescription="See the challenges we solve and the systems we build for UK businesses"
          previewIcon={<CheckCircle size={20} weight="fill" />}
        />
      </div>
    </section>
  )
}
