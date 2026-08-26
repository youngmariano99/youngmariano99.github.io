-- NODEXA Landing — esquema inicial (Recursos, leads, analíticas).
-- Correr en el proyecto Supabase dedicado a la landing (no en NodexaCore).
-- Pensado para pegar directo en el SQL Editor de Supabase, o vía
-- `supabase db push` si usás la CLI.

-- ------------------------------------------------------------------
-- Storage: bucket público para los archivos de Recursos (Excel, PDF).
-- Las herramientas "Web" no van acá (son links a otra app tuya), solo
-- los archivos descargables. Subida: consola de Supabase (Storage >
-- recursos) por ahora, o desde el panel de admin más adelante (Fase 4).
-- ------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('recursos', 'recursos', true)
on conflict (id) do nothing;

-- Cualquiera puede descargar (es contenido público una vez que se llenó
-- el formulario del lado del front — acá no hay nada que gatee la
-- descarga a nivel de archivo, ver nota de "gating" más abajo).
create policy "recursos_bucket_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'recursos');

-- Solo el admin logueado puede subir/reemplazar/borrar archivos.
create policy "recursos_bucket_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'recursos');

create policy "recursos_bucket_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'recursos');

create policy "recursos_bucket_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'recursos');

-- ------------------------------------------------------------------
-- resources: catálogo de recursos gratuitos ("Recursos Gratuitos")
-- ------------------------------------------------------------------
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text not null,
  tipo text not null check (tipo in ('excel', 'web', 'pdf')),
  dolor text not null check (dolor in ('stock', 'caja', 'carga', 'rentabilidad')),
  url_acceso text not null,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.resources enable row level security;

-- Cualquiera puede ver los recursos activos (es la grilla pública de /recursos).
create policy "resources_public_select_activos"
  on public.resources for select
  to anon, authenticated
  using (activo = true);

-- Solo el admin logueado puede dar de alta/editar/borrar recursos.
create policy "resources_admin_all"
  on public.resources for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------------
-- resource_leads: envíos del formulario de descarga de un recurso
-- ------------------------------------------------------------------
create table public.resource_leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  rubro text not null,
  rubro_otro text,
  dolor text not null,
  dolor_otro text,
  resource_id uuid references public.resources (id) on delete set null,
  resource_titulo text not null,
  created_at timestamptz not null default now()
);

alter table public.resource_leads enable row level security;

-- Cualquier visitante puede insertar su propio lead (al descargar), pero
-- nunca leer los de otros.
create policy "resource_leads_public_insert"
  on public.resource_leads for insert
  to anon, authenticated
  with check (true);

-- Solo el admin logueado puede leer los leads.
create policy "resource_leads_admin_select"
  on public.resource_leads for select
  to authenticated
  using (true);

-- ------------------------------------------------------------------
-- cta_leads: envíos del formulario calificador (reemplaza el diagnóstico)
-- ------------------------------------------------------------------
create table public.cta_leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  negocio text not null,
  dolor text not null,
  volumen text not null,
  urgencia text not null,
  prioridad_score int not null,
  prioridad_label text not null check (prioridad_label in ('Alta', 'Media', 'Baja')),
  source text not null,
  whatsapp_message text not null,
  contactado boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.cta_leads enable row level security;

create policy "cta_leads_public_insert"
  on public.cta_leads for insert
  to anon, authenticated
  with check (true);

create policy "cta_leads_admin_select"
  on public.cta_leads for select
  to authenticated
  using (true);

-- El admin puede marcar/desmarcar "contactado" desde el panel.
create policy "cta_leads_admin_update"
  on public.cta_leads for update
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------------
-- analytics_events: funnel liviano (apertura de modal, clics, envíos)
-- ------------------------------------------------------------------
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('modal_open', 'form_submit', 'cta_click')),
  source text not null,
  page text not null,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

create policy "analytics_events_public_insert"
  on public.analytics_events for insert
  to anon, authenticated
  with check (true);

create policy "analytics_events_admin_select"
  on public.analytics_events for select
  to authenticated
  using (true);

-- ------------------------------------------------------------------
-- Índices de apoyo para los filtros del panel de admin
-- ------------------------------------------------------------------
create index resource_leads_created_at_idx on public.resource_leads (created_at desc);
create index resource_leads_rubro_idx on public.resource_leads (rubro);
create index resource_leads_dolor_idx on public.resource_leads (dolor);

create index cta_leads_created_at_idx on public.cta_leads (created_at desc);
create index cta_leads_prioridad_idx on public.cta_leads (prioridad_label);
create index cta_leads_source_idx on public.cta_leads (source);

create index analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index analytics_events_type_idx on public.analytics_events (event_type);

-- ------------------------------------------------------------------
-- Datos iniciales: los 2 recursos que ya existen hoy.
-- La calculadora web todavía no tiene URL real — activo=false para que
-- no aparezca en la grilla pública hasta que la actives (UPDATE
-- public.resources SET activo = true, url_acceso = '...' WHERE titulo =
-- 'Calculadora de Rentabilidad';) una vez que tengas el link.
-- ------------------------------------------------------------------
insert into public.resources (titulo, descripcion, tipo, dolor, url_acceso, activo) values
  (
    'Control de Stock Inicial',
    'Ideal para dejar el cuaderno. Registrá entradas, salidas y conocé tu inventario base sin complicaciones.',
    'excel',
    'stock',
    'https://utuphxulzwnvwklxdjkv.supabase.co/storage/v1/object/public/recursos/NodexaCuentaCorriente.xlsm',
    true
  ),
  (
    'Calculadora de Rentabilidad',
    'Entendé si estás ganando o perdiendo plata con tus precios actuales. Cargá tus costos y sacá el margen real.',
    'web',
    'rentabilidad',
    'https://REEMPLAZAR-CON-EL-LINK-DE-LA-HERRAMIENTA',
    false
  );
