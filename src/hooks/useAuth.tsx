import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  updateProfile: (updates: { full_name?: string; email?: string; avatar_url?: string }) => Promise<{ error: any }>;
  uploadAvatar: (file: File) => Promise<{ error: any; url?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  };

  const updateProfile = async (updates: { full_name?: string; email?: string; avatar_url?: string }) => {
    if (!user) return { error: new Error('No authenticated user') };

    // Update Supabase auth user metadata
    const authUpdates: any = {};
    if (updates.full_name) authUpdates.full_name = updates.full_name;
    if (updates.avatar_url) authUpdates.avatar_url = updates.avatar_url;
    if (updates.email) authUpdates.email = updates.email;

    if (Object.keys(authUpdates).length > 0) {
      const { error: authError } = await supabase.auth.updateUser({
        data: authUpdates,
        ...(updates.email && { email: updates.email })
      });
      if (authError) return { error: authError };
    }

    // Update profiles table
    const profileUpdates: any = {};
    if (updates.full_name) profileUpdates.full_name = updates.full_name;
    if (updates.email) profileUpdates.email = updates.email;
    if (updates.avatar_url) profileUpdates.avatar_url = updates.avatar_url;

    if (Object.keys(profileUpdates).length > 0) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('user_id', user.id);
      
      if (profileError) return { error: profileError };
    }

    return { error: null };
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { error: new Error('No authenticated user'), url: undefined };

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error, data } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true
      });

    if (error) return { error, url: undefined };

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return { error: null, url: publicUrl };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    uploadAvatar,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};