import { X, CheckCircle, Tabs } from "@phosphor-icons/react"
import { ScrollIndicator } from "./ScrollIndicator"

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
    <section id="problem-section" className="py-8 md:py-12 px-4 bg-muted relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6">
          From Operational Chaos to Structured Systems
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">The Problem</h3>
            <div className="space-y-2">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <X className="text-destructive mt-1 flex-shrink-0" size={18} weight="bold" />
                  <span className="text-sm text-secondary">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Our Solution</h3>
            <div className="space-y-2">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={18} weight="fill" />
                  <span className="text-sm text-secondary">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator 
        targetId="tabs-section" 
        variant="section"
        previewTitle="Explore Our Approach"
        previewDescription="Interactive tabs with process, pricing, ROI calculator, and FAQ"
        previewIcon={<Tabs size={20} weight="duotone" />}
      />
    </section>
  )
}
