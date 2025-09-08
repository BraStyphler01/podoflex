import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';

const WHATSAPP_NUMBER = "+1234567890"; // Replace with actual number

export const CtaStripe: React.FC = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsapp.message'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:podoflexbyheidi@gmail.com', '_blank');
  };

  return (
    <section className="py-16 bg-gradient-primary relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-white mb-8 font-medium">
            {t('cta.text')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="olive"
              size="lg"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto min-w-[180px] bg-white text-teal hover:bg-white/90"
              aria-label={t('cta.whatsapp')}
            >
              <MessageCircle className="mr-2" />
              {t('cta.whatsapp')}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleEmailClick}
              className="w-full sm:w-auto min-w-[180px] border-white text-white hover:bg-white hover:text-teal"
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