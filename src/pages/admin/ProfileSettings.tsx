import { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save, Key } from 'lucide-react';

export default function ProfileSettings() {
  const { user, updateProfile, updatePassword, uploadAvatar } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    avatar: false
  });

  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, profile: true }));

    try {
      const { error } = await updateProfile({
        full_name: formData.full_name,
        email: formData.email
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Profile Update Failed",
          description: error.message
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated successfully."
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An unexpected error occurred."
      });
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "New passwords do not match."
      });
      return;
    }

    if (formData.new_password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password Too Short",
        description: "Password must be at least 6 characters long."
      });
      return;
    }

    setLoading(prev => ({ ...prev, password: true }));

    try {
      const { error } = await updatePassword(formData.new_password);

      if (error) {
        toast({
          variant: "destructive",
          title: "Password Update Failed",
          description: error.message
        });
      } else {
        toast({
          title: "Password Updated",
          description: "Your password has been updated successfully."
        });
        setFormData(prev => ({
          ...prev,
          current_password: '',
          new_password: '',
          confirm_password: ''
        }));
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An unexpected error occurred."
      });
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Avatar must be less than 5MB."
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please select an image file."
      });
      return;
    }

    setLoading(prev => ({ ...prev, avatar: true }));

    try {
      const { error, url } = await uploadAvatar(file);

      if (error) {
        toast({
          variant: "destructive",
          title: "Avatar Upload Failed",
          description: error.message
        });
      } else if (url) {
        setAvatarUrl(url);
        await updateProfile({ avatar_url: url });
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been updated successfully."
        });
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "An unexpected error occurred."
      });
    } finally {
      setLoading(prev => ({ ...prev, avatar: false }));
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Avatar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Upload a profile picture to personalize your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl} alt="Profile picture" />
                <AvatarFallback className="text-lg">
                  {getInitials(formData.full_name || user?.email || 'AD')}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading.avatar}
                  className="gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {loading.avatar ? 'Uploading...' : 'Change Avatar'}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 5MB.
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your basic profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading.profile}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {loading.profile ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Section */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your account password for security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="new_password"
                  type="password"
                  value={formData.new_password}
                  onChange={(e) => handleInputChange('new_password', e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading.password}
                className="gap-2"
              >
                <Key className="h-4 w-4" />
                {loading.password ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}