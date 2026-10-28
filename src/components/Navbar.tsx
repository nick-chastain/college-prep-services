import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'SAT Prep', path: '/sat-test-prep' },
  { name: 'Programs & Pricing', path: '/services' },
  { name: 'Success Stories', path: '/client-stories' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const linkClass = (path: string) =>
    cn(
      "text-base font-medium animated-underline transition-colors",
      location.pathname === path
        ? "text-brand-teal"
        : "text-brand-dark hover:text-brand-teal"
    );

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
        
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={linkClass(link.path)}>
              {link.name}
            </Link>
          ))}
          <Button asChild size="sm" className="rounded-full px-6 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white">
            <Link to="/contact">Book a Free Strategy Session</Link>
          </Button>
        </nav>

        <button
          className="lg:hidden text-brand-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-24 px-6 pb-8 lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
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
          <Button asChild size="lg" className="w-full rounded-full mt-4 bg-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)]/90 text-white">
            <Link to="/contact">Book a Free Strategy Session</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
