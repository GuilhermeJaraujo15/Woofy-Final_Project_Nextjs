-- Diagnostic script for Admin pet archive failures.
-- Replace the two UUIDs in params before running in Supabase SQL Editor.
-- This script does not mutate data.

WITH params AS (
  SELECT
    '00000000-0000-0000-0000-000000000000'::uuid AS pet_id,
    '00000000-0000-0000-0000-000000000000'::uuid AS admin_user_id
)
SELECT
  'pets_columns' AS section,
  c.column_name,
  c.data_type,
  c.is_nullable,
  c.column_default
FROM information_schema.columns c
WHERE c.table_schema = 'public'
  AND c.table_name = 'pets'
  AND c.column_name IN ('id', 'user_id', 'arquivado', 'is_archived', 'archived_at', 'archived_by')
ORDER BY c.ordinal_position;

WITH params AS (
  SELECT
    '00000000-0000-0000-0000-000000000000'::uuid AS pet_id,
    '00000000-0000-0000-0000-000000000000'::uuid AS admin_user_id
)
SELECT
  'pet_row' AS section,
  p.id,
  p.user_id,
  p.nome,
  p.arquivado,
  p.is_archived,
  p.archived_at,
  p.archived_by
FROM public.pets p
JOIN params ON params.pet_id = p.id;

WITH params AS (
  SELECT
    '00000000-0000-0000-0000-000000000000'::uuid AS pet_id,
    '00000000-0000-0000-0000-000000000000'::uuid AS admin_user_id
)
SELECT
  'admin_profile' AS section,
  pr.id,
  pr.email,
  pr.full_name,
  pr.role,
  pr.approval_status
FROM public.profiles pr
JOIN params ON params.admin_user_id = pr.id;

SELECT
  'pets_policies' AS section,
  pol.policyname,
  pol.cmd,
  pol.roles,
  pol.qual AS using_expression,
  pol.with_check AS with_check_expression
FROM pg_policies pol
WHERE pol.schemaname = 'public'
  AND pol.tablename = 'pets'
ORDER BY pol.policyname;

SELECT
  'pets_rls' AS section,
  cls.relrowsecurity AS rls_enabled,
  cls.relforcerowsecurity AS rls_forced
FROM pg_class cls
JOIN pg_namespace nsp ON nsp.oid = cls.relnamespace
WHERE nsp.nspname = 'public'
  AND cls.relname = 'pets';

WITH params AS (
  SELECT
    '00000000-0000-0000-0000-000000000000'::uuid AS pet_id,
    '00000000-0000-0000-0000-000000000000'::uuid AS admin_user_id
)
SELECT
  'linked_records' AS section,
  (SELECT count(*) FROM public.agendamentos a WHERE a.pet_id = params.pet_id) AS agendamentos,
  (SELECT count(*) FROM public.consultas c WHERE c.pet_id = params.pet_id) AS consultas,
  (SELECT count(*) FROM public.vacinas v WHERE v.pet_id = params.pet_id) AS vacinas,
  (SELECT count(*) FROM public.exames e WHERE e.pet_id = params.pet_id) AS exames,
  (SELECT count(*) FROM public.historico h WHERE h.pet_id = params.pet_id) AS historico
FROM params;
