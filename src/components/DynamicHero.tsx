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
          {/* Dynamic Logo */}
          <div className="mb-8">
            <img 
              src={settings.brand.logo}
              alt={`${settings.brand.name} - Professional Foot Care & Wellness`}
              className="w-48 h-48 md:w-56 md:h-56 mx-auto"
            />
          </div>
          
          {/* Hero Content */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
            <span className="block text-teal">{settings.brand.name.split(' ')[0]}</span>
            <span className="block text-olive text-2xl md:text-3xl lg:text-4xl font-medium mt-2">
              {settings.brand.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-ink/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {settings.brand.tagline[language]}
          </p>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              size="lg"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto min-w-[200px]"
              aria-label={t('hero.book_whatsapp')}
            >
              <MessageCircle className="mr-2" />
              {t('hero.book_whatsapp')}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleEmailClick}
              className="w-full sm:w-auto min-w-[200px]"
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
            className="group"
            aria-label={t('hero.explore_services')}
          >
            {t('hero.explore_services')}
            <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};