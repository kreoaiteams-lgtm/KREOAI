-- Allow anonymous users to insert artifacts so they can share visions immediately
CREATE POLICY "Guest Sharing: Anyone can create public artifacts" 
ON artifacts FOR INSERT 
TO public 
WITH CHECK (is_public = true);
