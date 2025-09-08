import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Stethoscope, Sparkles, Package, GraduationCap } from 'lucide-react';

const WHATSAPP_NUMBER = "+1234567890"; // Replace with actual number

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onBookClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onBookClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 border border-gray-50 group">
      <div className="w-16 h-16 bg-gradient-subtle rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-teal mb-3">
        {title}
      </h3>
      
      <p className="text-ink/70 mb-6 leading-relaxed">
        {description}
      </p>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onBookClick}
        className="w-full group-hover:bg-teal group-hover:text-white transition-all duration-300"
      >
        <MessageCircle className="mr-2 w-4 h-4" />
        {t('services.book')}
      </Button>
    </div>
  );
};

export const ServicesGrid: React.FC = () => {
  const { t } = useLanguage();

  const handleBookClick = () => {
    const message = encodeURIComponent(t('whatsapp.message'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const services = [
    {
      icon: <Stethoscope className="w-8 h-8 text-teal" />,
      title: t('services.medical_pedicures'),
      description: t('services.medical_pedicures_desc'),
    },
    {
      icon: <Sparkles className="w-8 h-8 text-olive" />,
      title: t('services.reflexotherapy'),
      description: t('services.reflexotherapy_desc'),
    },
    {
      icon: <Package className="w-8 h-8 text-teal" />,
      title: t('services.foot_care'),
      description: t('services.foot_care_desc'),
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-olive" />,
      title: t('services.consultancy'),
      description: t('services.consultancy_desc'),
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 wave-pattern opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal mb-4">
            {t('services.title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};