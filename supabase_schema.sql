-- ========================================================
-- ZOOSH FINANCE - SUPABASE DATABASE SCHEMA
-- Run this script in the Supabase SQL Editor
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create USERS table
create table public.users (
    id text primary key,
    name text not null,
    role text not null check (role in ('owner', 'manager', 'staff')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create VENDORS table
create table public.vendors (
    id text primary key,
    name text not null,
    phone text,
    gst text,
    address text,
    opening_balance numeric default 0 not null,
    outstanding_amount numeric default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create PROJECTS table
create table public.projects (
    id text primary key,
    name text not null,
    client text,
    budget numeric default 0 not null,
    spent numeric default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create EXPENSES table
create table public.expenses (
    id text primary key,
    amount numeric not null,
    vendor_id text references public.vendors(id) on delete set null,
    category text not null,
    project_id text references public.projects(id) on delete set null,
    description text,
    tax numeric default 0 not null,
    payment_method text not null,
    status text not null check (status in ('Pending', 'Approved', 'Rejected', 'Paid', 'Cancelled')),
    created_by text references public.users(id) on delete set null,
    approved_by text references public.users(id) on delete set null,
    transaction_no text,
    gst text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create TRANSACTIONS (Income/Capital deposits) table
create table public.transactions (
    id text primary key,
    type text not null check (type in ('Income', 'Expense')),
    amount numeric not null,
    method text not null check (method in ('Cash', 'Bank')),
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ========================================================
-- ENABLE ROW LEVEL SECURITY (RLS) FOR PRODUCTION
-- ========================================================
alter table public.users enable row level security;
alter table public.vendors enable row level security;
alter table public.projects enable row level security;
alter table public.expenses enable row level security;
alter table public.transactions enable row level security;

-- Create policies to allow public reads/writes for front-end prototyping
-- You can lock these down using Auth UUIDs in production
create policy "Allow all operations for users" on public.users for all using (true) with check (true);
create policy "Allow all operations for vendors" on public.vendors for all using (true) with check (true);
create policy "Allow all operations for projects" on public.projects for all using (true) with check (true);
create policy "Allow all operations for expenses" on public.expenses for all using (true) with check (true);
create policy "Allow all operations for transactions" on public.transactions for all using (true) with check (true);

-- ========================================================
-- SEED INITIAL MASTER DATA
-- ========================================================

-- Seed Users
insert into public.users (id, name, role) values
('usr-owner', 'Ziyad (Owner)', 'owner'),
('usr-mgr', 'Madhavan (Manager)', 'manager'),
('usr-staff', 'Rahim (Staff)', 'staff')
on conflict (id) do nothing;

-- Seed Projects
insert into public.projects (id, name, client, budget, spent) values
('prj-none', 'No Project (General Office)', 'ZOOSH Office', 0, 0),
('prj-1', 'Villa Project - Palakkad', 'Siddharth Menon', 1500000, 0),
('prj-2', 'Penthouse Interior - Kochi', 'Ananya Roy', 850000, 0),
('prj-3', 'Office Cabinets - Pattambi', 'ZOOSH Showroom', 300000, 0),
('prj-4', 'Resort Dining Table Set', 'Green Valley Resort', 450000, 0)
on conflict (id) do nothing;

-- Seed Vendors
insert into public.vendors (id, name, phone, gst, address, opening_balance, outstanding_amount) values
('vnd-1', 'Malabar Wood & Plywoods', '9847012345', '32AABCM1234F1Z9', 'Main Road, Kallai, Kozhikode', 0, 0),
('vnd-2', 'Steel Craft Hardwares', '9847056789', '32AAPCH9876C1ZA', 'Link Road, Kozhikode', 0, 0),
('vnd-3', 'Royal Fabrics & Foam', '9447123456', '32AAECR4567R1ZB', 'Stadium Junction, Palakkad', 0, 0),
('vnd-4', 'Speed Logistics & Transport', '9846098765', '32AATCT0987D1ZC', 'NH Bypass, Palakkad', 0, 0),
('vnd-5', 'Power Tools & Spares', '9446012345', '32AAPCP4321P1ZD', 'Town Bus Stand, Pattambi', 0, 0),
('vnd-6', 'Office Depot & Stationers', '9947112233', '32AABCO5555S1ZE', 'Palakkad Road, Pattambi', 0, 0)
on conflict (id) do nothing;
