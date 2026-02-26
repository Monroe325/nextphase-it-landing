import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, TrendUp, Wrench, HardHat, Hammer, Users, Briefcase, Link as LinkIcon, Check } from "@phosphor-icons/react"
import { toast } from "sonner"

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
    name: 'Plumbing & Heating',
    icon: Wrench,
    description: 'Emergency callouts, installations, and maintenance',
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
    name: 'Electrical Services',
    icon: HardHat,
    description: 'Commercial and domestic electrical work',
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
    name: 'Construction & Builders',
    icon: Hammer,
    description: 'Renovations, extensions, and new builds',
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
    name: 'Property Maintenance',
    icon: Users,
    description: 'Multi-property management and maintenance',
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
    name: 'Professional Services',
    icon: Briefcase,
    description: 'Consulting, accounting, legal, and advisory',
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

export function ROICalculator() {
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

  return (
    <section id="roi-calculator" className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            See how much time and money you could save with proper systems in place.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            Choose Your Industry Template
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {industryTemplates.map((template) => {
              const Icon = template.icon
              const isSelected = selectedIndustry === template.id
              return (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                    isSelected
                      ? 'border-accent bg-accent/10 shadow-md'
                      : 'border-border bg-background hover:border-accent/50'
                  }`}
                >
                  <Icon
                    size={32}
                    weight="duotone"
                    className={`mb-2 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`}
                  />
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-snug">
                    {template.description}
                  </p>
                </button>
              )
            })}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Select a template to see industry-specific estimates, or customize the values below
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 md:p-8 border border-border bg-background">
            <h3 className="text-xl font-bold text-foreground mb-6">Your Current Situation</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <Label htmlFor="employee-count" className="text-sm font-medium text-foreground">
                    Number of Employees
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
                  className="mt-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <Label htmlFor="admin-hours" className="text-sm font-medium text-foreground">
                    Hours Per Week on Admin Tasks
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
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="hourly-rate" className="text-sm font-medium text-foreground mb-2 block">
                  Average Hourly Rate (£)
                </Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={avgHourlyRate}
                  onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                  min={0}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="jobs-per-month" className="text-sm font-medium text-foreground mb-2 block">
                  Jobs Completed Per Month
                </Label>
                <Input
                  id="jobs-per-month"
                  type="number"
                  value={jobsPerMonth}
                  onChange={(e) => setJobsPerMonth(Number(e.target.value))}
                  min={0}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <Label htmlFor="lost-jobs" className="text-sm font-medium text-foreground">
                    Lost/Delayed Jobs Per Month
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
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="avg-job-value" className="text-sm font-medium text-foreground mb-2 block">
                  Average Job Value (£)
                </Label>
                <Input
                  id="avg-job-value"
                  type="number"
                  value={avgJobValue}
                  onChange={(e) => setAvgJobValue(Number(e.target.value))}
                  min={0}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 md:p-8 border-2 border-accent bg-background shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <TrendUp className="text-accent" size={28} weight="duotone" />
                  <h3 className="text-xl font-bold text-foreground">Your Projected Impact</h3>
                </div>
                <Button
                  onClick={copyShareLink}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  {linkCopied ? (
                    <>
                      <Check size={16} weight="bold" />
                      Copied
                    </>
                  ) : (
                    <>
                      <LinkIcon size={16} weight="bold" />
                      Share
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Current Annual Waste</p>
                  <p className="text-3xl font-bold text-destructive">{formatCurrency(calculations.totalAnnualWaste)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Admin costs + lost revenue</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Potential Annual Savings</p>
                  <p className="text-3xl font-bold text-accent">{formatCurrency(calculations.totalAnnualGain)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Through automation and recovery</p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-1">Investment Required</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(calculations.systemInvestment)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Core Build package</p>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">First Year Net ROI</p>
                  <p className="text-4xl font-bold text-accent mb-2">{formatCurrency(calculations.firstYearROI)}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {calculations.roiMultiplier.toFixed(1)}x return on investment
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    System pays for itself in {calculations.paybackWeeks} weeks
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground mb-2">What You'll Gain:</p>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={20} weight="fill" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {calculations.hoursReclaimed.toFixed(1)} hours reclaimed per week
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Worth {formatCurrency(calculations.annualReclaimed)} annually
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={20} weight="fill" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Capture {calculations.jobsCaptured.toFixed(1)} more jobs per month
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Additional {formatCurrency(calculations.annualJobRecovery)} in revenue
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={20} weight="fill" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Faster cash collection cycles
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(calculations.invoicingImprovement)} improvement through faster invoicing
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-secondary/10 border-secondary/30">
              <p className="text-sm text-secondary text-center leading-relaxed">
                <strong className="text-foreground">These are conservative estimates.</strong> Most clients see additional benefits including reduced errors, improved team morale, and better customer satisfaction.
              </p>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-secondary mb-6">
            Ready to see these results in your business?
          </p>
          <button
            onClick={() => window.open('https://calendly.com/nextphaseit', '_blank')}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Book Your Free Systems Audit
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  )
}
