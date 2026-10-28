import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  lines: string[];
  price: string;
  icon: ReactNode;
  link: string;
  className?: string;
}

const ServiceCard = ({ title, lines, price, icon, link, className }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "relative bg-white rounded-2xl p-8 hover-lift transition-all duration-300 h-full md:min-h-[30rem] flex flex-col",
        "border-2 border-[rgb(87,155,142)] shadow-lg shadow-brand-teal/10 hover:shadow-2xl hover:shadow-brand-teal/30",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-brand-teal transform origin-left transition-transform duration-300" />
      
      <div className="rounded-full w-14 h-14 bg-accent flex items-center justify-center mb-6 text-brand-teal">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <ul className="space-y-2 text-brand-dark/80 leading-relaxed mb-6">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <p className="text-2xl font-bold text-[rgb(87,155,142)] mt-auto mb-6">{price}</p>
      
      <Button asChild variant="outline" className="rounded-full border-[rgb(87,155,142)] text-[rgb(87,155,142)] hover:bg-[rgb(87,155,142)] hover:text-white">
        <Link to={link}>
          Learn More
        </Link>
      </Button>
    </div>
  );
};

export default ServiceCard;
