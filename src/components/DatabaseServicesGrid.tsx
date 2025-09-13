import React from 'react';
import { useLandingContent } from '@/hooks/useLandingContent';

const DatabaseServicesGrid: React.FC = () => {
  const { content, loading } = useLandingContent();

  if (loading) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center mb-12">
            <div className="h-8 w-48 bg-gray-300 rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card p-6 rounded-lg animate-pulse">
                <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const servicesData = content.services || {
    title: 'Our Services',
    services: [
      { name: 'Consulting', description: 'Expert business consulting' },
      { name: 'Development', description: 'Custom software development' },
      { name: 'Support', description: '24/7 technical support' }
    ]
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {servicesData.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.services.map((service, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.name}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DatabaseServicesGrid;