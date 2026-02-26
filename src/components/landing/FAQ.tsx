import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How long does a typical implementation take?",
      answer: "Most custom CRM and workflow systems are fully deployed within 4-8 weeks, depending on complexity and data migration requirements. We work in phases: audit (1 week), build (2-4 weeks), testing and training (1-2 weeks), then ongoing optimisation."
    },
    {
      question: "What if we're already using software like QuickBooks or Xero?",
      answer: "We integrate with your existing tools rather than replace them. Our systems often connect to QuickBooks, Xero, and other accounting platforms to create a unified operational view while keeping your financial data where it belongs."
    },
    {
      question: "Do you provide training for our team?",
      answer: "Yes. Hands-on training is included in every engagement. We train your team during deployment, provide documentation, and offer ongoing support to ensure everyone can use the new systems confidently."
    },
    {
      question: "What happens if we need changes after go-live?",
      answer: "We expect refinements. After initial deployment, we monitor usage, gather feedback, and make adjustments as needed. Ongoing support packages are available for businesses that want continuous optimisation."
    },
    {
      question: "How much does this cost?",
      answer: "Investment varies based on scope and complexity, typically ranging from £5,000-£25,000 for custom CRM builds and automation systems. The free systems audit provides a detailed proposal with clear pricing before any commitment."
    },
    {
      question: "What makes NextPhase IT different from off-the-shelf software?",
      answer: "Off-the-shelf tools force you to adapt your processes to their structure. We build systems that match how your business actually operates. You get exactly what you need—no bloated features, no painful workarounds, just operational clarity."
    }
  ]

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
          Frequently Asked Questions
        </h2>
        
        <p className="text-lg text-secondary text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Common questions from business owners considering operational transformation.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-secondary leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
