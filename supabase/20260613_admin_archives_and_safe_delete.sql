BEGIN;

-- Adds admin-level soft archive metadata without removing existing data.
ALTER TABLE public.agendamentos
  ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archived_by UUID REFERENCES public.profiles(id);

ALTER TABLE public.consultas
  ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archived_by UUID REFERENCES public.profiles(id);

ALTER TABLE public.vacinas
  ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archived_by UUID REFERENCES public.profiles(id);

ALTER TABLE public.exames
  ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archived_by UUID REFERENCES public.profiles(id);

CREATE INDEX IF NOT EXISTS idx_agendamentos_is_archived ON public.agendamentos(is_archived);
CREATE INDEX IF NOT EXISTS idx_consultas_is_archived ON public.consultas(is_archived);
CREATE INDEX IF NOT EXISTS idx_vacinas_is_archived ON public.vacinas(is_archived);
CREATE INDEX IF NOT EXISTS idx_exames_is_archived ON public.exames(is_archived);

COMMIT;
