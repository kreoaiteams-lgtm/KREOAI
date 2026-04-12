-- Ensure artifacts table allows public viewing and guest creation (Manifestation Sovereignty)
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public manifests" 
ON artifacts FOR SELECT 
USING (is_public = true);

CREATE POLICY "Guests can create manifests" 
ON artifacts FOR INSERT 
WITH CHECK (true); -- Allows both authenticated and anonymous inserts
