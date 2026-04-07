
-- HIGH-FIDELITY SOCIAL MANIFESTATION SCHEMA
-- Persistent queue for 'Always-On' LinkedIn Orchestration

CREATE TABLE IF NOT EXISTS social_manifest_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT NOT NULL,
    content TEXT NOT NULL,
    post_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT DEFAULT 'scheduled', -- 'scheduled', 'posted', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_manifest_auth (
    user_id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000000', -- For private layer
    linkedin_token TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for high-fidelity security (Private orchestration only)
ALTER TABLE social_manifest_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_manifest_auth ENABLE ROW LEVEL SECURITY;

-- Simple policy for the private manifest layer (assuming user owns these for now)
CREATE POLICY "Private Orchestration Only" ON social_manifest_queue FOR ALL USING (true);
CREATE POLICY "Private Auth Only" ON social_manifest_auth FOR ALL USING (true);
