-- KREO Neural Persistence Schema
-- Target: Artifacts, Feedback, and Manifest Documents

-- 1. Artifacts Table (Project History)
CREATE TABLE IF NOT EXISTS artifacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    prompt TEXT NOT NULL,
    code TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Feedback Table (User Sentiment)
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    rating INTEGER NOT NULL,
    suggestion TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 3. Manifest Documents (OCR/Source Metadata)
CREATE TABLE IF NOT EXISTS manifest_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source_name TEXT NOT NULL,
    source_type TEXT NOT NULL,
    source_size BIGINT,
    neural_intent TEXT,
    vault_path TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS (Row Level Security)
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE manifest_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Authenticated users can only see their own data
CREATE POLICY "Users can only see their own artifacts" 
ON artifacts FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can only see their own uploads" 
ON manifest_documents FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Feedback is public for submission, but private for owners
CREATE POLICY "Anyone can submit feedback" 
ON feedback FOR INSERT 
TO public 
WITH CHECK (true);
