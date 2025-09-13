-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Authenticated users can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Admins can insert profiles" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Admins can update profiles" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Admins can delete profiles" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role = 'admin'
));

-- Create landing page content table
CREATE TABLE public.landing_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  content JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on landing_content
ALTER TABLE public.landing_content ENABLE ROW LEVEL SECURITY;

-- Create policies for landing_content
CREATE POLICY "Everyone can view landing content" 
ON public.landing_content 
FOR SELECT 
USING (true);

CREATE POLICY "Admins and editors can manage landing content" 
ON public.landing_content 
FOR ALL 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND role IN ('admin', 'editor')
));

-- Function to create profile on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'viewer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_landing_content_updated_at
  BEFORE UPDATE ON public.landing_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default landing page content
INSERT INTO public.landing_content (section_key, title, content) VALUES
('hero', 'Hero Section', '{"title": "Transform Your Business", "subtitle": "Professional solutions for modern challenges", "cta": "Get Started"}'),
('about', 'About Section', '{"title": "About Us", "description": "We provide innovative solutions to help businesses thrive in the digital age."}'),
('services', 'Services Section', '{"title": "Our Services", "services": [{"name": "Consulting", "description": "Expert business consulting"}, {"name": "Development", "description": "Custom software development"}, {"name": "Support", "description": "24/7 technical support"}]}'),
('contact', 'Contact Section', '{"title": "Contact Us", "email": "contact@company.com", "phone": "+1 (555) 123-4567", "address": "123 Business St, City, State 12345"}')