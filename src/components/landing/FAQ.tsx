import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
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
      question: "What's the investment range?",
      answer: "Typically £5,000-£25,000 depending on scope. The free audit provides detailed pricing before commitment."
    }
  ]

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
          Common Questions
        </h2>
        
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
      </div>
    </section>
  )
}
