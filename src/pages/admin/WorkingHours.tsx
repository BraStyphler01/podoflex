import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WorkingHoursProps {
  formData: any;
  onInputChange: (path: string, value: string) => void;
}

const days = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export const WorkingHours: React.FC<WorkingHoursProps> = ({ formData, onInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Working Hours</CardTitle>
        <CardDescription>Set your business hours for each day of the week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {days.map((day) => (
          <div key={day.key} className="grid grid-cols-3 gap-4 items-center">
            <Label className="font-medium">{day.label}</Label>
            <div>
              <Label className="text-sm text-gray-500">English</Label>
              <Input
                value={formData.workingHours?.en?.[day.key] || ''}
                onChange={(e) => onInputChange(`workingHours.en.${day.key}`, e.target.value)}
                placeholder="Appointment only"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-500">French</Label>
              <Input
                value={formData.workingHours?.fr?.[day.key] || ''}
                onChange={(e) => onInputChange(`workingHours.fr.${day.key}`, e.target.value)}
                placeholder="Sur rendez-vous uniquement"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};