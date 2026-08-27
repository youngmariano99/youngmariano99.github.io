-- NODEXA Landing — sección "Casos de Éxito" (portfolio de marcas).
-- Correr después de 0001_init.sql, en el mismo proyecto Supabase de la landing.

-- ------------------------------------------------------------------
-- Storage: bucket público para portadas/galería de cada caso.
-- ------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "portfolio_bucket_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

create policy "portfolio_bucket_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

create policy "portfolio_bucket_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio');

create policy "portfolio_bucket_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');

-- ------------------------------------------------------------------
-- portfolio_projects: un caso de éxito por fila.
-- ------------------------------------------------------------------
create table public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  cliente_nombre text not null,
  -- Categoría corta que se muestra como "subtítulo" en la constelación y
  -- el muro (ej. "Marketplace de servicios", "Gestión y repartos").
  rubro text not null,
  imagen_portada_url text,
  problema text not null,
  solucion text not null,
  -- [{ "titulo": "Relevamiento...", "descripcion": "..." }, ...]
  pasos jsonb not null default '[]'::jsonb,
  galeria_urls text[] not null default '{}',
  -- Define si aparece como "caso insignia" (estrella grande/dorada en la
  -- constelación, tarjeta destacada en el muro). Pensado para 1 a la vez,
  -- pero no hay restricción dura — el layout se adapta a 0, 1 o varios.
  insignia boolean not null default false,
  activo boolean not null default true,
  orden int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.portfolio_projects enable row level security;

create policy "portfolio_projects_public_select_activos"
  on public.portfolio_projects for select
  to anon, authenticated
  using (activo = true);

create policy "portfolio_projects_admin_all"
  on public.portfolio_projects for all
  to authenticated
  using (true)
  with check (true);

create index portfolio_projects_slug_idx on public.portfolio_projects (slug);
create index portfolio_projects_orden_idx on public.portfolio_projects (orden, created_at desc);

-- ------------------------------------------------------------------
-- Datos iniciales: los 3 casos que ya mostraba "El Viaje" en la home
-- (src/projectsData.ts). Las imágenes de portada reutilizan los mismos
-- archivos que ya están en /public/Proyectos — no hace falta resubir nada.
-- Le agregué los pasos de "cómo trabajamos" (esa parte no existía en el
-- dato original); ajustalos si no reflejan bien el proceso real.
-- La Leñera queda como caso insignia — fue el trabajo con más alcance de
-- los tres. Cambialo con un UPDATE cuando tengas uno más nuevo/grande.
-- ------------------------------------------------------------------
insert into public.portfolio_projects
  (slug, cliente_nombre, rubro, imagen_portada_url, problema, solucion, pasos, insignia, orden)
values
  (
    'argoot',
    'Argoot',
    'Marketplace de servicios',
    '/Proyectos/Proyecto1Argoot.png',
    'Desconexión entre profesionales de la construcción y clientes que requerían contrataciones confiables.',
    'Plataforma marketplace donde los profesionales exponen su trabajo y los clientes pueden descubrirlos, solicitar servicios y valorarlos.',
    '[
      {"titulo": "Relevamiento del mercado", "descripcion": "Entendimos cómo buscaban y contrataban profesionales hoy, y qué fricción tenía cada lado."},
      {"titulo": "Arquitectura del marketplace", "descripcion": "Diseñamos el flujo de publicación, búsqueda y contacto entre profesionales y clientes."},
      {"titulo": "Lanzamiento y ajuste", "descripcion": "Pusimos la plataforma en producción y ajustamos según el uso real de los primeros usuarios."}
    ]'::jsonb,
    false,
    2
  ),
  (
    'filomena',
    'Filomena',
    'Catálogo online',
    '/Proyectos/Proyecto2Filomena.png',
    'Carecían de un canal digital propio, lo que les impedía llegar a clientes acostumbrados a comprar por internet de forma rápida.',
    'Catálogo digital 100% personalizado que permite a los clientes explorar productos y realizar pedidos al instante desde cualquier dispositivo.',
    '[
      {"titulo": "Relevamiento del catálogo", "descripcion": "Relevamos todo el catálogo de productos y cómo querían presentarlo online."},
      {"titulo": "Diseño 100% personalizado", "descripcion": "Armamos un catálogo digital a medida de su marca, pensado para pedidos rápidos."},
      {"titulo": "Puesta en marcha", "descripcion": "Lo pusimos online y capacitamos al equipo para mantenerlo actualizado."}
    ]'::jsonb,
    false,
    3
  ),
  (
    'la-lenera',
    'La Leñera',
    'Gestión y repartos',
    '/Proyectos/Proyecto3LeñeraChingolitosParte1.png',
    'Registros manuales en papel que generaban confusión en los pedidos, pérdidas financieras y roces en la atención al cliente.',
    'Sistema integral que centraliza finanzas, control de pedidos, stock, rutas de reparto, cuentas corrientes y punto de venta (POS).',
    '[
      {"titulo": "Relevamiento en el local", "descripcion": "Mapeamos el flujo real: cómo entraba un pedido, cómo salía la mercadería, dónde se perdía información."},
      {"titulo": "Arquitectura a medida", "descripcion": "Diseñamos un sistema único: stock, cuentas corrientes, rutas de reparto y caja, todo conectado."},
      {"titulo": "Implementación y capacitación", "descripcion": "Migramos su información existente y capacitamos al equipo completo, del depósito al mostrador."}
    ]'::jsonb,
    true,
    1
  );
