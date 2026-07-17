-- مد / bAI schema + RLS
-- Run this in the Supabase SQL editor before using the app.
-- Also run:
--   supabase/marketplace.sql  (distributors, deals, commissions)
--   supabase/admin.sql        (profiles + admin RLS for /admin)

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  file_path text not null,
  file_name text not null,
  invoice_date date,
  total_amount numeric(14, 2),
  supplier_name text,
  items jsonb not null default '[]'::jsonb,
  status text not null default 'processing'
    check (status in ('processing', 'completed', 'failed')),
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoices_user_id_created_at_idx
  on public.invoices (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security: users only access their own invoices
-- ---------------------------------------------------------------------------
alter table public.invoices enable row level security;

drop policy if exists "Users can select own invoices" on public.invoices;
create policy "Users can select own invoices"
  on public.invoices
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own invoices" on public.invoices;
create policy "Users can insert own invoices"
  on public.invoices
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own invoices" on public.invoices;
create policy "Users can update own invoices"
  on public.invoices
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own invoices" on public.invoices;
create policy "Users can delete own invoices"
  on public.invoices
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('invoices', 'invoices', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload own invoice files" on storage.objects;
create policy "Users can upload own invoice files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'invoices'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can read own invoice files" on storage.objects;
create policy "Users can read own invoice files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'invoices'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can update own invoice files" on storage.objects;
create policy "Users can update own invoice files"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'invoices'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'invoices'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete own invoice files" on storage.objects;
create policy "Users can delete own invoice files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'invoices'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
