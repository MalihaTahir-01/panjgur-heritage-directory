-- Panjgur Heritage Directory — Supabase schema
-- Run this whole file once in your Supabase project's SQL editor:
-- Dashboard -> SQL Editor -> New query -> paste this file -> Run.
-- It's safe to re-run (uses "if not exists" / "or replace" everywhere).

-- ---------------------------------------------------------------------
-- 1. profiles table (one row per signed-up user, tracks admin access)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Automatically create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper used inside RLS policies below. security definer lets it read
-- public.profiles without re-triggering RLS on profiles (which would
-- otherwise recurse).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- ---------------------------------------------------------------------
-- 2. listings table (one row per date-producer / artisan listing)
-- ---------------------------------------------------------------------
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  category text not null check (category in ('dates', 'crafts')),
  name text not null,
  location text not null,
  phone text not null,
  products text not null,
  description text not null,
  availability text not null default '',
  photos text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_category_status_idx on public.listings (category, status);
create index if not exists listings_owner_idx on public.listings (owner_id);

alter table public.listings enable row level security;

-- Anyone can see approved listings; owners and admins can also see their
-- own pending/rejected ones.
drop policy if exists "Read listings" on public.listings;
create policy "Read listings"
  on public.listings for select
  using (status = 'approved' or owner_id = auth.uid() or public.is_admin());

drop policy if exists "Owners can create their own listing" on public.listings;
create policy "Owners can create their own listing"
  on public.listings for insert
  to authenticated
  with check (owner_id = auth.uid());

drop policy if exists "Owners or admins can update a listing" on public.listings;
create policy "Owners or admins can update a listing"
  on public.listings for update
  to authenticated
  using (owner_id = auth.uid() or public.is_admin())
  with check (owner_id = auth.uid() or public.is_admin());

drop policy if exists "Owners or admins can delete a listing" on public.listings;
create policy "Owners or admins can delete a listing"
  on public.listings for delete
  to authenticated
  using (owner_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------
-- 3. storage bucket for listing photos
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public can view listing photos" on storage.objects;
create policy "Public can view listing photos"
  on storage.objects for select
  using (bucket_id = 'listing-photos');

-- Uploaded files must live under a folder named after the uploader's user
-- id, e.g. <user-id>/photo.jpg — the app's upload code already does this.
drop policy if exists "Users can upload their own photos" on storage.objects;
create policy "Users can upload their own photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'listing-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can delete their own photos" on storage.objects;
create policy "Users can delete their own photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'listing-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- ---------------------------------------------------------------------
-- 4. make yourself an admin (run this AFTER you've signed up once
--    through the app's /login page, so a row exists to update)
-- ---------------------------------------------------------------------
-- update public.profiles set is_admin = true where id =
--   (select id from auth.users where email = 'you@example.com');
