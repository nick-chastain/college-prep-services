import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
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
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 lg:px-10",
        scrolled || isMenuOpen ? "py-4 bg-white shadow-sm" : "py-6 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold text-brand-teal transition-opacity duration-300 hover:opacity-80 flex items-center gap-2">
          <img 
            src={`${import.meta.env.BASE_URL}CPS-Logo.png`}
            alt="College Prep Services Logo" 
            className="h-10"
          />
          College Prep Services
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Button asChild size="sm" className="rounded-full px-6 bg-brand-teal hover:bg-brand-teal/90 text-white">
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
          <Button asChild size="lg" className="w-full rounded-full mt-4 bg-brand-teal hover:bg-brand-teal/90 text-white">
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
