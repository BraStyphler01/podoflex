-- Update existing user to admin role
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'brastyphler17@gmail.com' AND role = 'viewer';