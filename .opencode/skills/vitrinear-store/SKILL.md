---
name: vitrinear-store
description: Convenciones del proyecto VitrineAR Store (Next.js pages router + Supabase + Mercado Pago + multi-tenant)
---

## Stack

- **Framework**: Next.js 14 (pages router, no app router)
- **Backend**: Supabase (Postgres + Storage)
- **Auth**: Cookies propias con JWT (no Supabase Auth)
- **Pagos**: Mercado Pago (SDK mercadopago v2)
- **Estilos**: CSS inline, sin Tailwind ni CSS modules
- **Deploy**: Vercel, multi-deploy por tienda

## Rutas clave

| Ruta | Descripción |
|------|-------------|
| `pages/index.js` | Tienda pública |
| `pages/admin/index.js` | Admin dashboard + login |
| `pages/admin/products.js` | CRUD productos |
| `pages/admin/categories.js` | CRUD categorías |
| `pages/admin/settings.js` | Config: colores, banner, datos bancarios |
| `pages/superadmin.js` | Panel maestro multi-tenant |
| `pages/api/*.js` | API routes (admin, auth, orders, superadmin) |

## Estructura multi-tenant

- Cada tienda tiene un `store_slug` (definido por env var `NEXT_PUBLIC_STORE_SLUG`)
- Tienda principal (`__main__`) muestra todos los datos
- Clientes tienen su propio deploy en Vercel con su slug
- Filtrado por `store_slug` en queries a Supabase

## Auth

- Login via `/api/auth/login` → devuelve cookie `admin_token`
- JWT con HMAC SHA-256, expiry 24h
- Middleware de protección: `requireAdmin` y `requireSuperAdmin` en `lib/auth-check.js`
- Superadmin definido por `SUPER_ADMIN_PASSWORD` env var (solo en main)
- Admin de tienda: password guardado en tabla `stores` o env var `ADMIN_PASSWORD`

## Supabase

- **Client público**: `lib/supabase.js` (anon key)
- **Client admin**: `lib/supabase-admin.js` (service role key, usado en API routes)
- Storage bucket: `products` para imágenes de productos

## Mercado Pago

- Integración en `lib/mercadopago.js` (crea preferencias)
- Token vía env var `MERCADO_PAGO_ACCESS_TOKEN`
- Checkout: transferencia bancaria o tarjeta (MP)

## Admin

- Acceso: `/<slug>.vercel.app/admin`
- Productos: inline CRUD con emojis + imágenes (hasta 3)
- Categorías: creación y edición inline
- Config: colores (`color_primary`, `color_dark`, `color_bg`, `color_grey`, `color_text`), banner, propiedades visuales, datos bancarios

## Convenciones de código

- Estilos inline con objeto `style` (no CSS modules, no Tailwind)
- Nombres de archivos en kebab-case para pages
- Componentes compartidos en `components/`
- Lógica compartida en `lib/`
- Evitar comentarios en código salvo que sea necesario
- Errores se manejan con `alert()` en frontend, `console.error` en backend
