BEGIN;

ALTER TABLE public.vacinas
  ADD COLUMN IF NOT EXISTS tutor_resposta TEXT,
  ADD COLUMN IF NOT EXISTS tutor_respondeu_em TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS tutor_motivo_cancelamento TEXT;

ALTER TABLE public.vacinas
  DROP CONSTRAINT IF EXISTS vacinas_status_check;

ALTER TABLE public.vacinas
  ADD CONSTRAINT vacinas_status_check
  CHECK (status IN ('recommended', 'scheduled', 'confirmed', 'applied', 'cancelled'));

ALTER TABLE public.vacinas
  DROP CONSTRAINT IF EXISTS vacinas_tutor_resposta_check;

ALTER TABLE public.vacinas
  ADD CONSTRAINT vacinas_tutor_resposta_check
  CHECK (tutor_resposta IS NULL OR tutor_resposta IN ('confirmada', 'cancelada'));

DROP POLICY IF EXISTS "Tutors can schedule own vaccines" ON public.vacinas;
DROP POLICY IF EXISTS "Tutors can confirm or cancel own vaccines" ON public.vacinas;

CREATE POLICY "Tutors can confirm or cancel own vaccines"
  ON public.vacinas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND status IN ('recommended', 'scheduled', 'confirmed', 'cancelled')
    AND tutor_resposta IN ('confirmada', 'cancelada')
  );

DROP POLICY IF EXISTS "Tutors can update own service lancamentos" ON public.lancamentos;

CREATE POLICY "Tutors can update own service lancamentos"
  ON public.lancamentos FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    AND origem_tipo IN ('appointment', 'vaccine')
  )
  WITH CHECK (
    auth.uid() = user_id
    AND tipo = 'entrada'
    AND status IN ('active', 'cancelled')
    AND origem_tipo IN ('appointment', 'vaccine')
    AND categoria IN ('Consultas', 'Vacinas')
  );

COMMIT;
