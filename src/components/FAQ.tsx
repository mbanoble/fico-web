
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who is eligible for a loan?",
    answer: "To be eligible for a loan through Fico Point, you must be at least 18 years old, have a valid ID, an active mobile money account, and a source of income. Specific requirements may vary based on loan amount and type."
  },
  {
    question: "What documents are needed?",
    answer: "Typically, we require a valid government-issued ID, proof of address, proof of income (such as pay slips or bank statements), and may request additional documents depending on the loan amount requested."
  },
  {
    question: "What are the interest rates and repayment terms?",
    answer: "Our interest rates vary based on loan amount, duration, and your credit profile. Typical rates range from 10% to 15% with repayment terms between 1 to 6 months. Exact rates and terms will be clearly displayed before loan acceptance."
  },
  {
    question: "How is personal data handled?",
    answer: "We take data privacy seriously. All personal information is encrypted and stored securely according to industry standards. We do not sell your data to third parties and only use it for processing your loan and improving our services."
  },
  {
    question: "How long does the approval process take?",
    answer: "Most loan applications are processed within 24 hours, with many receiving same-day approval. Once approved, disbursement to your mobile money account typically happens within minutes."
  },
  {
    question: "Is there a penalty for early repayment?",
    answer: "No, we encourage early repayment and do not charge any penalties or fees for settling your loan before the due date."
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our loan services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
