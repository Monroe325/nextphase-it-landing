import { Card } from "@/components/ui/card"
import { Quotes } from "@phosphor-icons/react"

export function Testimonials() {
  const testimonials = [
    {
      quote: "NextPhase IT transformed our job tracking from chaos to clarity. Our admin time has dropped by 8 hours a week.",
      author: "James Mitchell",
      company: "Mitchell & Sons Electrical, Surrey"
    },
    {
      quote: "The automated invoicing system they built has cut our billing cycle from 2 weeks to 3 days.",
      author: "David Chen",
      company: "Chen Plumbing Services, London"
    }
  ]

  return (
    <section className="py-12 md:py-16 px-4 bg-muted">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          Client Results
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-border bg-background relative">
              <Quotes className="text-accent/20 absolute top-4 right-4" size={40} weight="fill" />
              <p className="text-foreground leading-relaxed mb-4 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
