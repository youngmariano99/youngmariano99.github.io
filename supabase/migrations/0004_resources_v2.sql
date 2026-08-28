-- NODEXA Landing — recursos: imagen(es) de vista previa + pasos de uso.
-- Correr después de 0001_init.sql, en el mismo proyecto. Aditivo, no
-- toca los recursos que ya tenés cargados.

alter table public.resources
  add column if not exists imagen_principal_url text,
  add column if not exists galeria_urls text[] not null default '{}',
  add column if not exists pasos jsonb not null default '[]'::jsonb;

comment on column public.resources.imagen_principal_url is
  'Imagen de portada del recurso — se ve en la tarjeta de /recursos.';
comment on column public.resources.galeria_urls is
  'Imágenes adicionales, se ven en el detalle del recurso.';
comment on column public.resources.pasos is
  'Pasos para usar el recurso: [{ "titulo": "...", "descripcion": "..." }, ...]';
