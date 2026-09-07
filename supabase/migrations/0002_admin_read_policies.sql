-- Lets the signed-in admin (Maranda's Supabase Auth account) read and
-- update inquiries from the /admin dashboard. Anon/public still has zero
-- access — only an authenticated session or the service_role key can touch
-- this table.

create policy "authenticated can read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

create policy "authenticated can update inquiries"
  on public.inquiries for update
  to authenticated
  using (true);
