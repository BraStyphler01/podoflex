import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLandingContent } from '@/hooks/useLandingContent';
import { useToast } from '@/hooks/use-toast';
import { Save, FileText } from 'lucide-react';

const ContentManager: React.FC = () => {
  const { content, loading, updateContent } = useLandingContent();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [heroData, setHeroData] = useState({
    title: content.hero?.title || '',
    subtitle: content.hero?.subtitle || '',
    cta: content.hero?.cta || ''
  });

  const [aboutData, setAboutData] = useState({
    title: content.about?.title || '',
    description: content.about?.description || ''
  });

  const [servicesData, setServicesData] = useState({
    title: content.services?.title || '',
    services: content.services?.services || []
  });

  const [contactData, setContactData] = useState({
    title: content.contact?.title || '',
    email: content.contact?.email || '',
    phone: content.contact?.phone || '',
    address: content.contact?.address || ''
  });

  React.useEffect(() => {
    if (content.hero) {
      setHeroData({
        title: content.hero.title || '',
        subtitle: content.hero.subtitle || '',
        cta: content.hero.cta || ''
      });
    }
    if (content.about) {
      setAboutData({
        title: content.about.title || '',
        description: content.about.description || ''
      });
    }
    if (content.services) {
      setServicesData({
        title: content.services.title || '',
        services: content.services.services || []
      });
    }
    if (content.contact) {
      setContactData({
        title: content.contact.title || '',
        email: content.contact.email || '',
        phone: content.contact.phone || '',
        address: content.contact.address || ''
      });
    }
  }, [content]);

  const handleSaveSection = async (section: string, data: any) => {
    try {
      setSaving(true);
      await updateContent(section, data);
      toast({
        title: "Success",
        description: `${section} section updated successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    setServicesData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '' }]
    }));
  };

  const updateService = (index: number, field: 'name' | 'description', value: string) => {
    setServicesData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const removeService = (index: number) => {
    setServicesData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-6 h-6" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage your landing page content</p>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main banner content for your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heroTitle">Title</Label>
                <Input
                  id="heroTitle"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="heroSubtitle">Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="heroCta">Call to Action Button</Label>
                <Input
                  id="heroCta"
                  value={heroData.cta}
                  onChange={(e) => setHeroData({ ...heroData, cta: e.target.value })}
                />
              </div>
              <Button 
                onClick={() => handleSaveSection('hero', heroData)}
                disabled={saving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Hero Section'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Information about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aboutTitle">Title</Label>
                <Input
                  id="aboutTitle"
                  value={aboutData.title}
                  onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="aboutDescription">Description</Label>
                <Textarea
                  id="aboutDescription"
                  value={aboutData.description}
                  onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <Button 
                onClick={() => handleSaveSection('about', aboutData)}
                disabled={saving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save About Section'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Section</CardTitle>
              <CardDescription>Manage your service offerings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="servicesTitle">Section Title</Label>
                <Input
                  id="servicesTitle"
                  value={servicesData.title}
                  onChange={(e) => setServicesData({ ...servicesData, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Services</Label>
                  <Button onClick={addService} variant="outline" size="sm">
                    Add Service
                  </Button>
                </div>
                
                {servicesData.services.map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Service {index + 1}</Label>
                      <Button 
                        onClick={() => removeService(index)} 
                        variant="outline" 
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                    <Input
                      placeholder="Service name"
                      value={service.name}
                      onChange={(e) => updateService(index, 'name', e.target.value)}
                    />
                    <Textarea
                      placeholder="Service description"
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => handleSaveSection('services', servicesData)}
                disabled={saving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Services Section'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Section</CardTitle>
              <CardDescription>Contact information and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactTitle">Title</Label>
                <Input
                  id="contactTitle"
                  value={contactData.title}
                  onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contactAddress">Address</Label>
                <Textarea
                  id="contactAddress"
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  rows={3}
                />
              </div>
              <Button 
                onClick={() => handleSaveSection('contact', contactData)}
                disabled={saving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Contact Section'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;