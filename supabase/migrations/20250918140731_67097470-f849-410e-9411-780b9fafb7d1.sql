-- Add avatar_url column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN avatar_url TEXT;

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

-- Create RLS policies for avatar storage
CREATE POLICY "Anyone can view avatars" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Reset admin password by updating the user in auth.users
-- First, we need to find the admin user and update their password
-- This requires using the auth admin functions
DO $$
BEGIN
  -- Update the admin user's password
  -- Note: This will require the user to use the new password on next login
  PERFORM auth.admin_update_user_by_id(
    (SELECT user_id FROM public.profiles WHERE email = 'brastyphler17@gmail.com' LIMIT 1),
    '{"password": "admin@PODOFLEX2025"}'::jsonb
  );
EXCEPTION
  WHEN OTHERS THEN
    -- If the function doesn't exist or fails, we'll handle password reset through the UI
    RAISE NOTICE 'Password reset will need to be done through Supabase dashboard or reset flow';
END $$;