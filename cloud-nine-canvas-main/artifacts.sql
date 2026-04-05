-- Create a table to persist generated artifacts
-- This should be run in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    prompt TEXT NOT NULL,
    code TEXT NOT NULL,
    language TEXT NOT NULL, -- 'react' or 'html'
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own artifacts" 
ON public.artifacts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own artifacts" 
ON public.artifacts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create index for faster user-based lookups
CREATE INDEX IF NOT EXISTS artifacts_user_id_idx ON public.artifacts (user_id);
