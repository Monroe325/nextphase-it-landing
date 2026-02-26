import { CheckCircle } from "@phosphor-icons/react"

export function Outcomes() {
  const outcomes = [
    "5–10 hours saved weekly",
    "Clear job visibility",
    "Faster invoicing cycles",
    "Improved cash flow oversight",
    "Reduced operational chaos"
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          What Changes After Working With NextPhase IT
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Our clients don't just get software—they get structured operations that free up time, improve cash flow, and enable confident decision-making.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all duration-200">
              <CheckCircle className="text-accent flex-shrink-0 mt-1" size={32} weight="fill" />
              <span className="text-lg font-medium text-foreground">{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
