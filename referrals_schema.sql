-- ============================================================
-- KREO REFERRALS — DATABASE SCHEMA MIGRATION
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New Query
-- Safe to run multiple times (all operations are idempotent)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    referred_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'joined' NOT NULL, -- joined, active
    reward_claimed BOOLEAN DEFAULT false NOT NULL
);

-- Index for fast referral lookups
CREATE INDEX IF NOT EXISTS referrals_referrer_idx ON public.referrals (referrer_id);
CREATE INDEX IF NOT EXISTS referrals_referred_idx ON public.referrals (referred_id);

-- Disable Row Level Security to ensure seamless client integrations
ALTER TABLE public.referrals DISABLE ROW LEVEL SECURITY;
