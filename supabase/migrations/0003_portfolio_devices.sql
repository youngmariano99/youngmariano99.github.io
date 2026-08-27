-- NODEXA Landing — casos de éxito: soporte de vista Desktop/Mobile por caso.
-- Correr después de 0002_portfolio.sql, en el mismo proyecto.
--
-- imagen_portada_url (ya existente) pasa a ser LA CAPTURA DE ESCRITORIO —
-- no se renombra la columna para no romper lo que ya cargaste, solo se
-- suma la de mobile y los toggles de qué mostrar.

alter table public.portfolio_projects
  add column if not exists imagen_mobile_url text,
  add column if not exists mostrar_desktop boolean not null default true,
  add column if not exists mostrar_mobile boolean not null default false;

comment on column public.portfolio_projects.imagen_portada_url is
  'Captura de escritorio (laptop) — formato recomendado 2560×1600 (16:10) o similar, mínimo 1600px de ancho.';
comment on column public.portfolio_projects.imagen_mobile_url is
  'Captura de celular (mobile) — formato recomendado 1170×2532 (9:19.5, proporción de iPhone) o similar vertical angosto.';
