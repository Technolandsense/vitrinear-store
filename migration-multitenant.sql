-- ============================================================
-- Multi-tenant migration: run in Supabase SQL Editor
-- ============================================================

-- 1. Stores table
CREATE TABLE IF NOT EXISTS stores (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  admin_password TEXT NOT NULL DEFAULT 'admin123',
  custom_domain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_all" ON stores;
CREATE POLICY "service_all" ON stores FOR ALL USING (auth.role() = 'service_role');

-- 2. Add store_slug to existing tables
ALTER TABLE products ADD COLUMN IF NOT EXISTS store_slug TEXT NOT NULL DEFAULT '__main__';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS store_slug TEXT NOT NULL DEFAULT '__main__';
ALTER TABLE categories ADD COLUMN IF NOT EXISTS store_slug TEXT NOT NULL DEFAULT '__main__';
ALTER TABLE settings ADD COLUMN IF NOT EXISTS store_slug TEXT NOT NULL DEFAULT '__main__';

-- 3. Create the main store entry
INSERT INTO stores (name, slug, admin_password)
VALUES ('VitrineAR', '__main__', 'admin123')
ON CONFLICT (slug) DO NOTHING;
