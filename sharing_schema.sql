
-- KREO High-Fidelity Sharing Architecture
-- Transitioning from Private History to Collaborative Manifestation

-- 1. Enhance Artifacts with Sharing Metadata
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS share_token UUID DEFAULT gen_random_uuid();
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS artifact_type TEXT DEFAULT 'manifest'; -- ppt, excel, doc, etc.

-- 2. Access Request Orchestration (Google Docs Style)
CREATE TABLE IF NOT EXISTS artifact_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE,
    requester_email TEXT NOT NULL,
    request_type TEXT DEFAULT 'edit', -- 'view', 'edit'
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'declined'
    message TEXT
);

-- 3. High-Fidelity Sharing RLS Policies
-- Allow anyone to view an artifact if it is marked as public
CREATE POLICY "Public Sharing: Anyone can view public artifacts" 
ON artifacts FOR SELECT 
TO public 
USING (is_public = true);

-- Allow anyone to submit access requests
ALTER TABLE artifact_access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request access" 
ON artifact_access_requests FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow owners to manage access requests for their artifacts
CREATE POLICY "Owners can manage access requests" 
ON artifact_access_requests FOR ALL 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM artifacts 
        WHERE artifacts.id = artifact_access_requests.artifact_id 
        AND artifacts.user_id = auth.uid()
    )
);
