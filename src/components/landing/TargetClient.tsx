import { Card } from "@/components/ui/card"
import { Briefcase, Buildings, Users, TrendUp } from "@phosphor-icons/react"

export function TargetClient() {
  const clientTypes = [
    {
      icon: Briefcase,
      title: "Trades Businesses",
      description: "Plumbers, electricians, builders, and specialist contractors managing multiple jobs simultaneously."
    },
    {
      icon: Buildings,
      title: "Construction Companies",
      description: "Project-based businesses needing visibility across quotes, jobs, materials, and subcontractors."
    },
    {
      icon: Users,
      title: "Service-Based SMEs",
      description: "Professional services with recurring clients, ongoing projects, and admin-heavy workflows."
    },
    {
      icon: TrendUp,
      title: "Growing Teams (3–20 Employees)",
      description: "Businesses that have outgrown spreadsheets but aren't ready for enterprise software."
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          Who We Work With
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          We specialise in UK trades and service businesses that are ready to professionalise operations and scale with confidence.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {clientTypes.map((client, index) => {
            const Icon = client.icon
            return (
              <Card key={index} className="p-6 border border-border bg-background hover:border-accent/50 transition-all duration-200">
                <Icon className="text-accent mb-4" size={40} weight="duotone" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{client.title}</h3>
                <p className="text-secondary leading-relaxed">{client.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
