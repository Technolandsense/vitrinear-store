# Guía para crear una nueva tienda

## 1. Crear la tienda en Super Admin

1. Ir a **vitrinear.vercel.app/superadmin**
2. Ingresar contraseña: `vitrineAR777**admin`
3. En el formulario "Crear tienda", escribir:
   - **Nombre**: ej. "Tienda Prueba"
   - **Slug**: ej. `tienda-prueba` (solo minúsculas, sin espacios, sin guión bajo)
   - **Contraseña admin**: ej. `miclave123`
4. Click **Crear tienda**

---

## 2. Crear el proyecto en Vercel

1. Ir a **vercel.com** → **Add New** → **Project**
2. Importar el repo: **Technolandsense/vitrinear-store**
3. Click **Import**
4. ** IMPORTANTE: Antes de hacer click en "Deploy"**, ir a **Environment Variables**

---

## 3. Agregar variables de entorno (6 variables)

Agregar UNA POR UNA:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cfgpwnphqtpdyethzdvr.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3B3bnBocXRwZHlldGh6ZHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwODY3NDQsImV4cCI6MjA5NDY2Mjc0NH0.1auNoVsNk-WbnILxuNk5juE9AZ4DFq5hZs6TpopWPFk` |
| `NEXT_PUBLIC_STORE_SLUG` | `tienda-prueba` (el mismo slug que usaste arriba) |
| `ADMIN_PASSWORD` | `miclave123` (la que pusiste al crear la tienda) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ3B3bnBocXRwZHlldGh6ZHZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTA4Njc0NCwiZXhwIjoyMDk0NjYyNzQ0fQ.p9hLei45B4M5L_niF4s2WcthMjVmiR9WC3Cu39A60VQ` |
| `JWT_SECRET` | `vitrinear-super-secret-key-2024` |

5. Click **Deploy**

---

## 4. Esperar el deploy (~2 minutos)

Cuando termine, Vercel te da la URL: `https://tienda-prueba.vercel.app`

---

## 5. Personalizar la tienda

Ir a `https://tienda-prueba.vercel.app/admin`

- **Login**: ingresar la contraseña que pusiste al crear la tienda
- **Products**: agregar productos (nombre, precio, fotos, categoría)
- **Categories**: crear categorías
- **Settings**: cambiar nombre de tienda, colores, banner

---

## Notas importantes

- Cada tienda **arranca vacía** — hay que cargar productos desde cero
- Las fotos se suben a Supabase Storage y son visibles solo en esa tienda
- Si querés conectar Mercado Pago, agregar variable: `MERCADO_PAGO_ACCESS_TOKEN`
- La tienda principal (`vitrinear.vercel.app`) muestra TODOS los productos
- Las tiendas-cliente muestran solo los productos de su slug
