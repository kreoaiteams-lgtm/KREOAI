-- KREO MANIFEST VAULT ARCHITECTURE
-- Establishes a professional storage and metadata vault for user-orchestrated documents.

-- 1. Manifest Documents Vault
-- Stores the metadata for each uploaded source (PDF, Images, etc.)
CREATE TABLE IF NOT EXISTS public.manifest_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  source_name TEXT NOT NULL,
  source_type TEXT NOT NULL, -- 'pdf', 'image', 'text'
  source_size BIGINT NOT NULL,
  neural_intent TEXT, -- The initial prompt context for this document
  vault_path TEXT NOT NULL, -- Path in Supabase Storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Neural Tool History
-- Tracks the specific orchestration results for tool-based manifests
CREATE TABLE IF NOT EXISTS public.tool_manifest_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  document_id UUID REFERENCES public.manifest_documents(id),
  tool_id TEXT NOT NULL, -- 'study', 'flash', 'pdf'
  result_manifest_id UUID, -- Reference to the generated artifact ID
  status TEXT DEFAULT 'completed',
  manifested_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Security Manifest (RLS)
ALTER TABLE public.manifest_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_manifest_history ENABLE ROW LEVEL SECURITY;

-- 4. Access Protocol Policies
CREATE POLICY "Users can only manifest their own documents"
  ON public.manifest_documents
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only view their own tool history"
  ON public.tool_manifest_history
  FOR ALL
  USING (auth.uid() = user_id);

-- 5. Orchestration Indices
CREATE INDEX IF NOT EXISTS idx_manifest_docs_user ON public.manifest_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_history_user ON public.tool_manifest_history(user_id);
