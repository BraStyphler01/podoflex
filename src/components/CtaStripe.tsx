import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';
import { useScrollAnimation, getAnimationClasses } from '@/hooks/useScrollAnimation';

export const CtaStripe: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useBrandSettings();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsapp.message'));
    window.open(`https://wa.me/${settings.contact.whatsapp}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${settings.contact.email}`, '_blank');
  };

  return (
    <section 
      className="py-16 bg-gradient-primary relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <p className={`text-xl md:text-2xl text-white mb-8 font-medium ${getAnimationClasses(isVisible, 'scale')}`}>
            {t('cta.text')}
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${getAnimationClasses(isVisible, 'fade-up')}`} style={{ transitionDelay: '150ms' }}>
            <Button
              variant="olive"
              size="lg"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto min-w-[180px] bg-white text-teal hover:bg-white/90 hover:scale-105 transition-all duration-300"
              aria-label={t('cta.whatsapp')}
            >
              <MessageCircle className="mr-2" />
              {t('cta.whatsapp')}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleEmailClick}
              className="w-full sm:w-auto min-w-[180px] border-white text-white hover:bg-white hover:text-teal hover:scale-105 transition-all duration-300"
              aria-label={t('cta.email')}
            >
              <Mail className="mr-2" />
              {t('cta.email')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};