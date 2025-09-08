import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-light py-16 border-t border-gray-100">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-[rgb(87,155,142)] hover:opacity-90 transition-opacity flex items-center gap-2">
              <img 
                src={`${import.meta.env.BASE_URL}CPS_Logo.png`} 
                alt="College Prep Services Logo" 
                className="h-8"
              />
              College Prep Services
            </Link>
            <p className="text-brand-dark/80 mt-4 leading-relaxed">
            Helping high school students achieve their academic and life goals. Our commitment is to your complete success and peace of mind.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-brand-teal transition-colors hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-brand-teal transition-colors hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-brand-teal transition-colors hover:scale-110">
                <Youtube size={20} />
              </a>
              <a href="#" aria-label="TikTok" className="text-gray-500 hover:text-brand-teal transition-colors hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sat-test-prep" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-105">
                  SAT Test Prep
                </Link>
              </li>
              <li>
                <Link to="/college-admissions-counseling" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-105">
                  College Admissions Counseling
                </Link>
              </li>
              <li>
                <Link to="/individual-tutoring" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-105">
                  Individual Academic Tutoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-105">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-105">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-teal flex-shrink-0" />
                <a href="tel:+14846439324" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-100">
                  (484) 643-9324
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-teal flex-shrink-0" />
                <a href="mailto:info@collegeprepservicesllc.com" className="text-brand-dark/80 hover:text-brand-teal transition-colors hover:scale-100">
                  info@collegeprepservicesllc.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-brand-dark/60 text-sm mb-2">
            © {currentYear} College Prep Services LLC. All rights reserved.
          </p>
          <p className="text-brand-dark/60 text-sm">
            A Dedicated Partner in Your Child's Journey to Success.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
