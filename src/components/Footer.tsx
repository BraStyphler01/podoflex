import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 wave-pattern opacity-5" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="/lovable-uploads/d383d914-c1de-4968-92b0-1d29f01190ad.png" 
              alt="Podoflex by Heidi"
              className="w-20 h-20 mx-auto"
            />
          </div>
          
          {/* Slogan */}
          <p className="text-white/90 text-lg mb-8 italic">
            {t('footer.slogan')}
          </p>
          
          {/* Legal */}
          <p className="text-white/60 text-sm">
            {t('footer.legal')}
          </p>
        </div>
      </div>
    </footer>
  );
};