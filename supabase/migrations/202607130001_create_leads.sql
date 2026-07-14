-- Botifiy qualified lead capture.
-- Run this migration in the Supabase SQL editor before publishing /activate.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  whatsapp text not null check (whatsapp ~ '^\+[1-9][0-9]{7,14}$'),
  business_type text not null check (
    business_type in (
      'متجر إلكتروني',
      'عيادة',
      'مطعم / كافيه',
      'صالون تجميل / Spa',
      'أكاديمية / كورسات',
      'شركة خدمات',
      'أخرى'
    )
  ),
  needs text[] not null check (
    cardinality(needs) between 1 and 2
    and needs <@ array[
      'الرد التلقائي على العملاء',
      'متابعة العملاء تلقائياً',
      'الاتنين معاً'
    ]::text[]
  ),
  selected_plan text not null default 'General' check (
    selected_plan in ('الإطلاق', 'النمو', 'الهيمنة', 'General')
  ),
  source text not null default 'direct' check (char_length(source) between 1 and 120),
  ip inet,
  user_agent text not null default 'unknown' check (char_length(user_agent) <= 500),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'qualified', 'won', 'lost')
  ),

  -- Internal reliability field. It is never shown to the visitor.
  submission_key uuid not null unique
);

comment on table public.leads is 'Qualified sales leads submitted through the Botifiy activation page.';
comment on column public.leads.submission_key is 'Idempotency key used to prevent duplicate form submissions.';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_ip_created_at_idx on public.leads (ip, created_at desc);
create index if not exists leads_whatsapp_created_at_idx on public.leads (whatsapp, created_at desc);
create index if not exists leads_status_created_at_idx on public.leads (status, created_at desc);

alter table public.leads enable row level security;
alter table public.leads force row level security;

-- There are deliberately no public table policies. Browser/anon users cannot read,
-- update, delete, or insert rows directly. The narrowly scoped RPC below is the only
-- anon entry point and owns validation, idempotency, and database-backed rate limits.
revoke all on table public.leads from anon, authenticated;

create or replace function public.submit_lead(
  p_name text,
  p_whatsapp text,
  p_business_type text,
  p_needs text[],
  p_selected_plan text,
  p_source text,
  p_ip text,
  p_user_agent text,
  p_submission_key uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_existing public.leads%rowtype;
  v_inserted public.leads%rowtype;
  v_ip inet;
begin
  select * into v_existing
  from public.leads
  where submission_key = p_submission_key;

  if found then
    return jsonb_build_object(
      'id', v_existing.id,
      'created_at', v_existing.created_at,
      'status', v_existing.status,
      'duplicate', true
    );
  end if;

  begin
    v_ip := nullif(p_ip, '')::inet;
  exception when invalid_text_representation then
    v_ip := null;
  end;

  if char_length(trim(p_name)) not between 2 and 80
    or p_whatsapp !~ '^\+[1-9][0-9]{7,14}$'
    or p_business_type not in (
      'متجر إلكتروني', 'عيادة', 'مطعم / كافيه', 'صالون تجميل / Spa',
      'أكاديمية / كورسات', 'شركة خدمات', 'أخرى'
    )
    or cardinality(p_needs) not between 1 and 2
    or not (p_needs <@ array[
      'الرد التلقائي على العملاء',
      'متابعة العملاء تلقائياً',
      'الاتنين معاً'
    ]::text[])
    or p_selected_plan not in ('الإطلاق', 'النمو', 'الهيمنة', 'General')
    or char_length(trim(p_source)) not between 1 and 120
  then
    raise exception using message = 'INVALID_LEAD_DATA', errcode = '22023';
  end if;

  -- Practical 80/20 spam limits: 5 leads/IP/hour and 3 leads/number/day.
  if v_ip is not null and exists (
    select 1
    from public.leads
    where ip = v_ip and created_at > now() - interval '1 hour'
    group by ip
    having count(*) >= 5
  ) then
    raise exception using message = 'RATE_LIMITED_IP', errcode = 'P0001';
  end if;

  if exists (
    select 1
    from public.leads
    where whatsapp = p_whatsapp and created_at > now() - interval '24 hours'
    group by whatsapp
    having count(*) >= 3
  ) then
    raise exception using message = 'RATE_LIMITED_PHONE', errcode = 'P0001';
  end if;

  insert into public.leads (
    name,
    whatsapp,
    business_type,
    needs,
    selected_plan,
    source,
    ip,
    user_agent,
    submission_key
  ) values (
    regexp_replace(trim(p_name), '[[:cntrl:]<>]', ' ', 'g'),
    p_whatsapp,
    p_business_type,
    p_needs,
    p_selected_plan,
    regexp_replace(trim(p_source), '[[:cntrl:]<>]', ' ', 'g'),
    v_ip,
    left(coalesce(p_user_agent, 'unknown'), 500),
    p_submission_key
  )
  returning * into v_inserted;

  return jsonb_build_object(
    'id', v_inserted.id,
    'created_at', v_inserted.created_at,
    'status', v_inserted.status,
    'duplicate', false
  );
end;
$$;

revoke all on function public.submit_lead(text, text, text, text[], text, text, text, text, uuid) from public;
grant execute on function public.submit_lead(text, text, text, text[], text, text, text, text, uuid) to anon, authenticated;

