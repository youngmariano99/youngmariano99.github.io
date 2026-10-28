-- Migración 0005: Tabla para configuración unificada de Portfolio y CV ATS
-- Permite sincronizar la configuración editada desde /admin con persistencia central en Supabase

create table if not exists public.portfolio_cv_config (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_cv_config enable row level security;

-- Lectura pública para que /portfolio pueda consumir la configuración
create policy "portfolio_cv_config_public_read"
  on public.portfolio_cv_config for select
  to anon, authenticated
  using (true);

-- Escritura restringida a usuarios autenticados (Admin)
create policy "portfolio_cv_config_admin_write"
  on public.portfolio_cv_config for all
  to authenticated
  using (true)
  with check (true);
