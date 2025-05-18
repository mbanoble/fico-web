
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ficoblack text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/lovable-uploads/5ee6b818-e399-49df-8361-38abc4e851ec.png"
                alt="Fico Point Logo"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Providing fast, secure and convenient financial solutions through our mobile application.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-ficogreen transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-ficogreen transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-ficogreen transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-ficogreen transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-ficogreen transition-colors">Home</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-ficogreen transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#about-us" className="text-gray-400 hover:text-ficogreen transition-colors">About Us</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-ficogreen transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-ficogreen transition-colors">Contact</a>
              </li>
              <li>
                <a href="/admin/login" className="text-gray-400 hover:text-ficogreen transition-colors">Admin Login</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-ficogreen mr-2 mt-0.5" />
                <span className="text-gray-400">info@ficopoint.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-ficogreen mr-2 mt-0.5" />
                <span className="text-gray-400">+233 (0) 20 123 4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-ficogreen mr-2 mt-0.5" />
                <span className="text-gray-400">123 Financial Avenue<br />Accra, Ghana</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for tips and updates on financial management.
            </p>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="w-full bg-ficogreen text-black hover:bg-ficogreen/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Fico Point Micro Finance. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-ficogreen transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ficogreen transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-ficogreen transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
