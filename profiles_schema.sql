-- KREO Resident Profiles
CREATE TABLE IF NOT EXISTS profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT,
    bio TEXT,
    interest TEXT,
    card_number SERIAL UNIQUE
);

-- Note: SERIAL starts at 1. We want 0-19 for "current" and 20+ for "new".
-- Since SERIAL is automatic, we can just let it be, 
-- but the user has specific range requirements.

-- Let's use a more explicit approach with a function.
ALTER TABLE profiles ALTER COLUMN card_number DROP DEFAULT;

CREATE OR REPLACE FUNCTION assign_kreon_card_number()
RETURNS TRIGGER AS $$
DECLARE
    next_num INTEGER;
BEGIN
    -- Get the maximum existing card number
    SELECT COALESCE(MAX(card_number), -1) INTO next_num FROM profiles;
    
    -- If no users exist, start at 0
    -- If next_num is < 19, just increment
    -- The prompt says "current users 0-19", so if we have < 20 users, we stay in that range.
    -- If we hit 20, we start the "new user" range (20+).
    
    NEW.card_number := next_num + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_assign_card_number
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION assign_kreon_card_number();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);
