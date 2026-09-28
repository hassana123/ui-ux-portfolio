-- Run once in the Supabase SQL editor. No owner is created automatically.
create table public.owners(user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.owners enable row level security;
create policy owner_self on public.owners for select to authenticated using(user_id=auth.uid());
create function public.is_owner() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from owners where user_id=auth.uid()) $$;
create table public.settings_revisions(id uuid primary key default gen_random_uuid(),state text not null unique check(state in ('draft','published')),data jsonb not null,updated_at timestamptz not null default now());
alter table public.settings_revisions enable row level security;
create policy settings_read on public.settings_revisions for select using(state='published' or public.is_owner());
create policy settings_write on public.settings_revisions for all to authenticated using(public.is_owner()) with check(public.is_owner());
create function public.discipline_visible(d text) returns boolean language sql stable security definer set search_path=public as $$ select d='general' or coalesce((select data->'disciplines' ? d from settings_revisions where state='published'),d in ('product','motion','illustration')) $$;
create table public.projects(id uuid primary key default gen_random_uuid(),seed boolean not null default false,created_at timestamptz not null default now());
create table public.playground_items(like public.projects including all);
create table public.articles(like public.projects including all);
create table public.projects_revisions(id uuid primary key default gen_random_uuid(),resource_id uuid not null references public.projects(id) on delete cascade,state text not null check(state in ('draft','published')),data jsonb not null,updated_at timestamptz not null default now(),unique(resource_id,state));
create table public.playground_items_revisions(id uuid primary key default gen_random_uuid(),resource_id uuid not null references public.playground_items(id) on delete cascade,state text not null check(state in ('draft','published')),data jsonb not null,updated_at timestamptz not null default now(),unique(resource_id,state));
create table public.articles_revisions(id uuid primary key default gen_random_uuid(),resource_id uuid not null references public.articles(id) on delete cascade,state text not null check(state in ('draft','published')),data jsonb not null,updated_at timestamptz not null default now(),unique(resource_id,state));
do $$ declare t text; begin foreach t in array array['projects','playground_items','articles'] loop
execute format('alter table public.%I enable row level security',t);
execute format('create policy owner_manage on public.%I for all to authenticated using(public.is_owner()) with check(public.is_owner())',t);
execute format('alter table public.%I enable row level security',t||'_revisions');
execute format('create policy published_read on public.%I for select using((state=''published'' and public.discipline_visible(data->>''discipline'')) or public.is_owner())',t||'_revisions');
execute format('create policy owner_write on public.%I for all to authenticated using(public.is_owner()) with check(public.is_owner())',t||'_revisions');
execute format('create unique index on public.%I ((data->>''slug''),state)',t||'_revisions');
end loop; end $$;
create table public.section_instances(id text primary key,data jsonb not null,position integer not null default 0);
create table public.disciplines(id text primary key check(id in ('product','motion','illustration')),data jsonb not null);
create table public.case_study_blocks(id uuid primary key default gen_random_uuid(),project_id uuid references public.projects(id) on delete cascade,position integer not null,data jsonb not null);
create table public.about_collections(id uuid primary key default gen_random_uuid(),kind text not null,data jsonb not null);
create table public.media(id uuid primary key default gen_random_uuid(),path text unique not null,mime text not null,alt text not null default '',caption text not null default '',seed boolean not null default false,created_at timestamptz not null default now());
create table public.cvs(id uuid primary key default gen_random_uuid(),label text not null,path text not null,discipline text not null default 'general');
do $$ declare t text; begin foreach t in array array['section_instances','disciplines','case_study_blocks','about_collections','media','cvs'] loop execute format('alter table public.%I enable row level security',t);execute format('create policy owner_manage on public.%I for all to authenticated using(public.is_owner()) with check(public.is_owner())',t);end loop;end $$;
create table public.enquiries(id uuid primary key default gen_random_uuid(),name text not null,email text not null,subject text not null default '',message text not null,is_read boolean not null default false,archived boolean not null default false,created_at timestamptz not null default now());
alter table public.enquiries enable row level security;
create policy inbox_owner on public.enquiries for all to authenticated using(public.is_owner()) with check(public.is_owner());
create table public.contact_limits(key text primary key,window_start timestamptz not null default now(),count integer not null default 0);
alter table public.contact_limits enable row level security;
create function public.submit_enquiry(p_key text,p_name text,p_email text,p_subject text,p_message text) returns void language plpgsql security definer set search_path=public as $$
declare n integer; begin
if length(p_name)<2 or length(p_name)>100 or length(p_email)>200 or length(p_message)<20 or length(p_message)>5000 then raise exception 'invalid_message'; end if;
insert into contact_limits(key,count) values(p_key,1) on conflict(key) do update set count=case when contact_limits.window_start<now()-interval '1 hour' then 1 else contact_limits.count+1 end,window_start=case when contact_limits.window_start<now()-interval '1 hour' then now() else contact_limits.window_start end returning count into n;
if n>5 then raise exception 'rate_limit';end if;
insert into enquiries(name,email,subject,message) values(p_name,p_email,p_subject,p_message);
delete from contact_limits where window_start<now()-interval '2 days';
end $$;
revoke all on function public.submit_enquiry(text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.submit_enquiry(text,text,text,text,text) to service_role;
-- Atomic revision promotion keeps live data separate from draft changes.
create function public.publish_content(p_table text,p_id uuid,p_data jsonb) returns void language plpgsql security invoker set search_path=public as $$ begin
if not public.is_owner() then raise exception 'owner_required';end if;
if p_table not in ('projects','playground_items','articles') then raise exception 'invalid_table';end if;
execute format('insert into %I(resource_id,state,data) values($1,''draft'',$2) on conflict(resource_id,state) do update set data=excluded.data,updated_at=now()',p_table||'_revisions') using p_id,p_data;
execute format('insert into %I(resource_id,state,data) values($1,''published'',$2) on conflict(resource_id,state) do update set data=excluded.data,updated_at=now()',p_table||'_revisions') using p_id,p_data;
end $$;
create function public.publish_settings(p_data jsonb) returns void language plpgsql security invoker set search_path=public as $$ begin
if not public.is_owner() then raise exception 'owner_required';end if;
if jsonb_array_length(p_data->'disciplines')=0 or not (p_data->'disciplines' ? (p_data->>'primary')) then raise exception 'invalid_disciplines';end if;
insert into settings_revisions(state,data) values('draft',p_data),('published',p_data) on conflict(state) do update set data=excluded.data,updated_at=now();
end $$;
-- Media stays private. The application authorizes references against published revisions.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('portfolio-media','portfolio-media',false,20971520,array['image/png','image/jpeg','image/webp','image/gif','video/mp4','video/webm','application/pdf']) on conflict(id) do nothing;
create policy owner_media_select on storage.objects for select to authenticated using(bucket_id='portfolio-media' and public.is_owner());
create policy owner_media_insert on storage.objects for insert to authenticated with check(bucket_id='portfolio-media' and public.is_owner());
create policy owner_media_update on storage.objects for update to authenticated using(bucket_id='portfolio-media' and public.is_owner()) with check(bucket_id='portfolio-media' and public.is_owner());
create policy owner_media_delete on storage.objects for delete to authenticated using(bucket_id='portfolio-media' and public.is_owner());
