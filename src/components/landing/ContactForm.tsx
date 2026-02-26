import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useKV } from "@github/spark/hooks"
import { toast } from "sonner"
import { PaperPlaneRight } from "@phosphor-icons/react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  company: string
  message: string
  timestamp: number
}

export function ContactForm() {
  const [submissions, setSubmissions] = useKV<ContactSubmission[]>("contact-submissions", [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })
  const [honeypot, setHoneypot] = useState("")
  const [formLoadTime] = useState(Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (honeypot) {
      setIsSubmitting(false)
      return
    }

    const timeSinceLoad = Date.now() - formLoadTime
    if (timeSinceLoad < 3000) {
      toast.error("Please slow down", {
        description: "Please take a moment to review your message."
      })
      setIsSubmitting(false)
      return
    }

    const submission: ContactSubmission = {
      id: Date.now().toString(),
      ...formData,
      timestamp: Date.now()
    }

    setSubmissions((current) => [...(current || []), submission])

    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours."
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    })

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Smith"
            className="bg-background border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@company.co.uk"
            className="bg-background border-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="07123 456789"
            className="bg-background border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company" className="text-foreground font-medium">
            Company Name
          </Label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="ABC Construction Ltd"
            className="bg-background border-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground font-medium">
          Tell Us About Your Needs *
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Describe your current operational challenges and what you're looking to achieve..."
          rows={6}
          className="bg-background border-input resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 h-auto transition-all duration-200"
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            <PaperPlaneRight className="mr-2" size={24} />
            Send Message
          </>
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        We typically respond within 24 hours during business days.
      </p>
    </form>
  )
}
