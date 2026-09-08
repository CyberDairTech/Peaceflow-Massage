-- Services need a client-facing description for the public pricing menu,
-- which the admin Services screen will also let Maranda edit.
alter table public.services add column if not exists description text;

update public.services set description =
  'A focused session on the areas holding the most tension — perfect between workouts or on a tight schedule.'
  where slug = 'deep-tissue-30' and description is null;

update public.services set description =
  'Our signature full-body deep tissue session, tailored to recovery for gym-goers and everyday tension alike.'
  where slug = 'deep-tissue-60' and description is null;

update public.services set description =
  'Extended time for a full-body reset — ideal after a heavy training block or when it''s been a while.'
  where slug = 'deep-tissue-90' and description is null;
