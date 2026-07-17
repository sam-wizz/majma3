-- مد admin: profiles + صلاحيات المدير على كل البيانات
-- نفّذ بعد marketplace.sql

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user'
    check (role in ('admin', 'user')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- مساعد: هل المستخدم الحالي مدير؟ (security definer لتجنب recursion في RLS)
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Admins can read all profiles" on public.profiles;
drop policy if exists "Profiles are readable by owner or admin" on public.profiles;
create policy "Profiles are readable by owner or admin"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id and role = 'user');

drop policy if exists "Users can update own profile name" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- إنشاء ملف شخصي تلقائياً عند التسجيل
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'user'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- منع ترقية الدور من جلسة مستخدم عادي.
-- يُسمح بالتغيير عبر SQL Editor / service role (حيث auth.uid() يكون null).
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role then
    if auth.uid() is null then
      return new;
    end if;
    if not public.is_admin() then
      raise exception 'Changing role is not allowed';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_prevent_role_escalation on public.profiles;
create trigger profiles_prevent_role_escalation
  before update on public.profiles
  for each row execute procedure public.prevent_role_escalation();

-- ---------------------------------------------------------------------------
-- توسيع RLS: المديرون يقرأون/يحدّثون كل الصفقات والموزّعين
-- ---------------------------------------------------------------------------
drop policy if exists "Admins can select all distributors" on public.distributors;
create policy "Admins can select all distributors"
  on public.distributors
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update all distributors" on public.distributors;
create policy "Admins can update all distributors"
  on public.distributors
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can select all deals" on public.deals;
create policy "Admins can select all deals"
  on public.deals
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update all deals" on public.deals;
create policy "Admins can update all deals"
  on public.deals
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- ترقية أول مدير (عدّل البريد ثم شغّل السطر)
-- ---------------------------------------------------------------------------
-- update public.profiles set role = 'admin' where email = 'admin@example.com';
