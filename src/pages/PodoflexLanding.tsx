import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { BrandSettingsProvider } from '@/contexts/BrandSettingsContext';
import { TopBar } from '@/components/TopBar';
import { DynamicHero } from '@/components/DynamicHero';
import { DynamicAboutSection } from '@/components/DynamicAboutSection';
import { ServicesGrid } from '@/components/ServicesGrid';
import { CtaStripe } from '@/components/CtaStripe';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const PodoflexLanding: React.FC = () => {
  return (
    <BrandSettingsProvider>
      <LanguageProvider>
        <div className="min-h-screen">
          {/* Top Navigation */}
          <TopBar />
          
          {/* Main Content */}
          <main className="pt-16">
            <DynamicHero />
            <DynamicAboutSection />
            <ServicesGrid />
            <CtaStripe />
            <ContactSection />
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
                "@type": "HealthAndBeautyBusiness",
                "name": "Podoflex by Heidi",
                "url": "https://podoflex.com",
                "email": "podoflexbyheidi@gmail.com",
                "description": "Professional foot care and holistic wellness services including medical pedicures, reflexotherapy, and foot health consultancy.",
                "serviceType": [
                  "Medical Pedicures",
                  "Reflexotherapy",
                  "Foot Care Products",
                  "Health Consultancy"
                ],
                "sameAs": [
                  "https://www.instagram.com/podoflex_by_heidi",
                  "https://linktr.ee/PodoflexbyHeidi"
                ],
                "areaServed": "Wellness and Healthcare",
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Foot Care Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Advanced Medical Pedicures",
                        "description": "Professional medical-grade pedicure treatments for optimal foot health and care."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Reflexotherapy Treatments",
                        "description": "Soothing therapeutic sessions that promote relaxation and holistic wellness."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Foot Care Products",
                        "description": "Curated selection of premium products for maintaining healthy, comfortable feet."
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Consultancy & Training",
                        "description": "Expert professional advice and educational training in foot health and wellness."
                      }
                    }
                  ]
                }
              })
            }}
          />
        </div>
      </LanguageProvider>
    </BrandSettingsProvider>
  );
};

export default PodoflexLanding;