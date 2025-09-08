import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.language': 'Language',
    'nav.instagram': 'Instagram',
    'nav.linktree': 'Linktree',
    'nav.email': 'Email',
    
    // Hero
    'hero.tagline': 'Step into healing, stay in comfort.',
    'hero.book_whatsapp': 'Book on WhatsApp',
    'hero.email_us': 'Email Us',
    'hero.explore_services': 'Explore Services',
    'whatsapp.message': 'Hello Podoflex, I\'d like to book an appointment.',
    
    // About
    'about.title': 'About Podoflex',
    'about.text': 'Podoflex by Heidi is dedicated to your foot health and overall holistic well-being. Our services encompass advanced medical pedicures, soothing reflexotherapy treatments, and a curated selection of foot care products. We also provide expert professional consultancy and valuable foot health training and education.',
    
    // Services
    'services.title': 'Our Services',
    'services.medical_pedicures': 'Advanced Medical Pedicures',
    'services.medical_pedicures_desc': 'Professional medical-grade pedicure treatments for optimal foot health and care.',
    'services.reflexotherapy': 'Reflexotherapy Treatments',
    'services.reflexotherapy_desc': 'Soothing therapeutic sessions that promote relaxation and holistic wellness.',
    'services.foot_care': 'Foot Care Products',
    'services.foot_care_desc': 'Curated selection of premium products for maintaining healthy, comfortable feet.',
    'services.consultancy': 'Consultancy & Training',
    'services.consultancy_desc': 'Expert professional advice and educational training in foot health and wellness.',
    'services.book': 'Book Now',
    
    // CTA Stripe
    'cta.text': 'Appointments by request. Quickest reply on WhatsApp.',
    'cta.whatsapp': 'WhatsApp',
    'cta.email': 'Email',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.form_name': 'Full Name',
    'contact.form_email': 'Email Address',
    'contact.form_message': 'Message',
    'contact.form_submit': 'Send Message',
    'contact.quick_links': 'Quick Links',
    
    // Footer
    'footer.slogan': 'Step into healing, stay in comfort.',
    'footer.legal': '© 2024 Podoflex by Heidi. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.language': 'Langue',
    'nav.instagram': 'Instagram',
    'nav.linktree': 'Linktree',
    'nav.email': 'Email',
    
    // Hero
    'hero.tagline': 'Entrez dans la guérison, restez dans le confort.',
    'hero.book_whatsapp': 'Réserver sur WhatsApp',
    'hero.email_us': 'Nous écrire',
    'hero.explore_services': 'Découvrir nos services',
    'whatsapp.message': 'Bonjour Podoflex, je souhaite prendre rendez-vous.',
    
    // About
    'about.title': 'À propos de Podoflex',
    'about.text': 'Podoflex by Heidi est dédié à la santé de vos pieds et à votre bien-être holistique. Nos services incluent des pédicures médicales avancées, des séances apaisantes de réflexothérapie et une sélection soignée de produits de soins des pieds. Nous proposons également des conseils professionnels et des formations utiles en santé du pied.',
    
    // Services
    'services.title': 'Nos Services',
    'services.medical_pedicures': 'Pédicures médicales avancées',
    'services.medical_pedicures_desc': 'Traitements de pédicure de niveau médical pour une santé et des soins optimaux des pieds.',
    'services.reflexotherapy': 'Réflexothérapie',
    'services.reflexotherapy_desc': 'Séances thérapeutiques apaisantes qui favorisent la relaxation et le bien-être holistique.',
    'services.foot_care': 'Produits de soins des pieds',
    'services.foot_care_desc': 'Sélection soignée de produits premium pour maintenir des pieds sains et confortables.',
    'services.consultancy': 'Conseil & Formation',
    'services.consultancy_desc': 'Conseils professionnels experts et formation éducative en santé et bien-être des pieds.',
    'services.book': 'Réserver',
    
    // CTA Stripe
    'cta.text': 'Rendez-vous sur demande. Réponse la plus rapide sur WhatsApp.',
    'cta.whatsapp': 'WhatsApp',
    'cta.email': 'Email',
    
    // Contact
    'contact.title': 'Contactez-nous',
    'contact.form_name': 'Nom complet',
    'contact.form_email': 'Adresse email',
    'contact.form_message': 'Message',
    'contact.form_submit': 'Envoyer le message',
    'contact.quick_links': 'Liens rapides',
    
    // Footer
    'footer.slogan': 'Entrez dans la guérison, restez dans le confort.',
    'footer.legal': '© 2024 Podoflex by Heidi. Tous droits réservés.',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('podoflex-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('podoflex-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};