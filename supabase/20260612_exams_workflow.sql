BEGIN;

CREATE TABLE IF NOT EXISTS public.exames (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  veterinario_id UUID NOT NULL REFERENCES public.profiles(id),
  categoria TEXT NOT NULL CHECK (categoria IN ('imagem', 'laboratorial')),
  tipo TEXT NOT NULL,
  nome_personalizado TEXT,
  observacoes TEXT,
  valor NUMERIC(12,2) NOT NULL CHECK (valor >= 0),
  data_recomendada DATE NOT NULL DEFAULT CURRENT_DATE,
  data_agendada DATE,
  horario_agendado TIME,
  status TEXT NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('recommended', 'scheduled', 'confirmed', 'cancelled')),
  tutor_resposta TEXT CHECK (tutor_resposta IS NULL OR tutor_resposta IN ('confirmada', 'cancelada')),
  tutor_respondeu_em TIMESTAMPTZ,
  tutor_motivo_cancelamento TEXT,
  consulta_id UUID REFERENCES public.consultas(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exames_pet_id ON public.exames(pet_id);
CREATE INDEX IF NOT EXISTS idx_exames_user_id ON public.exames(user_id);
CREATE INDEX IF NOT EXISTS idx_exames_veterinario_id ON public.exames(veterinario_id);
CREATE INDEX IF NOT EXISTS idx_exames_status ON public.exames(status);
CREATE INDEX IF NOT EXISTS idx_exames_data_agendada ON public.exames(data_agendada);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS exames_updated_at ON public.exames;
CREATE TRIGGER exames_updated_at
  BEFORE UPDATE ON public.exames
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.exames ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tutors admins and veterinarians can view relevant exames" ON public.exames;
DROP POLICY IF EXISTS "Veterinarians and admins can create exames" ON public.exames;
DROP POLICY IF EXISTS "Veterinarians can update own exames and admins can update all" ON public.exames;
DROP POLICY IF EXISTS "Tutors can confirm or cancel own exames" ON public.exames;
DROP POLICY IF EXISTS "Admins can delete exames" ON public.exames;

CREATE POLICY "Tutors admins and veterinarians can view relevant exames"
  ON public.exames FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR public.is_admin()
    OR (
      public.is_veterinario()
      AND (
        veterinario_id = auth.uid()
        OR EXISTS (
          SELECT 1
          FROM public.agendamentos a
          WHERE a.pet_id = exames.pet_id
            AND a.veterinario_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Veterinarians and admins can create exames"
  ON public.exames FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_admin()
    OR (
      public.is_veterinario()
      AND veterinario_id = auth.uid()
      AND EXISTS (
        SELECT 1
        FROM public.pets p
        WHERE p.id = exames.pet_id
          AND p.user_id = exames.user_id
      )
      AND EXISTS (
        SELECT 1
        FROM public.agendamentos a
        WHERE a.pet_id = exames.pet_id
          AND a.veterinario_id = auth.uid()
      )
    )
  );

CREATE POLICY "Veterinarians can update own exames and admins can update all"
  ON public.exames FOR UPDATE
  TO authenticated
  USING (public.is_admin() OR (public.is_veterinario() AND veterinario_id = auth.uid()))
  WITH CHECK (public.is_admin() OR (public.is_veterinario() AND veterinario_id = auth.uid()));

CREATE POLICY "Tutors can confirm or cancel own exames"
  ON public.exames FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND status IN ('recommended', 'scheduled', 'confirmed', 'cancelled')
    AND tutor_resposta IN ('confirmada', 'cancelada')
  );

CREATE POLICY "Admins can delete exames"
  ON public.exames FOR DELETE
  TO authenticated
  USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.prevent_tutor_exam_core_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.get_my_role() = 'tutor' THEN
    IF NEW.pet_id IS DISTINCT FROM OLD.pet_id
      OR NEW.user_id IS DISTINCT FROM OLD.user_id
      OR NEW.veterinario_id IS DISTINCT FROM OLD.veterinario_id
      OR NEW.categoria IS DISTINCT FROM OLD.categoria
      OR NEW.tipo IS DISTINCT FROM OLD.tipo
      OR NEW.nome_personalizado IS DISTINCT FROM OLD.nome_personalizado
      OR NEW.observacoes IS DISTINCT FROM OLD.observacoes
      OR NEW.valor IS DISTINCT FROM OLD.valor
      OR NEW.data_recomendada IS DISTINCT FROM OLD.data_recomendada
      OR NEW.data_agendada IS DISTINCT FROM OLD.data_agendada
      OR NEW.horario_agendado IS DISTINCT FROM OLD.horario_agendado
      OR NEW.consulta_id IS DISTINCT FROM OLD.consulta_id
    THEN
      RAISE EXCEPTION 'Tutors can only confirm or cancel exams';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_tutor_exam_core_changes ON public.exames;
CREATE TRIGGER guard_tutor_exam_core_changes
  BEFORE UPDATE ON public.exames
  FOR EACH ROW EXECUTE FUNCTION public.prevent_tutor_exam_core_changes();

ALTER TABLE public.lancamentos
  DROP CONSTRAINT IF EXISTS lancamentos_origem_tipo_check;

ALTER TABLE public.lancamentos
  ADD CONSTRAINT lancamentos_origem_tipo_check
  CHECK (
    origem_tipo IS NULL
    OR origem_tipo IN ('appointment', 'vaccine', 'exam', 'manual')
  );

DROP POLICY IF EXISTS "Tutors can create own service lancamentos" ON public.lancamentos;

CREATE POLICY "Tutors can create own service lancamentos"
  ON public.lancamentos FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND tipo = 'entrada'
    AND status = 'active'
    AND origem_tipo IN ('appointment', 'vaccine', 'exam')
    AND categoria IN ('Consultas', 'Vacinas', 'Exames')
  );

DROP POLICY IF EXISTS "Tutors can update own service lancamentos" ON public.lancamentos;

CREATE POLICY "Tutors can update own service lancamentos"
  ON public.lancamentos FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id
    AND origem_tipo IN ('appointment', 'vaccine', 'exam')
  )
  WITH CHECK (
    auth.uid() = user_id
    AND tipo = 'entrada'
    AND status IN ('active', 'cancelled')
    AND origem_tipo IN ('appointment', 'vaccine', 'exam')
    AND categoria IN ('Consultas', 'Vacinas', 'Exames')
  );

COMMIT;
