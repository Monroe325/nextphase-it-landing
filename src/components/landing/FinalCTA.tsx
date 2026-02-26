import { Button } from "@/components/ui/button"
import { Calendar, Envelope } from "@phosphor-icons/react"
import { ContactForm } from "./ContactForm"

export function FinalCTA() {
  return (
    <section className="py-12 md:py-16 px-4 bg-muted">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to Transform Your Operations?
        </h2>
        
        <p className="text-lg text-secondary mb-8">
          Book a free systems audit or send us a message.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-6 h-auto transition-all duration-200"
            onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
          >
            <Calendar className="mr-2" size={20} />
            Book Free Audit
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="px-6 py-6 h-auto"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Envelope className="mr-2" size={20} />
            Send Message
          </Button>
        </div>
        
        <div id="contact-form" className="max-w-2xl mx-auto bg-background p-6 rounded-xl border border-border">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
