
-- KREO High-Fidelity Sharing Architecture
-- Idempotent migration — safe to re-run at any time

-- 1. Enhance Artifacts with Sharing Metadata
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS share_token UUID DEFAULT gen_random_uuid();
ALTER TABLE artifacts ADD COLUMN IF NOT EXISTS artifact_type TEXT DEFAULT 'manifest';

-- Backfill: ensure every existing row has a share_token
UPDATE artifacts SET share_token = gen_random_uuid() WHERE share_token IS NULL;

-- 2. Access Request Orchestration (Google Docs Style)
CREATE TABLE IF NOT EXISTS artifact_access_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE,
    requester_email TEXT NOT NULL,
    request_type TEXT DEFAULT 'edit',
    status TEXT DEFAULT 'pending',
    message TEXT
);

-- 3. RLS Policies — drop first to avoid "already exists" errors
DROP POLICY IF EXISTS "Public Sharing: Anyone can view public artifacts" ON artifacts;
CREATE POLICY "Public Sharing: Anyone can view public artifacts" 
ON artifacts FOR SELECT 
TO public 
USING (is_public = true);

-- Access request policies
ALTER TABLE artifact_access_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can request access" ON artifact_access_requests;
CREATE POLICY "Anyone can request access" 
ON artifact_access_requests FOR INSERT 
TO public 
WITH CHECK (true);

DROP POLICY IF EXISTS "Owners can manage access requests" ON artifact_access_requests;
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
