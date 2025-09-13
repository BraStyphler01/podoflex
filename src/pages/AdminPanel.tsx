import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useBrandSettings } from '@/contexts/BrandSettingsContext';
import { AdminLayout } from '@/components/AdminLayout';
import { BrandInfo } from './admin/BrandInfo';
import { ContactSettings } from './admin/ContactSettings';
import { ServicesManager } from './admin/ServicesManager';
import { WorkingHours } from './admin/WorkingHours';
import { ThemeSettings } from './admin/ThemeSettings';
import UserManagement from './admin/UserManagement';
import ContentManager from './admin/ContentManager';
import { useToast } from '@/hooks/use-toast';

const AdminPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useBrandSettings();
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

  // Update formData when settings change
  React.useEffect(() => {
    setFormData(settings);
  }, [settings]);

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
    <AdminLayout onSave={handleSave} onReset={handleReset} onPreview={handlePreview}>
      <Routes>
        <Route index element={<BrandInfo formData={formData} onInputChange={handleInputChange} />} />
        <Route path="contact" element={<ContactSettings formData={formData} onInputChange={handleInputChange} />} />
        <Route path="services" element={<ServicesManager formData={formData} setFormData={setFormData} />} />
        <Route path="hours" element={<WorkingHours formData={formData} onInputChange={handleInputChange} />} />
        <Route path="theme" element={<ThemeSettings formData={formData} onInputChange={handleInputChange} />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentManager />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;