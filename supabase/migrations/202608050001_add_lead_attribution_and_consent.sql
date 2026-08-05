-- Persist first/last-touch acquisition context and whether advertising measurement was enabled.
-- Run after 202607130001_create_leads.sql and before deploying the matching application code.

alter table public.leads
  add column if not exists attribution jsonb not null default '{}'::jsonb,
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists consent_updated_at timestamptz;

comment on column public.leads.attribution is
  'Sanitized first-touch and last-touch campaign attribution captured by the marketing site.';
comment on column public.leads.marketing_consent is
  'Whether Meta advertising measurement was enabled when the lead was submitted.';
comment on column public.leads.consent_updated_at is
  'Timestamp of an explicit consent choice, when the consent UI is enabled.';

-- Replace the old RPC signature so all writes pass the attribution and consent fields explicitly.
drop function if exists public.submit_lead(text, text, text, text[], text, text, text, text, uuid);

create function public.submit_lead(
  p_name text,
  p_whatsapp text,
  p_business_type text,
  p_needs text[],
  p_selected_plan text,
  p_source text,
  p_ip text,
  p_user_agent text,
  p_submission_key uuid,
  p_attribution jsonb,
  p_marketing_consent boolean,
  p_consent_updated_at timestamptz
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
  v_attribution jsonb;
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

  v_attribution := coalesce(p_attribution, '{}'::jsonb);

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
    or jsonb_typeof(v_attribution) <> 'object'
    or pg_column_size(v_attribution) > 12000
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
    submission_key,
    attribution,
    marketing_consent,
    consent_updated_at
  ) values (
    regexp_replace(trim(p_name), '[[:cntrl:]<>]', ' ', 'g'),
    p_whatsapp,
    p_business_type,
    p_needs,
    p_selected_plan,
    regexp_replace(trim(p_source), '[[:cntrl:]<>]', ' ', 'g'),
    v_ip,
    left(coalesce(p_user_agent, 'unknown'), 500),
    p_submission_key,
    v_attribution,
    coalesce(p_marketing_consent, false),
    p_consent_updated_at
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

revoke all on function public.submit_lead(
  text, text, text, text[], text, text, text, text, uuid, jsonb, boolean, timestamptz
) from public;
grant execute on function public.submit_lead(
  text, text, text, text[], text, text, text, text, uuid, jsonb, boolean, timestamptz
) to anon, authenticated;
