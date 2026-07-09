-- SQL Migration: Add Incomes and Transfers Tables & Cleanup Constraints for ZOOSH Finance

-- ========================================================
-- 1. Drop foreign key constraints on expenses to prevent sync failures
-- ========================================================
ALTER TABLE public.expenses DROP CONSTRAINT IF EXISTS expenses_vendor_id_fkey;
ALTER TABLE public.expenses DROP CONSTRAINT IF EXISTS expenses_project_id_fkey;
ALTER TABLE public.expenses DROP CONSTRAINT IF EXISTS expenses_created_by_fkey;
ALTER TABLE public.expenses DROP CONSTRAINT IF EXISTS expenses_approved_by_fkey;


-- ========================================================
-- 2. Create Incomes Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.incomes (
    id TEXT PRIMARY KEY,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    customer TEXT NOT NULL,
    bank_account TEXT NOT NULL CHECK (bank_account IN ('HDFC Current Account', 'Hafeez Personal Account')),
    date TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on public.incomes
ALTER TABLE public.incomes ENABLE ROW LEVEL SECURITY;

-- Drop Policies if they exist to allow re-running the script
DROP POLICY IF EXISTS "Allow public read access to incomes" ON public.incomes;
DROP POLICY IF EXISTS "Allow public write access to incomes" ON public.incomes;
DROP POLICY IF EXISTS "Allow public update access to incomes" ON public.incomes;
DROP POLICY IF EXISTS "Allow public delete access to incomes" ON public.incomes;

-- Create Policies for public.incomes
CREATE POLICY "Allow public read access to incomes" ON public.incomes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public write access to incomes" ON public.incomes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update access to incomes" ON public.incomes FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Allow public delete access to incomes" ON public.incomes FOR DELETE TO anon, authenticated USING (true);


-- ========================================================
-- 3. Create Transfers Table
-- ========================================================
CREATE TABLE IF NOT EXISTS public.transfers (
    id TEXT PRIMARY KEY,
    from_account TEXT NOT NULL,
    to_account TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    date TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_different_accounts CHECK (from_account <> to_account)
);

-- Enable RLS on public.transfers
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;

-- Drop Policies if they exist to allow re-running the script
DROP POLICY IF EXISTS "Allow public read access to transfers" ON public.transfers;
DROP POLICY IF EXISTS "Allow public write access to transfers" ON public.transfers;
DROP POLICY IF EXISTS "Allow public update access to transfers" ON public.transfers;
DROP POLICY IF EXISTS "Allow public delete access to transfers" ON public.transfers;

-- Create Policies for public.transfers
CREATE POLICY "Allow public read access to transfers" ON public.transfers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public write access to transfers" ON public.transfers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public update access to transfers" ON public.transfers FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Allow public delete access to transfers" ON public.transfers FOR DELETE TO anon, authenticated USING (true);


-- ========================================================
-- 4. Enable Supabase Realtime safely for all tables
-- ========================================================
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
    EXCEPTION WHEN duplicate_object THEN
        -- Already exists, ignore
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.incomes;
    EXCEPTION WHEN duplicate_object THEN
        -- Already exists, ignore
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.transfers;
    EXCEPTION WHEN duplicate_object THEN
        -- Already exists, ignore
    END;
END $$;


-- ========================================================
-- 5. Create indices for query performance
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_incomes_bank_account ON public.incomes(bank_account);
CREATE INDEX IF NOT EXISTS idx_transfers_from_account ON public.transfers(from_account);
CREATE INDEX IF NOT EXISTS idx_transfers_to_account ON public.transfers(to_account);
