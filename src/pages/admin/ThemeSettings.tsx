import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ThemeSettingsProps {
  formData: any;
  onInputChange: (path: string, value: string) => void;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ formData, onInputChange }) => {
  const fontOptions = formData.theme?.fonts?.options || [
    "Inter", "Poppins", "Roboto", "Open Sans", "Lato", 
    "Montserrat", "Source Sans Pro", "Raleway", "Nunito", "Playfair Display"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>Customize your brand colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="primary-color"
                  value={formData.theme.colors.primary}
                  onChange={(e) => onInputChange('theme.colors.primary', e.target.value)}
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
                  onChange={(e) => onInputChange('theme.colors.secondary', e.target.value)}
                />
                <div 
                  className="w-10 h-10 rounded border"
                  style={{ backgroundColor: formData.theme.colors.secondary }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Choose your preferred fonts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="primary-font">Primary Font</Label>
            <Select 
              value={formData.theme.fonts.primary} 
              onValueChange={(value) => onInputChange('theme.fonts.primary', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font: string) => (
                  <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};