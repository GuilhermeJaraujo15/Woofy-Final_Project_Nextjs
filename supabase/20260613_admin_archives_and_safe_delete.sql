BEGIN;

-- Adds admin-level soft archive metadata without removing existing data.
ALTER TABLE public.pets
  ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS archived_by UUID REFERENCES public.profiles(id);

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

ALTER TABLE public.pets
  ALTER COLUMN is_archived SET DEFAULT FALSE;

UPDATE public.pets
SET is_archived = TRUE,
    archived_at = COALESCE(archived_at, now())
WHERE arquivado = TRUE
  AND is_archived IS DISTINCT FROM TRUE;

UPDATE public.pets
SET is_archived = FALSE
WHERE is_archived IS NULL;

UPDATE public.pets
SET arquivado = TRUE
WHERE is_archived = TRUE
  AND arquivado = FALSE;

ALTER TABLE public.pets
  ALTER COLUMN is_archived SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_pets_is_archived ON public.pets(is_archived);
CREATE INDEX IF NOT EXISTS idx_agendamentos_is_archived ON public.agendamentos(is_archived);
CREATE INDEX IF NOT EXISTS idx_consultas_is_archived ON public.consultas(is_archived);
CREATE INDEX IF NOT EXISTS idx_vacinas_is_archived ON public.vacinas(is_archived);
CREATE INDEX IF NOT EXISTS idx_exames_is_archived ON public.exames(is_archived);

COMMIT;
