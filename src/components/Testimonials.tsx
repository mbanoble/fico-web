
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content: "Fico Point helped me get a quick loan when I needed it most. The process was incredibly simple and the funds were in my mobile money account within hours.",
    name: "Daniel Mensah",
    role: "Small Business Owner",
  },
  {
    id: 2,
    content: "I was skeptical at first, but after using Fico Point for an emergency loan, I was impressed by how fast and reliable their service is. Definitely recommend!",
    name: "Sarah Osei",
    role: "Teacher",
  },
  {
    id: 3,
    content: "The repayment options are flexible and the customer service team is always ready to help. Fico Point has become my go-to for short-term loans.",
    name: "Michael Adu",
    role: "Freelancer",
  },
];

export default function Testimonials() {
  return (
    <div className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people who have used our service have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-ficogreen" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.content}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
