import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

export const DynamicHero: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useBrandSettings();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsapp.message'));
    window.open(`https://wa.me/${settings.contact.whatsapp}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${settings.contact.email}`, '_blank');
  };

  const handleExploreClick = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 wave-pattern opacity-20" />
      <div className="absolute inset-0 dot-pattern opacity-10" />
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Dynamic Logo with animation */}
          <div className="mb-8 opacity-0 animate-fade-in-down" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <img 
              src={settings.brand.logo}
              alt={`${settings.brand.name} - Professional Foot Care & Wellness`}
              className="w-48 h-48 md:w-56 md:h-56 mx-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Hero Content with staggered animations */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
            <span className="block text-teal opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {settings.brand.name.split(' ')[0]}
            </span>
            <span className="block text-olive text-2xl md:text-3xl lg:text-4xl font-medium mt-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {settings.brand.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-ink/80 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            {settings.brand.tagline[language]}
          </p>
          
          {/* Primary CTAs with staggered entrance */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto min-w-[200px] hover:scale-105 transition-transform duration-300"
              aria-label={t('hero.book_whatsapp')}
            >
              <MessageCircle className="mr-2" />
              {t('hero.book_whatsapp')}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleEmailClick}
              className="w-full sm:w-auto min-w-[200px] hover:scale-105 transition-transform duration-300"
              aria-label={t('hero.email_us')}
            >
              <Mail className="mr-2" />
              {t('hero.email_us')}
            </Button>
          </div>
          
          {/* Secondary CTA */}
          <Button
            variant="ghost"
            onClick={handleExploreClick}
            className="group opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            aria-label={t('hero.explore_services')}
          >
            {t('hero.explore_services')}
            <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform animate-float" />
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
        <div className="w-6 h-10 border-2 border-ink/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-ink/50 rounded-full mt-2 animate-float" />
        </div>
      </div>
    </section>
  );
};