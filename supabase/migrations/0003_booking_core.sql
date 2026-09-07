-- Core booking domain: services, clients, discount codes, bookings,
-- contracts, and blocked-out calendar slots. Builds on 0001 (inquiries)
-- and 0002 (admin read policies).
--
-- Access model:
--   - anon (public site) can only read active services and the times of
--     blocked slots (via a view that hides the private `reason` column).
--     Everything else is written through server routes using the
--     service_role key (Stripe webhook, admin actions), or read/written
--     by the authenticated admin (Maranda's Supabase Auth account).
--   - authenticated (admin) gets full read/write on every table below.
--   - No table here is writable by anon.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  duration_minutes int not null check (duration_minutes > 0),
  price_cents int not null check (price_cents >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "anyone can read active services"
  on public.services for select
  to anon, authenticated
  using (active or auth.role() = 'authenticated');

create policy "authenticated can manage services"
  on public.services for all
  to authenticated
  using (true)
  with check (true);

insert into public.services (slug, name, duration_minutes, price_cents) values
  ('deep-tissue-30', 'Deep Tissue — 30 Minutes', 30, 5500),
  ('deep-tissue-60', 'Deep Tissue — 60 Minutes', 60, 9500),
  ('deep-tissue-90', 'Deep Tissue — 90 Minutes', 90, 13500)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- clients
-- ---------------------------------------------------------------------
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now()
);

create unique index if not exists clients_email_lower_idx on public.clients (lower(email));

alter table public.clients enable row level security;

create policy "authenticated can manage clients"
  on public.clients for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- discount_codes
-- ---------------------------------------------------------------------
create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  amount int not null check (amount > 0),
  active boolean not null default true,
  max_redemptions int,
  times_redeemed int not null default 0,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists discount_codes_code_lower_idx on public.discount_codes (lower(code));

alter table public.discount_codes enable row level security;

create policy "authenticated can manage discount codes"
  on public.discount_codes for all
  to authenticated
  using (true)
  with check (true);

-- Seed the gym partner discount from the project scope doc.
insert into public.discount_codes (code, description, discount_type, amount) values
  ('LIFTEDGYM', 'Lifted Gym member discount', 'fixed', 1500)
on conflict (code) do nothing;

-- ---------------------------------------------------------------------
-- bookings
-- ---------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id),
  service_id uuid not null references public.services (id),
  discount_code_id uuid references public.discount_codes (id),
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'confirmed', 'cancelled', 'completed', 'no_show', 'refunded')),
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  amount_paid_cents int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_start_time_idx on public.bookings (start_time);
create index if not exists bookings_client_id_idx on public.bookings (client_id);

alter table public.bookings enable row level security;

create policy "authenticated can manage bookings"
  on public.bookings for all
  to authenticated
  using (true)
  with check (true);

-- No-show tracking: a client is blocked once they've accumulated 2+
-- no-shows, per the cancellation/no-show policy in the scope doc.
create or replace view public.client_no_show_counts as
  select client_id, count(*) as no_show_count
  from public.bookings
  where status = 'no_show'
  group by client_id;

-- ---------------------------------------------------------------------
-- contracts
-- ---------------------------------------------------------------------
create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings (id),
  signer_name text,
  signer_email text,
  initials text,
  signed_at timestamptz,
  ip_address text,
  pdf_url text,
  uploaded_manually boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contracts enable row level security;

create policy "authenticated can manage contracts"
  on public.contracts for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- blocked_slots — Maranda blocking out dates/times in the admin calendar
-- ---------------------------------------------------------------------
create table if not exists public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  reason text,
  created_at timestamptz not null default now()
);

alter table public.blocked_slots enable row level security;

create policy "authenticated can manage blocked slots"
  on public.blocked_slots for all
  to authenticated
  using (true)
  with check (true);

-- Public booking calendar needs the blocked *times* to grey out slots,
-- but not the private `reason` text.
create or replace view public.public_blocked_slots as
  select id, start_time, end_time from public.blocked_slots;

grant select on public.public_blocked_slots to anon, authenticated;
grant select on public.client_no_show_counts to authenticated;
