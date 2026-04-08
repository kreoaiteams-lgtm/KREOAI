-- RADICAL PERMISSION REMOVAL SCRIPT
-- RUN THIS IN THE SUPABASE SQL EDITOR TO UNLOCK ALL MANIFESTATIONS

-- 1. Disable RLS entirely for artifacts to remove all barriers
ALTER TABLE public.artifacts DISABLE ROW LEVEL SECURITY;

-- 2. Ensure all artifacts are public by default for the future
ALTER TABLE public.artifacts ALTER COLUMN is_public SET DEFAULT true;

-- 3. (Optional) If you want to keep RLS but make it completely open
-- ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;
-- DROP POLICY IF EXISTS "Public Sharing: Anyone can view public artifacts" ON artifacts;
-- CREATE POLICY "Open Manifestation: Anyone can view everything" ON artifacts FOR SELECT USING (true);
-- CREATE POLICY "Open Manifestation: Anyone can insert anything" ON artifacts FOR INSERT WITH CHECK (true);

-- 4. Check if share_token exists and is TEXT (to avoid 400 errors)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='artifacts' AND column_name='share_token') THEN
        ALTER TABLE public.artifacts ALTER COLUMN share_token TYPE TEXT;
    END IF;
END $$;

-- 5. Open up feedback and documents as well if needed
ALTER TABLE public.feedback DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifest_documents DISABLE ROW LEVEL SECURITY;

-- 6. UNLOCK STORAGE BUCKETS (FOR IMAGES/PDFs)
-- This ensures that uploaded files don't "disappear" for guests
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artifacts', 'artifacts', true), ('manifests', 'manifests', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT TO public USING (bucket_id IN ('artifacts', 'manifests'));
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id IN ('artifacts', 'manifests'));
