-- Services now belong to a named group (e.g. "Deep Tissue Massage") so the
-- pricing menu can show one row per massage type with a duration dropdown,
-- matching every service actually offered on the live GlossGenius site.
alter table public.services add column if not exists group_name text;
alter table public.services add column if not exists group_sort int not null default 0;

-- Existing rows -> Deep Tissue Massage group; fix the 90-min price to match
-- the live site ($130, not the placeholder $135 it was seeded with).
update public.services set group_name = 'Deep Tissue Massage', group_sort = 0
  where slug in ('deep-tissue-60', 'deep-tissue-90');
update public.services set price_cents = 13000 where slug = 'deep-tissue-90';

-- The old 30-min Deep Tissue placeholder isn't a real offering on the live
-- site — deactivate rather than delete since a booking may already reference it.
update public.services set active = false, group_name = 'Deep Tissue Massage', group_sort = 0
  where slug = 'deep-tissue-30';

insert into public.services (slug, name, group_name, group_sort, duration_minutes, price_cents, description) values
  ('therapeutic-30', 'Therapeutic Massage', 'Therapeutic Massage', 1, 30, 4500,
    'We incorporate a variety of techniques to focus on your aches, pains, and needs while still giving an overall relaxing massage session. At the beginning of your session, we''ll discuss what you want from your massage — whether that''s deeper work on an old injury or full-body relaxation with a focus on specific tension areas.'),
  ('therapeutic-45', 'Therapeutic Massage', 'Therapeutic Massage', 1, 45, 6000,
    'We incorporate a variety of techniques to focus on your aches, pains, and needs while still giving an overall relaxing massage session. At the beginning of your session, we''ll discuss what you want from your massage — whether that''s deeper work on an old injury or full-body relaxation with a focus on specific tension areas.'),
  ('therapeutic-60', 'Therapeutic Massage', 'Therapeutic Massage', 1, 60, 7500,
    'We incorporate a variety of techniques to focus on your aches, pains, and needs while still giving an overall relaxing massage session. At the beginning of your session, we''ll discuss what you want from your massage — whether that''s deeper work on an old injury or full-body relaxation with a focus on specific tension areas.'),
  ('therapeutic-75', 'Therapeutic Massage', 'Therapeutic Massage', 1, 75, 9000,
    'We incorporate a variety of techniques to focus on your aches, pains, and needs while still giving an overall relaxing massage session. At the beginning of your session, we''ll discuss what you want from your massage — whether that''s deeper work on an old injury or full-body relaxation with a focus on specific tension areas.'),
  ('therapeutic-90', 'Therapeutic Massage', 'Therapeutic Massage', 1, 90, 11500,
    'We incorporate a variety of techniques to focus on your aches, pains, and needs while still giving an overall relaxing massage session. At the beginning of your session, we''ll discuss what you want from your massage — whether that''s deeper work on an old injury or full-body relaxation with a focus on specific tension areas.'),
  ('therapeutic-120', 'Therapeutic Massage', 'Therapeutic Massage', 1, 120, 13500,
    'We incorporate a variety of techniques to focus on your aches, pains, and needs while still giving an overall relaxing massage session. At the beginning of your session, we''ll discuss what you want from your massage — whether that''s deeper work on an old injury or full-body relaxation with a focus on specific tension areas.'),
  ('prenatal-60', 'Prenatal Massage', 'Prenatal Massage', 2, 60, 8000,
    'Full-body treatment for expecting moms, adapted to the postural needs and contraindications of pregnancy — bringing relief as pregnancy''s demands on muscles and joints shift.')
on conflict (slug) do nothing;
