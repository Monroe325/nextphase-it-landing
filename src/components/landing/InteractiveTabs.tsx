import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  MagnifyingGlass, 
  Wrench, 
  GraduationCap, 
  CheckCircle, 
  Calendar,
  X,
  Check,
  TrendUp,
  HardHat,
  Hammer,
  Users,
  Briefcase,
  Link as LinkIcon
} from "@phosphor-icons/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState, useMemo, useEffect } from "react"
import { toast } from "sonner"
import { ShareButtons } from "./ShareButtons"
import { ScrollIndicator } from "./ScrollIndicator"

type IndustryTemplate = {
  id: string
  name: string
  icon: typeof Wrench
  description: string
  defaults: {
    employeeCount: number
    hoursPerWeekAdmin: number
    avgHourlyRate: number
    jobsPerMonth: number
    lostJobsPerMonth: number
    avgJobValue: number
  }
}

const industryTemplates: IndustryTemplate[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Wrench,
    description: 'Emergency & installations',
    defaults: {
      employeeCount: 4,
      hoursPerWeekAdmin: 12,
      avgHourlyRate: 40,
      jobsPerMonth: 30,
      lostJobsPerMonth: 3,
      avgJobValue: 650
    }
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: HardHat,
    description: 'Commercial & domestic',
    defaults: {
      employeeCount: 6,
      hoursPerWeekAdmin: 10,
      avgHourlyRate: 45,
      jobsPerMonth: 28,
      lostJobsPerMonth: 2,
      avgJobValue: 850
    }
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: Hammer,
    description: 'Builds & renovations',
    defaults: {
      employeeCount: 8,
      hoursPerWeekAdmin: 15,
      avgHourlyRate: 38,
      jobsPerMonth: 12,
      lostJobsPerMonth: 2,
      avgJobValue: 2500
    }
  },
  {
    id: 'property',
    name: 'Property',
    icon: Users,
    description: 'Management & maintenance',
    defaults: {
      employeeCount: 5,
      hoursPerWeekAdmin: 14,
      avgHourlyRate: 32,
      jobsPerMonth: 40,
      lostJobsPerMonth: 4,
      avgJobValue: 450
    }
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    description: 'Consulting & advisory',
    defaults: {
      employeeCount: 7,
      hoursPerWeekAdmin: 16,
      avgHourlyRate: 65,
      jobsPerMonth: 20,
      lostJobsPerMonth: 2,
      avgJobValue: 1200
    }
  }
]

