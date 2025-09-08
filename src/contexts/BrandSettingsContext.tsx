import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import brandSettingsData from '@/data/brandSettings.json';

export interface BrandSettings {
  brand: {
    name: string;
    tagline: { en: string; fr: string };
    description: { en: string; fr: string };
    logo: string;
    favicon: string;
  };
  contact: {
    email: string;
    whatsapp: string;
    instagram: string;
    linktree: string;
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fonts: {
      primary: string;
    };
  };
  services: Array<{
    id: string;
    title: { en: string; fr: string };
    description: { en: string; fr: string };
    icon: string;
  }>;
}

interface BrandSettingsContextType {
  settings: BrandSettings;
  updateSettings: (newSettings: BrandSettings) => void;
  resetSettings: () => void;
}

const BrandSettingsContext = createContext<BrandSettingsContextType | undefined>(undefined);

interface BrandSettingsProviderProps {
  children: ReactNode;
}

export const BrandSettingsProvider: React.FC<BrandSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<BrandSettings>(() => {
    const saved = localStorage.getItem('podoflex-brand-settings');
    return saved ? JSON.parse(saved) : brandSettingsData as BrandSettings;
  });

  useEffect(() => {
    localStorage.setItem('podoflex-brand-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: BrandSettings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(brandSettingsData as BrandSettings);
    localStorage.removeItem('podoflex-brand-settings');
  };

  return (
    <BrandSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </BrandSettingsContext.Provider>
  );
};

export const useBrandSettings = (): BrandSettingsContextType => {
  const context = useContext(BrandSettingsContext);
  if (!context) {
    throw new Error('useBrandSettings must be used within a BrandSettingsProvider');
  }
  return context;
};