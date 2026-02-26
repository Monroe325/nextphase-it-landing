import { MagnifyingGlass, Wrench, GraduationCap, CheckCircle } from "@phosphor-icons/react"

export function Process() {
  const steps = [
    { icon: MagnifyingGlass, title: "Audit", description: "Analyse operations & identify bottlenecks" },
    { icon: Wrench, title: "Build", description: "Deploy custom systems with full migration" },
    { icon: GraduationCap, title: "Train", description: "Hands-on training & ongoing support" }
  ]

  const outcomes = [
    "5–10 hours saved weekly",
    "Clear job & cash flow visibility",
    "Faster invoicing cycles"
  ]

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          How We Work & What Changes
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center">
                <Icon className="text-accent mb-3 mx-auto" size={40} weight="duotone" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-secondary">{step.description}</p>
              </div>
            )
          })}
        </div>
        
        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-semibold text-foreground text-center mb-6">Expected Results</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <CheckCircle className="text-accent flex-shrink-0" size={24} weight="fill" />
                <span className="text-secondary">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
