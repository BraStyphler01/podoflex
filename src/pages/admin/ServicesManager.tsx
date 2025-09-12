import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServicesManagerProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();

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

  const addService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: {
        en: "New Service",
        fr: "Nouveau Service"
      },
      description: {
        en: "Service description",
        fr: "Description du service"
      },
      icon: "circle"
    };

    setFormData({
      ...formData,
      services: [...formData.services, newService]
    });

    toast({
      title: "Service Added",
      description: "New service has been added successfully.",
    });
  };

  const deleteService = (index: number) => {
    const newServices = formData.services.filter((_: any, i: number) => i !== index);
    setFormData({
      ...formData,
      services: newServices
    });

    toast({
      title: "Service Deleted",
      description: "Service has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Services Management</h2>
          <p className="text-gray-600">Add, edit, or remove your service offerings</p>
        </div>
        <Button onClick={addService} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Service
        </Button>
      </div>

      {formData.services.map((service: any, index: number) => (
        <Card key={service.id}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Service {index + 1}</CardTitle>
                <CardDescription>ID: {service.id}</CardDescription>
              </div>
              {formData.services.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteService(index)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              <Label>Icon (Lucide icon name)</Label>
              <Input
                value={service.icon}
                onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                placeholder="stethoscope, sparkles, package, etc."
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};