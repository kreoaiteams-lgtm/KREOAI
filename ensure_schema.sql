-- ROBUST SCHEMA SYNC FOR KREO ARTIFACTS
-- Run this in Supabase SQL Editor if you see "400 Bad Request" errors

-- 1. Ensure columns exist with correct types
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS share_token TEXT;
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS prompt TEXT;
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS code TEXT;

-- 2. Populate share_token for existing entries that might be missing it
UPDATE public.artifacts SET share_token = id::text WHERE share_token IS NULL;

-- 3. Open permissions completely (Disable RLS)
ALTER TABLE public.artifacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifest_documents DISABLE ROW LEVEL SECURITY;

-- 4. Storage buckets sync
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artifacts', 'artifacts', true), ('manifests', 'manifests', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT TO public USING (bucket_id IN ('artifacts', 'manifests'));
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id IN ('artifacts', 'manifests'));
