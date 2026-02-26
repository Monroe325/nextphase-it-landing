import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, X, Check } from "@phosphor-icons/react"

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
        
        <p className="text-center text-sm text-muted-foreground mb-16">
          All packages include VAT. Custom quotes available for complex multi-system projects.
        </p>

        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">
            DIY vs NextPhase IT
          </h3>
          
          <p className="text-lg text-secondary text-center mb-10 max-w-2xl mx-auto leading-relaxed">
            Building systems in-house seems cheaper upfront, but hidden costs add up quickly.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 md:p-8 border border-border bg-muted/30">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-foreground mb-2">DIY Approach</h4>
                <p className="text-sm text-muted-foreground">Building and maintaining systems yourself</p>
              </div>

              <ul className="space-y-3">
                {[
                  { text: "3-6 months to build", cost: "£15,000 - £30,000 in staff time" },
                  { text: "No expertise guarantee", cost: "Risk of poor architecture" },
                  { text: "Ongoing maintenance burden", cost: "£500 - £2,000/month" },
                  { text: "Trial and error learning", cost: "Productivity loss" },
                  { text: "Integration challenges", cost: "Additional development time" },
                  { text: "No training or documentation", cost: "Team confusion" },
                  { text: "System breaks require urgent fixes", cost: "Business disruption" }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 pb-3 border-b border-border/50">
                    <X className="text-destructive mt-0.5 flex-shrink-0" size={20} weight="bold" />
                    <div className="flex-1">
                      <span className="text-foreground text-sm font-medium block">{item.text}</span>
                      <span className="text-muted-foreground text-xs">{item.cost}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-lg font-bold text-foreground">Total Cost (Year 1)</p>
                <p className="text-3xl font-bold text-destructive mt-1">£21,000 - £54,000</p>
                <p className="text-xs text-muted-foreground mt-2">Plus opportunity cost and ongoing maintenance</p>
              </div>
            </Card>

            <Card className="p-6 md:p-8 border-2 border-accent bg-background shadow-lg">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-foreground mb-2">NextPhase IT</h4>
                <p className="text-sm text-muted-foreground">Professional systems built right, first time</p>
              </div>

              <ul className="space-y-3">
                {[
                  { text: "4-6 weeks to deployment", cost: "Fast time to value" },
                  { text: "Proven architecture & best practices", cost: "Expert design" },
                  { text: "Fully documented & supported", cost: "Peace of mind included" },
                  { text: "Complete team training", cost: "Everyone knows how to use it" },
                  { text: "Tested integrations", cost: "Systems work together" },
                  { text: "30-90 days support included", cost: "No surprises" },
                  { text: "Built to scale with your business", cost: "Future-proof investment" }
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 pb-3 border-b border-border/50">
                    <Check className="text-accent mt-0.5 flex-shrink-0" size={20} weight="bold" />
                    <div className="flex-1">
                      <span className="text-foreground text-sm font-medium block">{item.text}</span>
                      <span className="text-muted-foreground text-xs">{item.cost}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-lg font-bold text-foreground">Total Cost (Year 1)</p>
                <p className="text-3xl font-bold text-accent mt-1">£3,500 - £7,500</p>
                <p className="text-xs text-muted-foreground mt-2">Complete solution with training and support</p>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="inline-block p-6 bg-accent/10 border-accent/30">
              <p className="text-lg font-bold text-foreground mb-1">
                Save £17,500 - £46,500 in Year 1
              </p>
              <p className="text-sm text-secondary">
                Plus regain 5-10 hours per week for strategic work instead of system maintenance
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
