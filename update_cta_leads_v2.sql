-- Actualización de cta_leads para el nuevo formulario de match de packs (Octubre 2026)

ALTER TABLE public.cta_leads
ADD COLUMN IF NOT EXISTS modalidad_venta text,
ADD COLUMN IF NOT EXISTS tipo_procesos text,
ADD COLUMN IF NOT EXISTS pack_sugerido text;
