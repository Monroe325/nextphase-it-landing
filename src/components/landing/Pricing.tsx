import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "@phosphor-icons/react"

export function Pricing() {
  const tiers = [
    {
      name: "Systems Audit",
      description: "Perfect for businesses exploring operational improvements",
      price: "£495",
      period: "one-time",
      features: [
        "Comprehensive operations review",
        "Systems gap analysis",
        "Custom recommendations report",
        "60-minute strategy session",
        "Implementation roadmap"
      ],
      cta: "Book Audit",
      popular: false
    },
    {
      name: "Core Build",
      description: "Complete system build and deployment for growing teams",
      price: "£3,500",
      period: "starting from",
      features: [
        "Custom CRM or workflow system",
        "Full data migration & setup",
        "Process automation implementation",
        "Team training (up to 5 users)",
        "30 days post-launch support",
        "Documentation & guides"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise Build",
      description: "Advanced systems with integrations and ongoing optimisation",
      price: "£7,500",
      period: "starting from",
      features: [
        "Everything in Core Build",
        "Multi-system integrations",
        "Advanced automation workflows",
        "Custom KPI dashboards",
        "Team training (up to 15 users)",
        "90 days priority support",
        "Quarterly optimisation reviews"
      ],
      cta: "Contact Us",
      popular: false
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4">
          Clear Pricing. No Hidden Costs.
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          Choose the package that fits your business stage. All pricing is fixed-scope with clear deliverables.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`p-6 md:p-8 border transition-all duration-200 bg-background relative ${
                tier.popular 
                  ? 'border-accent shadow-lg scale-105' 
                  : 'border-border hover:border-accent/50 hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-secondary leading-relaxed">{tier.description}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{tier.period}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={20} weight="fill" />
                    <span className="text-secondary text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full transition-all duration-200 ${
                  tier.popular 
                    ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                    : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                }`}
                onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
              >
                {tier.cta === "Book Audit" && <Calendar className="mr-2" size={20} />}
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          All packages include VAT. Custom quotes available for complex multi-system projects.
        </p>
      </div>
    </section>
  )
}
