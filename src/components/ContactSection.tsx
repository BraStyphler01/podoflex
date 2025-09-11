import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Link2, Mail, MessageCircle, Video, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { settings } = useBrandSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const emailBody = `From: ${name} (${email})\n\n${message}`;
    const mailtoLink = `mailto:${settings.contact.email}?subject=Contact from ${name}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: settings.contact.instagram,
    },
    {
      name: 'Linktree', 
      icon: <Link2 className="w-5 h-5" />,
      url: settings.contact.linktree,
    },
    {
      name: 'TikTok',
      icon: <Video className="w-5 h-5" />,
      url: settings.contact.tiktok,
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://wa.me/${settings.contact.whatsapp.replace(/[^0-9]/g, '')}`,
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:${settings.contact.email}`,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal mb-8">
              {t('contact.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-subtle rounded-2xl p-8 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    {t('contact.form_name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    {t('contact.form_email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    {t('contact.form_message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  {t('contact.form_submit')}
                </Button>
              </form>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-teal mb-6">
                  {t('contact.quick_links')}
                </h3>
                
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft hover:shadow-card transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-subtle rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        {link.icon}
                      </div>
                      <span className="text-ink font-medium group-hover:text-teal transition-colors duration-300">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <h4 className="text-lg font-semibold text-teal mb-4">Contact Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-teal" />
                    <span className="text-ink">{settings.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-teal" />
                    <span className="text-ink">{settings.contact.whatsapp}</span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              {settings.workingHours && (
                <div className="bg-white rounded-xl p-6 shadow-soft">
                  <h4 className="text-lg font-semibold text-teal mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Working Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(settings.workingHours[language] || {}).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-ink capitalize font-medium">{day}:</span>
                        <span className="text-ink">{hours as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};