export function InteractiveTabs() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [employeeCount, setEmployeeCount] = useState(5)
  const [hoursPerWeekAdmin, setHoursPerWeekAdmin] = useState(10)
  const [avgHourlyRate, setAvgHourlyRate] = useState(35)
  const [jobsPerMonth, setJobsPerMonth] = useState(25)
  const [lostJobsPerMonth, setLostJobsPerMonth] = useState(2)
  const [avgJobValue, setAvgJobValue] = useState(800)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const roiData = params.get('roi')
    
    if (roiData) {
      try {
        const decoded = JSON.parse(atob(roiData))
        setSelectedIndustry(decoded.industry || null)
        setEmployeeCount(decoded.employees || 5)
        setHoursPerWeekAdmin(decoded.hours || 10)
        setAvgHourlyRate(decoded.rate || 35)
        setJobsPerMonth(decoded.jobs || 25)
        setLostJobsPerMonth(decoded.lost || 2)
        setAvgJobValue(decoded.value || 800)
        
        toast.success("ROI calculation loaded from shared link")
      } catch (e) {
        console.error("Failed to parse ROI data from URL", e)
      }
    }
  }, [])

  const applyTemplate = (template: IndustryTemplate) => {
    setSelectedIndustry(template.id)
    setEmployeeCount(template.defaults.employeeCount)
    setHoursPerWeekAdmin(template.defaults.hoursPerWeekAdmin)
    setAvgHourlyRate(template.defaults.avgHourlyRate)
    setJobsPerMonth(template.defaults.jobsPerMonth)
    setLostJobsPerMonth(template.defaults.lostJobsPerMonth)
    setAvgJobValue(template.defaults.avgJobValue)
  }

  const generateShareableLink = () => {
    const data = {
      industry: selectedIndustry,
      employees: employeeCount,
      hours: hoursPerWeekAdmin,
      rate: avgHourlyRate,
      jobs: jobsPerMonth,
      lost: lostJobsPerMonth,
      value: avgJobValue
    }
    
    const encoded = btoa(JSON.stringify(data))
    const url = new URL(window.location.href)
    url.searchParams.set('roi', encoded)
    url.hash = 'roi-calculator'
    
    return url.toString()
  }

  const copyShareLink = async () => {
    const link = generateShareableLink()
    
    try {
      await navigator.clipboard.writeText(link)
      setLinkCopied(true)
      toast.success("Link copied to clipboard!")
      
      setTimeout(() => setLinkCopied(false), 3000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const calculations = useMemo(() => {
    const weeklyAdminCost = hoursPerWeekAdmin * avgHourlyRate
    const annualAdminCost = weeklyAdminCost * 52
    
    const lostRevenue = lostJobsPerMonth * avgJobValue * 12
    
    const hoursReclaimed = hoursPerWeekAdmin * 0.7
    const annualReclaimed = hoursReclaimed * avgHourlyRate * 52
    
    const jobsCaptured = lostJobsPerMonth * 0.8
    const annualJobRecovery = jobsCaptured * avgJobValue * 12
    
    const invoicingImprovement = (jobsPerMonth * 12) * 50
    
    const totalAnnualWaste = annualAdminCost + lostRevenue
    const totalAnnualGain = annualReclaimed + annualJobRecovery + invoicingImprovement
    
    const systemInvestment = 3500
    const firstYearROI = totalAnnualGain - systemInvestment
    const roiMultiplier = firstYearROI / systemInvestment
    const paybackWeeks = (systemInvestment / (totalAnnualGain / 52)).toFixed(1)
    
    return {
      weeklyAdminCost,
      annualAdminCost,
      lostRevenue,
      hoursReclaimed,
      annualReclaimed,
      jobsCaptured,
      annualJobRecovery,
      invoicingImprovement,
      totalAnnualWaste,
      totalAnnualGain,
      systemInvestment,
      firstYearROI,
      roiMultiplier,
      paybackWeeks
    }
  }, [employeeCount, hoursPerWeekAdmin, avgHourlyRate, jobsPerMonth, lostJobsPerMonth, avgJobValue])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

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

  const tiers = [
    {
      name: "Systems Audit",
      price: "£495",
      period: "one-time",
      features: [
        "Operations review",
        "Gap analysis",
        "Recommendations report",
        "60-min strategy session"
      ],
      cta: "Book Audit",
      popular: false
    },
    {
      name: "Core Build",
      price: "£3,500",
      period: "starting from",
      features: [
        "Custom CRM/workflow system",
        "Full data migration",
        "Automation implementation",
        "Team training (5 users)",
        "30 days support"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise Build",
      price: "£7,500",
      period: "starting from",
      features: [
        "Everything in Core Build",
        "Multi-system integrations",
        "Advanced automation",
        "Custom dashboards",
        "90 days priority support"
      ],
      cta: "Contact Us",
      popular: false
    }
  ]

  const faqs = [
    {
      question: "How long does implementation take?",
      answer: "Most systems are deployed within 4-8 weeks: audit (1 week), build (2-4 weeks), training (1-2 weeks)."
    },
    {
      question: "Do you integrate with existing tools?",
      answer: "Yes. We integrate with QuickBooks, Xero, and other platforms to create a unified operational view."
    },
    {
      question: "What's included in post-launch support?",
      answer: "Support includes bug fixes, usage training, system adjustments, and guidance for 30-90 days depending on your package."
    },
    {
      question: "Can the system scale as we grow?",
      answer: "Absolutely. Systems are designed with growth in mind and can easily accommodate more users, processes, and integrations."
    }
  ]

  return (
    <section id="tabs-section" className="py-12 md:py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          Explore Our Approach
        </h2>
        
        <Tabs defaultValue="process" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card key={index} className="p-6 text-center border-border">
                    <Icon className="text-accent mb-3 mx-auto" size={40} weight="duotone" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-secondary">{step.description}</p>
                  </Card>
                )
              })}
            </div>
            
            <Card className="p-6 bg-muted/30 border-border">
              <h3 className="text-lg font-semibold text-foreground text-center mb-4">Expected Results</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center">
                    <CheckCircle className="text-accent flex-shrink-0" size={20} weight="fill" />
                    <span className="text-sm text-secondary">{outcome}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier, index) => (
                <Card 
                  key={index} 
                  className={`p-6 border transition-all duration-200 bg-background relative ${
                    tier.popular 
                      ? 'border-accent shadow-lg scale-105' 
                      : 'border-border'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{tier.period}</p>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} weight="fill" />
                        <span className="text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                        : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    }`}
                    onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
                  >
                    {tier.cta === "Book Audit" && <Calendar className="mr-2" size={16} />}
                    {tier.cta}
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-muted/30 border-border">
              <h3 className="text-xl font-bold text-foreground text-center mb-4">
                DIY vs NextPhase IT
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <X className="text-destructive" size={20} weight="bold" />
                    DIY Approach
                  </h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li>• 3-6 months to build</li>
                    <li>• £15,000-£30,000 in staff time</li>
                    <li>• No expertise guarantee</li>
                    <li>• Ongoing maintenance burden</li>
                  </ul>
                  <p className="text-lg font-bold text-destructive pt-2">£21,000-£54,000/year</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Check className="text-accent" size={20} weight="bold" />
                    NextPhase IT
                  </h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    <li>• 4-6 weeks to deployment</li>
                    <li>• Fixed-price investment</li>
                    <li>• Proven architecture</li>
                    <li>• Support included</li>
                  </ul>
                  <p className="text-lg font-bold text-accent pt-2">£3,500-£7,500</p>
                </div>
              </div>

              <div className="mt-6 text-center p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm font-bold text-foreground">
                  Save £17,500 - £46,500 in Year 1
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="roi" id="roi-calculator" className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                Choose Your Industry Template
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {industryTemplates.map((template) => {
                  const Icon = template.icon
                  const isSelected = selectedIndustry === template.id
                  return (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-accent bg-accent/10'
                          : 'border-border bg-background hover:border-accent/50'
                      }`}
                    >
                      <Icon
                        size={24}
                        weight="duotone"
                        className={`mb-2 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`}
                      />
                      <h4 className="font-semibold text-xs text-foreground mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {template.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 border border-border bg-background">
                <h3 className="text-lg font-bold text-foreground mb-4">Your Current Situation</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <Label htmlFor="employee-count" className="text-sm font-medium text-foreground">
                        Employees
                      </Label>
                      <span className="text-sm font-semibold text-accent">{employeeCount}</span>
                    </div>
                    <Slider
                      id="employee-count"
                      value={[employeeCount]}
                      onValueChange={(value) => setEmployeeCount(value[0])}
                      min={1}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <Label htmlFor="admin-hours" className="text-sm font-medium text-foreground">
                        Admin Hours/Week
                      </Label>
                      <span className="text-sm font-semibold text-accent">{hoursPerWeekAdmin}h</span>
                    </div>
                    <Slider
                      id="admin-hours"
                      value={[hoursPerWeekAdmin]}
                      onValueChange={(value) => setHoursPerWeekAdmin(value[0])}
                      min={1}
                      max={40}
                      step={1}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hourly-rate" className="text-sm font-medium text-foreground mb-2 block">
                      Hourly Rate (£)
                    </Label>
                    <Input
                      id="hourly-rate"
                      type="number"
                      value={avgHourlyRate}
                      onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                      min={0}
                    />
                  </div>

                  <div>
                    <Label htmlFor="jobs-per-month" className="text-sm font-medium text-foreground mb-2 block">
                      Jobs/Month
                    </Label>
                    <Input
                      id="jobs-per-month"
                      type="number"
                      value={jobsPerMonth}
                      onChange={(e) => setJobsPerMonth(Number(e.target.value))}
                      min={0}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <Label htmlFor="lost-jobs" className="text-sm font-medium text-foreground">
                        Lost Jobs/Month
                      </Label>
                      <span className="text-sm font-semibold text-accent">{lostJobsPerMonth}</span>
                    </div>
                    <Slider
                      id="lost-jobs"
                      value={[lostJobsPerMonth]}
                      onValueChange={(value) => setLostJobsPerMonth(value[0])}
                      min={0}
                      max={10}
                      step={1}
                    />
                  </div>

                  <div>
                    <Label htmlFor="avg-job-value" className="text-sm font-medium text-foreground mb-2 block">
                      Avg Job Value (£)
                    </Label>
                    <Input
                      id="avg-job-value"
                      type="number"
                      value={avgJobValue}
                      onChange={(e) => setAvgJobValue(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <Card className="p-6 border-2 border-accent bg-background">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <TrendUp className="text-accent" size={24} weight="duotone" />
                      <h3 className="text-lg font-bold text-foreground">Your Impact</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={copyShareLink}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        {linkCopied ? (
                          <>
                            <Check size={14} weight="bold" />
                            Copied
                          </>
                        ) : (
                          <>
                            <LinkIcon size={14} weight="bold" />
                            Copy
                          </>
                        )}
                      </Button>
                      <ShareButtons 
                        url={generateShareableLink()}
                        title="NextPhase IT ROI Calculator"
                        description={`See how I could save ${formatCurrency(calculations.firstYearROI)} in year one with NextPhase IT business systems`}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="pb-3 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">Current Annual Waste</p>
                      <p className="text-2xl font-bold text-destructive">{formatCurrency(calculations.totalAnnualWaste)}</p>
                    </div>

                    <div className="pb-3 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">Potential Annual Savings</p>
                      <p className="text-2xl font-bold text-accent">{formatCurrency(calculations.totalAnnualGain)}</p>
                    </div>

                    <div className="pb-3 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">Investment Required</p>
                      <p className="text-xl font-bold text-foreground">{formatCurrency(calculations.systemInvestment)}</p>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">First Year Net ROI</p>
                      <p className="text-3xl font-bold text-accent mb-1">{formatCurrency(calculations.firstYearROI)}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {calculations.roiMultiplier.toFixed(1)}x return
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pays back in {calculations.paybackWeeks} weeks
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} weight="fill" />
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          {calculations.hoursReclaimed.toFixed(1)}h reclaimed/week
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} weight="fill" />
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          {calculations.jobsCaptured.toFixed(1)} more jobs/month
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} weight="fill" />
                      <div>
                        <p className="text-xs font-medium text-foreground">
                          Faster cash collection
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-secondary/10 border-secondary/30">
                  <p className="text-xs text-secondary text-center">
                    <strong className="text-foreground">Conservative estimates.</strong> Most clients see additional benefits.
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Card className="p-6 border-border bg-background">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-secondary leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ScrollIndicator 
        targetId="cta-section" 
        variant="section"
        previewTitle="Ready to Transform?"
        previewDescription="Book a free systems audit or send us a message to get started"
        previewIcon={<Calendar size={20} weight="duotone" />}
      />
    </section>
  )
}
