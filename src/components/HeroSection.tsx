
import { Button } from "@/components/ui/button";
import { ShieldCheck, CreditCard, Check } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00FF00] to-[#80FF80] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl py-16 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6 leading-tight">
                Quick Loans for Your <span className="text-ficogreen">Financial Needs</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Fico Point Micro Finance provides fast and convenient loans through our mobile app. 
                Register easily, get quick approvals, and receive funds directly to your mobile money account.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-ficogreen hover:bg-ficogreen/90 text-black font-semibold px-6 py-6 text-base">
                  Download the App
                </Button>
                <Button variant="outline" className="border-ficogreen text-ficoblack hover:bg-ficogreen/10 px-6 py-6 text-base">
                  Learn More
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <ShieldCheck className="h-6 w-6 text-ficogreen mr-2" />
                  <p className="text-sm font-medium">Secure & Safe</p>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-ficogreen mr-2" />
                  <p className="text-sm font-medium">Fast Disbursement</p>
                </div>
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-ficogreen mr-2" />
                  <p className="text-sm font-medium">Easy Repayment</p>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-auto">
              <div className="relative h-[400px] w-full lg:w-[400px] rounded-lg bg-gray-900 shadow-xl overflow-hidden">
                {/* Placeholder for app screenshot or illustration */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center p-6">
                    <p className="text-lg font-medium mb-4">App Screenshot</p>
                    <p className="text-sm opacity-70">Mobile application interface would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00FF00] to-[#80FF80] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
}
