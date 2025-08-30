import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const serviceLinks = [
    { name: 'SAT Test Prep', path: '/sat-test-prep' },
    { name: 'College Admissions Counseling', path: '/college-admissions-counseling' },
    { name: 'Individual Tutoring', path: '/individual-tutoring' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 lg:px-10",
        scrolled || isMenuOpen ? "py-4 bg-white shadow-sm" : "py-6 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold text-[rgb(87,155,142)] transition-opacity duration-300 hover:opacity-80 flex items-center gap-2">
          <img 
            src={`${import.meta.env.BASE_URL}CPS_Logo.png`}
            alt="College Prep Services Logo" 
            className="h-10"
          />
          College Prep Services
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Button asChild size="sm" className="rounded-full px-6 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white">
            <Link to="/schedule">
              Schedule a Session
            </Link>
          </Button>
          
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-base font-medium animated-underline transition-colors",
                location.pathname === link.path
                  ? "text-brand-teal"
                  : "text-brand-dark hover:text-brand-teal"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="text-base font-medium animated-underline transition-colors text-brand-dark hover:text-brand-teal flex items-center gap-1"
            >
              Services <ChevronDown size={16} className={cn("transition-transform", isServicesOpen && "rotate-180")} />
            </button>
            
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="block px-4 py-2 text-sm text-brand-dark hover:text-brand-teal hover:bg-brand-light/50 transition-colors"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link
            to="/contact"
            className={cn(
              "text-base font-medium animated-underline transition-colors",
              location.pathname === "/contact"
                ? "text-brand-teal"
                : "text-brand-dark hover:text-brand-teal"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brand-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - fixed the transparency issue */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-24 px-6 pb-8 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-xl font-medium animated-underline transition-colors py-2",
                location.pathname === link.path
                  ? "text-brand-teal"
                  : "text-brand-dark hover:text-brand-teal"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Services */}
          <div className="space-y-4">
            <div className="text-xl font-medium text-brand-dark py-2">Services</div>
            {serviceLinks.map((service) => (
              <Link
                key={service.name}
                to={service.path}
                className={cn(
                  "text-lg text-brand-dark/80 hover:text-brand-teal transition-colors py-2 block pl-4",
                  location.pathname === service.path && "text-brand-teal"
                )}
              >
                {service.name}
              </Link>
            ))}
          </div>
          
          <Button asChild size="lg" className="w-full rounded-full mt-4 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white">
            <Link to="/schedule">
              Schedule a Session
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
