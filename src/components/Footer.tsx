
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-light py-16 border-t border-gray-100">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-brand-teal hover:opacity-90 transition-opacity">
              College Prep Services
            </Link>
            <p className="text-brand-dark/80 mt-4 leading-relaxed">
              Personalized SAT tutoring and college application help for high school students in the Denver area.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-brand-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-brand-teal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-brand-teal transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  College Application Help
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  SAT Prep Classes
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  Individual Tutoring
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  Schedule a Session
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-brand-teal mt-1 flex-shrink-0" />
                <span className="text-brand-dark/80">Denver Metropolitan Area, Colorado</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-teal flex-shrink-0" />
                <a href="mailto:info@collegeprepservicesllc.com" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  info@collegeprepservicesllc.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-teal flex-shrink-0" />
                <a href="tel:+13035551234" className="text-brand-dark/80 hover:text-brand-teal transition-colors">
                  (303) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-dark/60 text-sm">
            © {currentYear} College Prep Services LLC. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-sm text-brand-dark/60 hover:text-brand-teal transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-dark/60 hover:text-brand-teal transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-brand-dark/60 hover:text-brand-teal transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
