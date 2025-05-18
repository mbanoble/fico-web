
import { 
  UserPlus, 
  FileText, 
  MailCheck, 
  Wallet, 
  CreditCard 
} from "lucide-react";

const steps = [
  {
    id: 1,
    name: 'Register an account',
    description: 'Create your account by providing basic information and verify your identity.',
    icon: UserPlus,
  },
  {
    id: 2,
    name: 'Fill out loan form',
    description: 'Complete our multi-step loan application form with your financial information.',
    icon: FileText,
  },
  {
    id: 3,
    name: 'Submit and wait for approval',
    description: 'Submit your application and receive notification once approved.',
    icon: MailCheck,
  },
  {
    id: 4,
    name: 'Receive loan via mobile money',
    description: 'Get your loan disbursed directly to your mobile money account.',
    icon: Wallet,
  },
  {
    id: 5,
    name: 'Repay through the app',
    description: 'Make convenient repayments directly through our mobile application.',
    icon: CreditCard,
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting a loan with Fico Point is quick and easy. Follow these simple steps to access funds when you need them.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Icon */}
                  <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-1/2">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ficogreen text-black border-4 border-white shadow-md z-10">
                      <step.icon className="h-6 w-6" />
                      <div className="absolute -inset-1.5 rounded-full border border-gray-200" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div className="flex items-center lg:hidden mb-4">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-ficogreen text-black">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{step.name}</h3>
                    </div>
                    
                    <div className="lg:block">
                      <h3 className="hidden lg:block text-xl font-semibold text-gray-900 mb-2">
                        {step.name}
                      </h3>
                      <p className="text-base text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
