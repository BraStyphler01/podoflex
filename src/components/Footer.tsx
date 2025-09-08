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
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">P</span>
            </div>
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