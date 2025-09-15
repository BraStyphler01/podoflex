import React from 'react';
import { TopBar } from '@/components/TopBar';
import DatabaseDynamicHero from '@/components/DatabaseDynamicHero';
import DatabaseAboutSection from '@/components/DatabaseAboutSection';
import DatabaseServicesGrid from '@/components/DatabaseServicesGrid';
import { CtaStripe } from '@/components/CtaStripe';
import DatabaseContactSection from '@/components/DatabaseContactSection';
import { Footer } from '@/components/Footer';

const DatabasePodoflexLanding: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <TopBar />
      
      {/* Main Content */}
      <main className="pt-16">
        <DatabaseDynamicHero />
        <DatabaseAboutSection />
        <DatabaseServicesGrid />
        <CtaStripe />
        <DatabaseContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Admin Access */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="/admin"
          className="bg-teal text-white px-4 py-2 rounded-full shadow-lg hover:bg-teal/90 transition-colors text-sm font-medium"
        >
          Admin
        </a>
      </div>
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Business Website",
            "url": window.location.origin,
            "description": "Professional business solutions and services.",
          })
        }}
      />
    </div>
  );
};

export default DatabasePodoflexLanding;