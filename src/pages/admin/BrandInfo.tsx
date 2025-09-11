import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface BrandInfoProps {
  formData: any;
  onInputChange: (path: string, value: string) => void;
}

export const BrandInfo: React.FC<BrandInfoProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('brand.name', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tagline-en">Tagline (English)</Label>
            <Input
              id="tagline-en"
              value={formData.brand.tagline.en}
              onChange={(e) => onInputChange('brand.tagline.en', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tagline-fr">Tagline (French)</Label>
            <Input
              id="tagline-fr"
              value={formData.brand.tagline.fr}
              onChange={(e) => onInputChange('brand.tagline.fr', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="description-en">Description (English)</Label>
            <Textarea
              id="description-en"
              value={formData.brand.description.en}
              onChange={(e) => onInputChange('brand.description.en', e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="description-fr">Description (French)</Label>
            <Textarea
              id="description-fr"
              value={formData.brand.description.fr}
              onChange={(e) => onInputChange('brand.description.fr', e.target.value)}
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
              onChange={(e) => onInputChange('brand.logo', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="favicon">Favicon URL</Label>
            <Input
              id="favicon"
              value={formData.brand.favicon}
              onChange={(e) => onInputChange('brand.favicon', e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};