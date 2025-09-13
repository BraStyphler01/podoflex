import React from 'react';
import { useLandingContent } from '@/hooks/useLandingContent';

const DatabaseContactSection: React.FC = () => {
  const { content, loading } = useLandingContent();

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center">
            <div className="h-8 w-48 bg-gray-300 rounded mb-6 mx-auto"></div>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const contactData = content.contact || {
    title: 'Contact Us',
    email: 'contact@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345'
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            {contactData.title}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <a 
                href={`mailto:${contactData.email}`} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {contactData.email}
              </a>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <a 
                href={`tel:${contactData.phone}`} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {contactData.phone}
              </a>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground">
                {contactData.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatabaseContactSection;