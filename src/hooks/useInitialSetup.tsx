import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useInitialSetup = () => {
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { signIn } = useAuth();

  const checkForAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('role', 'admin')
        .limit(1);

      if (error) throw error;
      
      setNeedsSetup(!data || data.length === 0);
    } catch (error) {
      console.error('Error checking for admin:', error);
      // If there's an error checking, assume setup is not needed to avoid blocking access
      setNeedsSetup(false);
    } finally {
      setLoading(false);
    }
  };

  const createInitialAdmin = async (email: string, password: string, fullName: string) => {
    try {
      // Sign up the first admin user (without email redirect since we'll sign in immediately)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
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

        // If email confirmation is disabled, the user is already signed in
        // If email confirmation is enabled but we got a user back, try to sign in
        if (!authData.session) {
          // Attempt to sign in immediately (works when email confirmation is disabled)
          const { error: signInError } = await signIn(email, password);
          
          if (signInError) {
            // Email confirmation is likely required
            toast({
              title: "Admin Account Created",
              description: "Account created successfully. Please check your email to confirm your account, then return to sign in."
            });
          } else {
            toast({
              title: "Welcome!",
              description: "Admin account created and you're now signed in. Welcome to your admin panel!"
            });
          }
        } else {
          toast({
            title: "Welcome!",
            description: "Admin account created and you're now signed in. Welcome to your admin panel!"
          });
        }

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