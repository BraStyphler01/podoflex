import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useInitialSetup = () => {
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkForAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

      if (error) throw error;
      
      setNeedsSetup(!data || data.length === 0);
    } catch (error) {
      console.error('Error checking for admin:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInitialAdmin = async (email: string, password: string, fullName: string) => {
    try {
      // Sign up the first admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            full_name: fullName
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Update their profile to be admin role
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            role: 'admin'
          })
          .eq('user_id', authData.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Admin Account Created",
          description: "Initial admin account created successfully. Please check your email to confirm your account."
        });

        setNeedsSetup(false);
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create admin account';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    checkForAdmin();
  }, []);

  return {
    needsSetup,
    loading,
    createInitialAdmin,
    checkForAdmin
  };
};