import React, { useState } from 'react';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, RotateCcw, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useBrandSettings();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState(settings);

  const handleInputChange = (path: string, value: string) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setFormData(newData);
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services];
    const keys = field.split('.');
    let current: any = newServices[index];
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setFormData({
      ...formData,
      services: newServices
    });
  };

  const handleSave = () => {
    updateSettings(formData);
    toast({
      title: "Settings Saved",
      description: "Brand settings have been updated successfully.",
    });
  };

  const handleReset = () => {
    resetSettings();
    setFormData(settings);
    toast({
      title: "Settings Reset",
      description: "Brand settings have been reset to defaults.",
    });
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage your brand settings and content</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="brand">Brand Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          {/* Brand Info Tab */}
          <TabsContent value="brand">
            <Card>
              <CardHeader>
                <CardTitle>Brand Information</CardTitle>
                <CardDescription>Update your brand name, taglines, and descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input
                    id="brand-name"
                    value={formData.brand.name}
                    onChange={(e) => handleInputChange('brand.name', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tagline-en">Tagline (English)</Label>
                    <Input
                      id="tagline-en"
                      value={formData.brand.tagline.en}
                      onChange={(e) => handleInputChange('brand.tagline.en', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline-fr">Tagline (French)</Label>
                    <Input
                      id="tagline-fr"
                      value={formData.brand.tagline.fr}
                      onChange={(e) => handleInputChange('brand.tagline.fr', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="description-en">Description (English)</Label>
                    <Textarea
                      id="description-en"
                      value={formData.brand.description.en}
                      onChange={(e) => handleInputChange('brand.description.en', e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description-fr">Description (French)</Label>
                    <Textarea
                      id="description-fr"
                      value={formData.brand.description.fr}
                      onChange={(e) => handleInputChange('brand.description.fr', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={formData.brand.logo}
                      onChange={(e) => handleInputChange('brand.logo', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      value={formData.brand.favicon}
                      onChange={(e) => handleInputChange('brand.favicon', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update contact details and social media links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleInputChange('contact.email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      value={formData.contact.whatsapp}
                      onChange={(e) => handleInputChange('contact.whatsapp', e.target.value)}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={formData.contact.instagram}
                      onChange={(e) => handleInputChange('contact.instagram', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linktree">Linktree URL</Label>
                    <Input
                      id="linktree"
                      value={formData.contact.linktree}
                      onChange={(e) => handleInputChange('contact.linktree', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.services.map((service, index) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Service {index + 1}</h4>
                      <span className="text-sm text-gray-500">{service.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Title (English)</Label>
                        <Input
                          value={service.title.en}
                          onChange={(e) => handleServiceChange(index, 'title.en', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Title (French)</Label>
                        <Input
                          value={service.title.fr}
                          onChange={(e) => handleServiceChange(index, 'title.fr', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Description (English)</Label>
                        <Textarea
                          value={service.description.en}
                          onChange={(e) => handleServiceChange(index, 'description.en', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Description (French)</Label>
                        <Textarea
                          value={service.description.fr}
                          onChange={(e) => handleServiceChange(index, 'description.fr', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Icon</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                        placeholder="lucide icon name (e.g., stethoscope)"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize colors and fonts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Colors</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primary-color"
                          value={formData.theme.colors.primary}
                          onChange={(e) => handleInputChange('theme.colors.primary', e.target.value)}
                        />
                        <div 
                          className="w-10 h-10 rounded border"
                          style={{ backgroundColor: formData.theme.colors.primary }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondary-color"
                          value={formData.theme.colors.secondary}
                          onChange={(e) => handleInputChange('theme.colors.secondary', e.target.value)}
                        />
                        <div 
                          className="w-10 h-10 rounded border"
                          style={{ backgroundColor: formData.theme.colors.secondary }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="primary-font">Primary Font</Label>
                  <Input
                    id="primary-font"
                    value={formData.theme.fonts.primary}
                    onChange={(e) => handleInputChange('theme.fonts.primary', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;