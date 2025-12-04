import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { useScrollAnimation, getAnimationClasses } from '@/hooks/useScrollAnimation';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useBrandSettings();
  const { ref: footerRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <footer 
      className="bg-ink py-12 relative overflow-hidden"
      ref={footerRef as React.RefObject<HTMLElement>}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 wave-pattern opacity-5" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className={`mb-6 ${getAnimationClasses(isVisible, 'scale')}`}>
            <img 
              src={settings.brand.logo}
              alt={settings.brand.name}
              className="w-20 h-20 mx-auto hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* Slogan */}
          <p className={`text-white/90 text-lg mb-8 italic ${getAnimationClasses(isVisible, 'fade-up')}`} style={{ transitionDelay: '100ms' }}>
            {settings.brand.tagline[language]}
          </p>
          
          {/* Legal */}
          <p className={`text-white/60 text-sm ${getAnimationClasses(isVisible, 'fade')}`} style={{ transitionDelay: '200ms' }}>
            {t('footer.legal')}
          </p>
        </div>
      </div>
    </footer>
  );
};