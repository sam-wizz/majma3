-- مد / bAI marketplace: distributors + deals + commission
-- Run after (or alongside) supabase/schema.sql

-- ---------------------------------------------------------------------------
-- Distributors (الموزعون الحاليون)
-- ---------------------------------------------------------------------------
create table if not exists public.distributors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  phone text,
  area text,
  status text not null default 'active'
    check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create index if not exists distributors_user_id_idx
  on public.distributors (user_id, created_at desc);

alter table public.distributors enable row level security;

drop policy if exists "Users manage own distributors" on public.distributors;
create policy "Users manage own distributors"
  on public.distributors
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Deals / Orders (الصفقات)
-- الموزع يستلم الطلب ويوصله — ومد تأخذ عمولة من كل صفقة
-- ---------------------------------------------------------------------------
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  distributor_id uuid references public.distributors (id) on delete set null,
  customer_name text not null,
  customer_phone text,
  pickup_address text,
  delivery_address text not null,
  amount numeric(14, 2) not null check (amount >= 0),
  commission_rate numeric(6, 4) not null default 0.05
    check (commission_rate >= 0 and commission_rate <= 1),
  commission_amount numeric(14, 2) not null default 0 check (commission_amount >= 0),
  status text not null default 'assigned'
    check (status in ('pending', 'assigned', 'in_transit', 'delivered', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  delivered_at timestamptz
);

create index if not exists deals_user_id_created_at_idx
  on public.deals (user_id, created_at desc);

create index if not exists deals_distributor_id_idx
  on public.deals (distributor_id);

alter table public.deals enable row level security;

drop policy if exists "Users manage own deals" on public.deals;
create policy "Users manage own deals"
  on public.deals
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
