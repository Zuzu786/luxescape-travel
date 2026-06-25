-- Luxescape Travel — initial schema
-- Run this in your Supabase project's SQL editor.

do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

-- PROFILES ----------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update to authenticated using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- USER_ROLES --------------------------------------------------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

drop policy if exists "roles self read" on public.user_roles;
create policy "roles self read" on public.user_roles for select to authenticated using (auth.uid() = user_id);
drop policy if exists "admins read all roles" on public.user_roles;
create policy "admins read all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- TOURS -------------------------------------------------------
create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price_zar numeric(10,2),
  duration text,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.tours to anon, authenticated;
grant insert, update, delete on public.tours to authenticated;
grant all on public.tours to service_role;
alter table public.tours enable row level security;
drop policy if exists "tours public read" on public.tours;
create policy "tours public read" on public.tours for select to anon, authenticated using (active = true or public.has_role(auth.uid(),'admin'));
drop policy if exists "tours admin write" on public.tours;
create policy "tours admin write" on public.tours for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- SERVICES ----------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  icon text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;
grant all on public.services to service_role;
alter table public.services enable row level security;
drop policy if exists "services public read" on public.services;
create policy "services public read" on public.services for select to anon, authenticated using (true);
drop policy if exists "services admin write" on public.services;
create policy "services admin write" on public.services for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- BOOKINGS ----------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references public.tours(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  travel_date date,
  guests int default 1,
  message text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
grant insert on public.bookings to anon, authenticated;
grant select, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;
drop policy if exists "bookings public insert" on public.bookings;
create policy "bookings public insert" on public.bookings for insert to anon, authenticated with check (true);
drop policy if exists "bookings admin read" on public.bookings;
create policy "bookings admin read" on public.bookings for select to authenticated using (public.has_role(auth.uid(),'admin'));
drop policy if exists "bookings admin update" on public.bookings;
create policy "bookings admin update" on public.bookings for update to authenticated using (public.has_role(auth.uid(),'admin'));
drop policy if exists "bookings admin delete" on public.bookings;
create policy "bookings admin delete" on public.bookings for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- CONTACT MESSAGES --------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
drop policy if exists "contact public insert" on public.contact_messages;
create policy "contact public insert" on public.contact_messages for insert to anon, authenticated with check (true);
drop policy if exists "contact admin read" on public.contact_messages;
create policy "contact admin read" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(),'admin'));

-- GALLERY -----------------------------------------------------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  category text,
  created_at timestamptz not null default now()
);
grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;
grant all on public.gallery_items to service_role;
alter table public.gallery_items enable row level security;
drop policy if exists "gallery public read" on public.gallery_items;
create policy "gallery public read" on public.gallery_items for select to anon, authenticated using (true);
drop policy if exists "gallery admin write" on public.gallery_items;
create policy "gallery admin write" on public.gallery_items for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- REALTIME ----------------------------------------------------
do $$ begin
  alter publication supabase_realtime add table public.bookings;
exception when others then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.contact_messages;
exception when others then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.tours;
exception when others then null; end $$;

-- SEED --------------------------------------------------------
insert into public.tours (slug, name, description, duration, price_zar) values
  ('table-mountain','Table Mountain','Cable car ascent to one of the New 7 Wonders of Nature with panoramic Cape Town views.','Half day', 1450),
  ('safari','Safari Experience','Private Big Five safari with luxury lodge stay and expert ranger.','2-3 days', 18500),
  ('kirstenbosch','Kirstenbosch Botanical Gardens','Walk Africa''s most beautiful garden beneath Table Mountain.','Half day', 950),
  ('hermanus','Hermanus','Coastal escape known as the world''s best land-based whale watching.','Full day', 2200),
  ('garden-route','Garden Route','Multi-day journey along forests, lagoons and dramatic coastline.','3-5 days', 14500),
  ('cape-winelands','Cape Winelands','Curated cellar tastings across Stellenbosch, Franschhoek and Constantia.','Full day', 2750),
  ('cape-peninsula','Cape Peninsula','Chapman''s Peak, Cape Point and Boulders penguin colony in one elegant loop.','Full day', 2450)
on conflict (slug) do nothing;

insert into public.services (slug, name, description, icon) values
  ('vip','VIP Services','Personalised assistance, premium private transfers and tailored arrangements.','Crown'),
  ('chauffeur','Chauffeur Services','Reliable, comfortable, professional private transport.','Car'),
  ('group-shuttles','Group Shuttles','Conference and congress shuttle services for groups and individuals.','Bus'),
  ('corporate','Corporate Travel','Tailored corporate travel solutions.','Briefcase'),
  ('event-management','Event Management','Concert, comedy festival and musical production coordination.','CalendarHeart'),
  ('accommodation','Luxury Accommodation','Carefully selected luxury stays.','BedDouble'),
  ('concierge','Concierge Connect','Personalised reservations and specialised travel support.','Sparkles'),
  ('travel-tourism','Travel & Tourism','Tailored itineraries and guided experiences in Cape Town.','Map'),
  ('bulletproof','Bulletproof Vehicles','Secure, discreet, fully armoured vehicles.','ShieldCheck'),
  ('cpos','CPOs - Fully Armed & Trained','Expertly trained Close Protection Officers.','Shield')
on conflict (slug) do nothing;
