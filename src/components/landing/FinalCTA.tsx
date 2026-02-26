import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Envelope } from "@phosphor-icons/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "./ContactForm"

export function FinalCTA() {
  const [activeTab, setActiveTab] = useState("book")

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          Your Business Deserves Systems Built for Growth
        </h2>
        
        <p className="text-lg md:text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop managing your business through scattered spreadsheets and fragmented tools. Let's build the operational infrastructure you need to scale with confidence.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
      </div>
    </section>
  )
}
