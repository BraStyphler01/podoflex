import React from 'react';
import { useLandingContent } from '@/hooks/useLandingContent';

const DatabaseAboutSection: React.FC = () => {
  const { content, loading } = useLandingContent();

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center">
            <div className="h-8 w-48 bg-gray-300 rounded mb-6 mx-auto"></div>
            <div className="h-6 w-96 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  const aboutData = content.about || {
    title: 'About Us',
    description: 'We provide innovative solutions to help businesses thrive in the digital age.'
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {aboutData.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {aboutData.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DatabaseAboutSection;