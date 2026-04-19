-- ============================================================
-- KREO PLATFORM — DEFINITIVE SCHEMA MIGRATION
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New Query
-- Safe to run multiple times (all operations are idempotent)
-- ============================================================

-- STEP 1: Ensure the artifacts table exists at all
CREATE TABLE IF NOT EXISTS public.artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  prompt TEXT,
  code TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- STEP 2: Add missing columns (safe — IF NOT EXISTS prevents duplicates)
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS share_token TEXT;
ALTER TABLE public.artifacts ADD COLUMN IF NOT EXISTS is_public  BOOLEAN DEFAULT true;

-- STEP 3: Backfill share_token for any rows that are missing it
UPDATE public.artifacts
SET share_token = id::text
WHERE share_token IS NULL;

-- STEP 4: Add index for fast share_token lookups (share links)
CREATE INDEX IF NOT EXISTS artifacts_share_token_idx
  ON public.artifacts (share_token);

CREATE INDEX IF NOT EXISTS artifacts_user_id_idx
  ON public.artifacts (user_id);

-- STEP 5: Disable RLS entirely (simplest approach — no permission headaches)
ALTER TABLE public.artifacts DISABLE ROW LEVEL SECURITY;

-- STEP 6: Ensure feedback + manifest_documents tables don't block anything
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'feedback') THEN
    ALTER TABLE public.feedback DISABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'manifest_documents') THEN
    ALTER TABLE public.manifest_documents DISABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- STEP 7: Storage buckets — create if missing, ensure public access
INSERT INTO storage.buckets (id, name, public)
VALUES
  ('artifacts', 'artifacts', true),
  ('manifests', 'manifests', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- STEP 8: Storage policies (drop + recreate to avoid duplicates)
DROP POLICY IF EXISTS "KREO Public Read"   ON storage.objects;
DROP POLICY IF EXISTS "KREO Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Access"      ON storage.objects;
DROP POLICY IF EXISTS "Public Upload"      ON storage.objects;

CREATE POLICY "KREO Public Read"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id IN ('artifacts', 'manifests'));

CREATE POLICY "KREO Public Upload"
  ON storage.objects FOR INSERT TO public
  WITH CHECK (bucket_id IN ('artifacts', 'manifests'));

-- ============================================================
-- VERIFY: Run this to confirm the schema is correct
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'artifacts' ORDER BY ordinal_position;
-- ============================================================
