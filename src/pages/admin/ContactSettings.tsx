import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContactSettingsProps {
  formData: any;
  onInputChange: (path: string, value: string) => void;
}

export const ContactSettings: React.FC<ContactSettingsProps> = ({ formData, onInputChange }) => {
  return (
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
              onChange={(e) => onInputChange('contact.email', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              value={formData.contact.whatsapp}
              onChange={(e) => onInputChange('contact.whatsapp', e.target.value)}
              placeholder="+32471264101"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input
              id="instagram"
              value={formData.contact.instagram}
              onChange={(e) => onInputChange('contact.instagram', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="linktree">Linktree URL</Label>
            <Input
              id="linktree"
              value={formData.contact.linktree}
              onChange={(e) => onInputChange('contact.linktree', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tiktok">TikTok URL</Label>
          <Input
            id="tiktok"
            value={formData.contact.tiktok}
            onChange={(e) => onInputChange('contact.tiktok', e.target.value)}
            placeholder="https://www.tiktok.com/@podoflexbyheidi"
          />
        </div>
      </CardContent>
    </Card>
  );
};