import React from 'react';
import { useLandingContent } from '@/hooks/useLandingContent';
import { Button } from '@/components/ui/button';

const DatabaseDynamicHero: React.FC = () => {
  const { content, loading } = useLandingContent();

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="animate-pulse text-center">
          <div className="h-12 w-64 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="h-6 w-96 bg-gray-200 rounded mx-auto"></div>
        </div>
      </section>
    );
  }

  const heroData = content.hero || {
    title: 'Transform Your Business',
    subtitle: 'Professional solutions for modern challenges',
    cta: 'Get Started'
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          {heroData.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up animation-delay-200">
          {heroData.subtitle}
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400">
          {heroData.cta}
        </Button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default DatabaseDynamicHero;