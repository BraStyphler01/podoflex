import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export const LangToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-[var(--radius)] p-1 shadow-soft">
      <Button
        variant={language === 'en' ? 'teal' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs font-medium"
        aria-label="Switch to English"
      >
        EN
      </Button>
      <Button
        variant={language === 'fr' ? 'teal' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className="text-xs font-medium"
        aria-label="Passer au français"
      >
        FR
      </Button>
    </div>
  );
};