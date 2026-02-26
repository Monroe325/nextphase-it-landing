import { Card } from "@/components/ui/card"
import { MagnifyingGlass, Wrench, GraduationCap } from "@phosphor-icons/react"

export function Process() {
  const steps = [
    {
      number: "1",
      icon: MagnifyingGlass,
      title: "Systems Audit",
      description: "We analyse your current operations, identify bottlenecks, and map out what systems you need to scale efficiently."
    },
    {
      number: "2",
      icon: Wrench,
      title: "Custom Build & Deployment",
      description: "We design and build tailored systems that fit your business perfectly, then deploy them with full data migration and testing."
    },
    {
      number: "3",
      icon: GraduationCap,
      title: "Training & Optimisation",
      description: "Your team gets hands-on training, and we provide ongoing support to refine workflows and ensure adoption."
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          Our 3-Step Process
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          From initial assessment to full operational transformation, we guide you through every stage.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="p-8 border border-border bg-background relative">
                <div className="absolute -top-4 left-8 bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <Icon className="text-accent mb-4 mt-4" size={48} weight="duotone" />
                <h3 className="text-2xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-secondary leading-relaxed">{step.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
