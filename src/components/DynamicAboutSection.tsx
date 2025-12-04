import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { Heart, Leaf, User } from 'lucide-react';
import { useScrollAnimation, getAnimationClasses } from '@/hooks/useScrollAnimation';

export const DynamicAboutSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useBrandSettings();
  
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: iconsRef, isVisible: iconsVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section 
      id="about" 
      className="py-20 bg-white relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-teal mb-8 ${getAnimationClasses(isVisible, 'fade-up')}`}>
            {t('about.title')}
          </h2>
          
          {/* Decorative icons with staggered animation */}
          <div 
            className="flex justify-center items-center gap-8 mb-12"
            ref={iconsRef as React.RefObject<HTMLDivElement>}
          >
            <div className={`w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3 ${iconsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
              <Heart className="w-8 h-8 text-teal" />
            </div>
            <div className={`w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-rotate-3 ${iconsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              <Leaf className="w-8 h-8 text-olive" />
            </div>
            <div className={`w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-3 ${iconsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
              <User className="w-8 h-8 text-teal" />
            </div>
          </div>
          
          <p className={`text-lg md:text-xl text-ink/80 leading-relaxed max-w-3xl mx-auto ${getAnimationClasses(isVisible, 'fade-up')}`} style={{ transitionDelay: '200ms' }}>
            {settings.brand.description[language]}
          </p>
        </div>
      </div>
    </section>
  );
};