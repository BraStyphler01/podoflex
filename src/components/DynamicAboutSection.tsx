import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { Heart, Leaf, User } from 'lucide-react';

export const DynamicAboutSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useBrandSettings();

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal mb-8">
            {t('about.title')}
          </h2>
          
          {/* Decorative icons */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-teal" />
            </div>
            <div className="w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-olive" />
            </div>
            <div className="w-16 h-16 bg-gradient-subtle rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-teal" />
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-ink/80 leading-relaxed max-w-3xl mx-auto">
            {settings.brand.description[language]}
          </p>
        </div>
      </div>
    </section>
  );
};