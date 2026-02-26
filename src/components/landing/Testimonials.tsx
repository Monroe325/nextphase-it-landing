import { Card } from "@/components/ui/card"
import { Quotes } from "@phosphor-icons/react"

export function Testimonials() {
  const testimonials = [
    {
      quote: "NextPhase IT transformed our job tracking from chaos to clarity. We now know exactly where every project stands, and our admin time has dropped by 8 hours a week.",
      author: "James Mitchell",
      role: "Director, Mitchell & Sons Electrical",
      company: "Electrical Contractors, Surrey"
    },
    {
      quote: "Before working with Lewes, we were drowning in spreadsheets. Now we have a custom CRM that actually fits how we work. Cash flow visibility alone has been worth the investment.",
      author: "Sarah Thompson",
      role: "Operations Manager",
      company: "Thompson Construction Ltd, Manchester"
    },
    {
      quote: "The systems audit identified bottlenecks we didn't even realise existed. The automated invoicing system they built has cut our billing cycle from 2 weeks to 3 days.",
      author: "David Chen",
      role: "Founder",
      company: "Chen Plumbing Services, London"
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          What Our Clients Say
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Real results from UK trades and service businesses that made the transition from manual chaos to structured systems.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-border bg-background relative">
              <Quotes className="text-accent/20 absolute top-4 right-4" size={48} weight="fill" />
              <p className="text-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-secondary">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
