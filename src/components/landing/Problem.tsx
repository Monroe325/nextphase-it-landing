import { X, CheckCircle } from "@phosphor-icons/react"

export function Problem() {
  const painPoints = [
    "Lost quotes and manual job tracking",
    "Admin overload and disconnected systems",
    "Poor visibility on revenue and profit"
  ]

  const solutions = [
    "Custom CRM & workflow management",
    "Automation & KPI dashboards",
    "Process optimisation consulting"
  ]

  return (
    <section className="py-12 md:py-16 px-4 bg-muted">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          From Operational Chaos to Structured Systems
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">The Problem</h3>
            <div className="space-y-3">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="text-destructive mt-1 flex-shrink-0" size={20} weight="bold" />
                  <span className="text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Our Solution</h3>
            <div className="space-y-3">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} weight="fill" />
                  <span className="text-secondary">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
