
import { Shield, Users, TrendingUp } from "lucide-react";

const values = [
  {
    name: 'Financial Inclusion',
    description: 'We believe everyone deserves access to financial services regardless of their background or income level.',
    icon: Users,
  },
  {
    name: 'Trust & Security',
    description: 'We prioritize the security of your data and funds with robust systems and transparent practices.',
    icon: Shield,
  },
  {
    name: 'Empowerment',
    description: 'Our goal is to empower individuals and small businesses to grow and thrive through accessible credit.',
    icon: TrendingUp,
  },
];

export default function AboutUs() {
  return (
    <div id="about-us" className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">About Fico Point Micro Finance</h2>
            <p className="text-lg text-gray-600 mb-6">
              Fico Point Micro Finance was founded with a clear mission: to bridge the gap in financial services by providing quick, 
              accessible loans through innovative technology.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We understand that access to credit can be challenging for many individuals and small businesses. 
              Our mobile application removes barriers and simplifies the loan process, making it possible for more 
              people to access the funds they need when they need them.
            </p>
            <p className="text-lg text-gray-600">
              With a focus on customer satisfaction, security, and financial inclusion, we're committed to empowering 
              our users with financial solutions that work for them.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Our Values</h3>
            <div className="space-y-8">
              {values.map((value) => (
                <div key={value.name} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-ficogreen text-black">
                      <value.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{value.name}</h4>
                    <p className="mt-1 text-base text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
