import { Card } from "@/components/ui/card"
import { Gear, ClipboardText, ChartLine, Users, TrendUp } from "@phosphor-icons/react"

export function Solution() {
  const services = [
    {
      icon: Users,
      title: "Custom CRM Systems",
      description: "Tailored client and job management systems that fit your business, not generic software you have to adapt to."
    },
    {
      icon: ClipboardText,
      title: "Job & Workflow Management",
      description: "Track every job from quote to completion with full visibility for you and your team."
    },
    {
      icon: Gear,
      title: "Automation Implementation",
      description: "Eliminate repetitive admin tasks with smart automation that saves hours every week."
    },
    {
      icon: ChartLine,
      title: "KPI Dashboards & Reporting",
      description: "Real-time insights into revenue, profitability, and operational performance."
    },
    {
      icon: TrendUp,
      title: "Process Optimisation Consulting",
      description: "Strategic guidance to identify bottlenecks and build scalable operational frameworks."
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          We Build Operational Infrastructure That Scales With You
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          NextPhase IT designs and implements bespoke business systems that transform how UK trades and service companies operate. From custom CRMs to full workflow automation, we build the infrastructure that lets you focus on growth, not admin.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="p-6 border border-border hover:border-accent/50 transition-all duration-200 hover:shadow-md bg-background">
                <Icon className="text-accent mb-4" size={40} weight="duotone" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-secondary leading-relaxed">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
