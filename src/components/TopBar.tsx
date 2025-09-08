import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LangToggle } from './LangToggle';
import { Instagram, Link2, Mail } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      name: t('nav.instagram'),
      icon: <Instagram className="w-4 h-4" />,
      url: 'https://www.instagram.com/podoflex_by_heidi',
    },
    {
      name: t('nav.linktree'),
      icon: <Link2 className="w-4 h-4" />,
      url: 'https://linktr.ee/PodoflexbyHeidi',
    },
    {
      name: t('nav.email'),
      icon: <Mail className="w-4 h-4" />,
      url: 'mailto:podoflexbyheidi@gmail.com',
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-teal hover:text-olive hover:bg-gray-50 rounded-lg transition-all duration-200"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          {/* Language Toggle */}
          <LangToggle />
        </div>
      </div>
    </div>
  );
};