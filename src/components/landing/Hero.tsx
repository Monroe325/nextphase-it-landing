import { useState } from "react"
import { Calendar, Envelope } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "./ContactForm"

export function Hero() {
  const [activeTab, setActiveTab] = useState("book")

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-6">
          Transform Your Business Operations Into Scalable Systems
        </h1>
        
        <p className="text-lg md:text-xl text-secondary leading-relaxed mb-12 max-w-3xl mx-auto">
          We design and implement custom CRM, workflow, and automation systems for UK trades and service businesses ready to operate efficiently and scale confidently.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="book" className="text-base">
              <Calendar className="mr-2" size={20} />
              Book a Call
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-base">
              <Envelope className="mr-2" size={20} />
              Send Message
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="mt-0">
            <div className="space-y-6">
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Schedule a free 30-minute systems audit call to discuss your operational challenges and explore solutions.
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
          </TabsContent>
          
          <TabsContent value="contact" className="mt-0">
            <div className="space-y-6">
              <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
                Prefer to send us a message? Fill out the form below and we'll respond within 24 hours.
              </p>
              <ContactForm />
            </div>
          </TabsContent>
        </Tabs>
        
        <p className="text-base text-muted-foreground font-medium">
          Operational clarity. Automated processes. Measurable growth.
        </p>
      </div>
    </section>
  )
}
