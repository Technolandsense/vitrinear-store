-- ============================================================
-- RLS Policies for VitrineAR
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. ORDERS: full protection (anon can't read/write)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_all" ON orders;
DROP POLICY IF EXISTS "service_all" ON orders;
CREATE POLICY "service_all" ON orders FOR ALL USING (auth.role() = 'service_role');

-- 2. PRODUCTS: anon can SELECT only, service can write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select" ON products;
DROP POLICY IF EXISTS "service_all" ON products;
CREATE POLICY "anon_select" ON products FOR SELECT USING (true);
CREATE POLICY "service_all" ON products FOR ALL USING (auth.role() = 'service_role');

-- 3. CATEGORIES: anon can SELECT only, service can write
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select" ON categories;
DROP POLICY IF EXISTS "service_all" ON categories;
CREATE POLICY "anon_select" ON categories FOR SELECT USING (true);
CREATE POLICY "service_all" ON categories FOR ALL USING (auth.role() = 'service_role');

-- 4. SETTINGS: anon can SELECT only, service can write
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select" ON settings;
DROP POLICY IF EXISTS "service_all" ON settings;
CREATE POLICY "anon_select" ON settings FOR SELECT USING (true);
CREATE POLICY "service_all" ON settings FOR ALL USING (auth.role() = 'service_role');
