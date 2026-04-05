-- KREO Feedback Table Migration
-- Run this in your Supabase SQL editor

create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  rating integer not null check (rating between 1 and 5),
  suggestion text,
  user_id uuid references auth.users(id) on delete set null
);

-- Enable Row Level Security
alter table public.feedback enable row level security;

-- Anyone (including non-authenticated users) can submit feedback
create policy "Anyone can submit feedback"
  on public.feedback
  for insert
  with check (true);

-- Only authenticated users can read feedback
create policy "Authenticated users can view feedback"
  on public.feedback
  for select
  using (auth.role() = 'authenticated');
