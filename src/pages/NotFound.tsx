
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="min-h-[70vh] flex items-center justify-center bg-brand-light">
          <div className="container px-6 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg mx-auto text-center"
            >
              <h1 className="text-8xl font-bold mb-6 text-brand-teal">404</h1>
              <h2 className="text-2xl font-semibold mb-4 text-brand-dark">Page Not Found</h2>
              <p className="text-lg text-brand-dark/70 mb-8">
                The page you're looking for doesn't exist or has been moved to a different location.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link to="/" className="flex items-center gap-2">
                    <Home size={18} /> Return to Home
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft size={18} /> Go Back
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
