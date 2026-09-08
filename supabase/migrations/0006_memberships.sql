-- Membership: a member is a client subscribed to a build-your-own bundle
-- of services (the "deliverables"), billed monthly at a discount off the
-- normal per-service rate. Card fields are reference-only (last 4,
-- expiration, name) for the admin's own bookkeeping until real Stripe
-- Billing is wired in — no full card number is ever stored here.
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id),
  status text not null default 'active' check (status in ('active', 'cancelled')),
  discount_percent int not null default 15 check (discount_percent >= 0 and discount_percent <= 100),
  monthly_price_cents int not null default 0,
  stripe_customer_id text,
  stripe_subscription_id text,
  card_brand text,
  card_last4 text,
  card_exp_month int,
  card_exp_year int,
  card_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.member_services (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members (id) on delete cascade,
  service_id uuid not null references public.services (id),
  quantity_per_month int not null default 1 check (quantity_per_month > 0)
);

create index if not exists member_services_member_id_idx on public.member_services (member_id);

alter table public.members enable row level security;
alter table public.member_services enable row level security;

create policy "authenticated can manage members"
  on public.members for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can manage member_services"
  on public.member_services for all
  to authenticated
  using (true)
  with check (true);
