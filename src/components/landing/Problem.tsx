import { X } from "@phosphor-icons/react"

export function Problem() {
  const painPoints = [
    "Lost or delayed quotes",
    "Manual job tracking",
    "Admin overload",
    "Poor visibility on revenue and profit",
    "Disconnected systems"
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-muted">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          Is Your Business Running on Spreadsheets and Stress?
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Most growing UK trades and service businesses hit the same wall: the systems that worked at 3 employees break down at 10. You're managing jobs across WhatsApp, spreadsheets, paper notes, and memory—leading to delays, confusion, and missed opportunities.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {painPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border">
              <X className="text-destructive mt-1 flex-shrink-0" size={24} weight="bold" />
              <span className="text-foreground font-medium">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
