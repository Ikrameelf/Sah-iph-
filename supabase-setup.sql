-- Série au hasard : sauvegarde privée (un seul compte autorisé)
-- 1) Crée d'abord ton utilisateur dans Supabase > Authentication > Users > Add user.
--    E-mail technique : TON_IDENTIFIANT@serieauhasard.app ; confirme l'utilisateur.
-- 2) Remplace l'adresse ci-dessous par cette même adresse puis exécute tout ce script.
-- 3) Dans Authentication > Settings, désactive "Allow new users to sign up" après création du compte.

create table if not exists public.app_owner (
  singleton boolean primary key default true check (singleton = true),
  owner_id uuid not null references auth.users(id) on delete cascade
);
alter table public.app_owner enable row level security;
revoke all on public.app_owner from anon, authenticated;

create or replace function public.is_serie_au_hasard_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.app_owner
    where singleton = true and owner_id = auth.uid()
  );
$$;
revoke all on function public.is_serie_au_hasard_owner() from public;
grant execute on function public.is_serie_au_hasard_owner() to authenticated;

create table if not exists public.app_backup (
  id integer primary key check (id = 1),
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.app_backup enable row level security;
revoke all on public.app_backup from anon;
grant select, insert, update on public.app_backup to authenticated;
drop policy if exists "owner can read private backup" on public.app_backup;
drop policy if exists "owner can insert private backup" on public.app_backup;
drop policy if exists "owner can update private backup" on public.app_backup;
create policy "owner can read private backup" on public.app_backup for select to authenticated using (public.is_serie_au_hasard_owner());
create policy "owner can insert private backup" on public.app_backup for insert to authenticated with check (public.is_serie_au_hasard_owner());
create policy "owner can update private backup" on public.app_backup for update to authenticated using (public.is_serie_au_hasard_owner()) with check (public.is_serie_au_hasard_owner());

insert into public.app_owner(singleton, owner_id)
select true, id from auth.users
where email = 'TON_IDENTIFIANT@serieauhasard.app'
on conflict (singleton) do nothing;
