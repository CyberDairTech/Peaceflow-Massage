-- Contact form + interim "request to book" submissions.
-- No RLS policies are defined on purpose: the table is only ever read/written
-- by the Next.js server route using the service_role key, so anon/authenticated
-- roles get no access at all by default (RLS is enabled with zero policies).

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'booking_request')),
  name text not null,
  email text not null,
  phone text,
  service_slug text,
  preferred_date date,
  preferred_time text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
