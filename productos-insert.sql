-- Productos scrapeados de tiendadebarrio.com.ar
-- 100 productos en 13 categorías
-- Generado el 2026-06-03
-- Ejecutar en: https://supabase.com/dashboard/project/cfgpwnphqtpdyethzdvr/sql/new

BEGIN;

-- Insertar categorías
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Hogar y Herramientas', 0, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Juegos y Consolas', 1, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Auriculares', 2, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Belleza', 3, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Niños', 4, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Mascotas', 5, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Bazar', 6, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Parlantes', 7, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Varios', 8, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Cargadores y cables', 9, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Iluminación & Filmaking', 10, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Informática', 11, '__main__') ON CONFLICT DO NOTHING;
INSERT INTO categories (name, sort_order, store_slug) VALUES ('Smartwatch', 12, '__main__') ON CONFLICT DO NOTHING;

-- Insertar productos
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Chispero eléctrico',
  'Hogar y Herramientas',
  5000,
  NULL,
  '🔧',
  'Oferta',
  'Prendé tus hornallas y parrillas sin gas ni fósforos. Encendedor eléctrico Nivhus con cuello flexible 360°, carga USB y diseño antiviento. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-26-at-08-33-38-e9e664a5f8487cab8217802593152255-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-26-at-08-33-38-e9e664a5f8487cab8217802593152255-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Estufa Halógena',
  'Hogar y Herramientas',
  25000,
  NULL,
  '🔧',
  NULL,
  'Calentá tus ambientes de forma inmediata con la Estufa Halógena AiTECH. 2 niveles de potencia (400W/800W), base antivuelco y 6 meses de garantía.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-14-fd46e770802e2a1e7417802588754721-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-14-fd46e770802e2a1e7417802588754721-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Destornillador x2',
  'Hogar y Herramientas',
  2000,
  NULL,
  '🔧',
  'Oferta',
  'Equipá tu caja de herramientas con este Set de 2 Destornilladores (Plano y Phillips). Vástago de 6x100mm y mango ergonómico. ¡Comprá hoy mismo!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-09-42-58-90b54945ffcea2faef17802581190380-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-09-42-58-90b54945ffcea2faef17802581190380-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Aspiradora portatil',
  'Hogar y Herramientas',
  8000,
  NULL,
  '🔧',
  'Oferta',
  'Limpiá cada rincón sin esfuerzo con la mini aspiradora inalámbrica YT-M2037. Diseño portátil 2 en 1 con accesorios para auto y hogar. ¡Comprá acá!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-32-84fca9c598af3e35d717802549323222-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-32-84fca9c598af3e35d717802549323222-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Proyector HY300',
  'Hogar y Herramientas',
  89999,
  NULL,
  '🔧',
  NULL,
  'Viví la experiencia del cine con el Proyector HY300. Resolución Ultra HD, Android TV integrado, rotación de 180° y WiFi. ¡Tu pantalla gigante en cualquier lugar! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-36-a921e48c9c9a45608817741095952393-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-36-a921e48c9c9a45608817741095952393-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Destornillador eléctrico',
  'Hogar y Herramientas',
  25000,
  NULL,
  '🔧',
  NULL,
  'Comprá online Destornillador eléctrico por $19.999,00. Hacé tu pedido y pagalo online.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-18-1-1f004bec2904504b9317621822752460-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-18-1-1f004bec2904504b9317621822752460-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Balanza Corporal',
  'Hogar y Herramientas',
  14999,
  NULL,
  '🔧',
  NULL,
  'Controlá tu peso con la balanza corporal digital de vidrio templado, precisa y resistente. Ideal para uso diario. ¡Comprala ahora y cuidá tu salud!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-26-at-17-13-25-1-2f7917ad8c596f89db17589187671022-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-26-at-17-13-25-1-2f7917ad8c596f89db17589187671022-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cepillo de limpieza para el hogar 7 en 1',
  'Hogar y Herramientas',
  39999,
  NULL,
  '🔧',
  NULL,
  '¡Di adiós al esfuerzo de limpiar! ✨ Este cepillo eléctrico inalámbrico hace el trabajo duro por ti. Incluye múltiples cabezales para baños, cocinas y más. ¡Limpieza profunda sin esfuerzo! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/cepillo-7-en-1-6434054d48d215e23317577068559516-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/cepillo-7-en-1-6434054d48d215e23317577068559516-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Game Box',
  'Juegos y Consolas',
  26000,
  NULL,
  '🎮',
  NULL,
  'Jugá con total comodidad gracias a la consola retro WOW X7M. Pantalla de 3.5&quot;, 500 juegos clásicos instalados y soporte para TV. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-15-at-14-35-59-95642f34120a4b7ef617802547640378-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-15-at-14-35-59-95642f34120a4b7ef617802547640378-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Sega portatil',
  'Juegos y Consolas',
  26000,
  NULL,
  '🎮',
  NULL,
  'Reviví los mejores clásicos con la consola portátil PXP 3 Slim Station de 16 Bits. Juegos integrados, conexión a TV y batería recargable. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-37-d3b94c786b6faa1ebc17802545785720-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-37-d3b94c786b6faa1ebc17802545785720-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Joystick ps4',
  'Juegos y Consolas',
  24999,
  NULL,
  '🎮',
  NULL,
  'Comprá el Joystick PS4 de Messi y la Selección. Diseño exclusivo Argentina 3 estrellas con envío rápido en Córdoba y a todo el país. ¡Jugá como el capitán!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-9f9fd73a4d159d147b17778148617275-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-9f9fd73a4d159d147b17778148617275-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mouse Gamer RGB con cable',
  'Juegos y Consolas',
  4999,
  NULL,
  '🎮',
  'Oferta',
  'Maximiza tu precisión con el Mouse Gamer X1 Professional. Diseño ergonómico, iluminación RGB vibrante y conexión por cable para un juego competitivo sin lag. ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-18-f10aeb72b033d594db17738595003667-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-18-f10aeb72b033d594db17738595003667-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Joystick play 3',
  'Juegos y Consolas',
  22000,
  NULL,
  '🎮',
  NULL,
  'Reviví tus juegos favoritos con este joystick inalámbrico Doubleshock compatible con PlayStation 3. Vibración y control preciso para horas de diversión.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-64a29d26623cece9e317501279682727-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-64a29d26623cece9e317501279682727-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono y auricular para Moto',
  'Auriculares',
  22000,
  NULL,
  '🎧',
  NULL,
  'Viajá conectado con el Intercomunicador de Moto V10. Auricular inalámbrico para casco con reducción de ruido, resistencia al agua y batería de larga duración.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-16-at-09-08-12-c776770fb498e8b52f17802604790724-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-16-at-09-08-12-c776770fb498e8b52f17802604790724-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auriculares Ultrapods',
  'Auriculares',
  5500,
  NULL,
  '🎧',
  'Oferta',
  'Descubrí el futuro del sonido con los Ultrapods Max. Auriculares inalámbricos Bluetooth 5.3, diseño transparente y sonido Hi-Res. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-7-a4a3bb50028641901617802600681880-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-7-a4a3bb50028641901617802600681880-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auriculares Bluetooth Inalámbricos con Pantalla LED y Control Táctil',
  'Auriculares',
  34999,
  NULL,
  '🎧',
  NULL,
  'Auriculares Bluetooth inalámbricos con pantalla LED, control táctil y batería recargable. Sonido potente y conexión rápida.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/images-ec5e9277234329974b17737825888880-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/images-ec5e9277234329974b17737825888880-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auriculares deportivos',
  'Auriculares',
  9999,
  NULL,
  '🎧',
  'Oferta',
  'Auriculares deportivos con soporte detrás de orejas, cómodos y resistentes al sudor para entrenar sin preocupaciones. ¡Comprá ahora y disfrutá tu música!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-19-1-12c4013b48d2b97e8d17621845124957-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-19-1-12c4013b48d2b97e8d17621845124957-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auricular vincha RGB Gamer',
  'Auriculares',
  14999,
  NULL,
  '🎧',
  NULL,
  'Disfrutá el Auricular vincha RGB Gamer con luces y sonido 6D. Cómodo, inalámbrico y potente para gaming y música. ¡Compralo ahora!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-1337d1a891e1e1a82f17595005097991-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-1337d1a891e1e1a82f17595005097991-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auricular vincha Bluetooth con diseño 3D',
  'Auriculares',
  22999,
  NULL,
  '🎧',
  NULL,
  'Auriculares Bluetooth con diseño de gatito y luz LED. Inalámbricos, plegables y cómodos. Ideales para música y llamadas. Colores pastel.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-16-a-las-23-35-49_8024963e-b9ca7b06581faa567e17553982625640-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-16-a-las-23-35-49_8024963e-b9ca7b06581faa567e17553982625640-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auriculares Inalambricos G11 Lanxnun',
  'Auriculares',
  9999,
  NULL,
  '🎧',
  'Oferta',
  'Sumérgete en el juego con los G11. Auriculares True Wireless con sonido Hi-Fi y baja latencia, ideales para gaming y deportes.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/14356-40081c650f72eba8ba17504505695683-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/14356-40081c650f72eba8ba17504505695683-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Auriculares inalámbricos M19',
  'Auriculares',
  9999,
  NULL,
  '🎧',
  'Oferta',
  'Disfrutá de sonido de alta calidad con los M19. Auriculares inalámbricos con pantalla LED, estuche cargador y power bank.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/13534_2-c03856770af84c916217504503489476-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/13534_2-c03856770af84c916217504503489476-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'AURICULARES M/L BASEUS ENCOK H17',
  'Auriculares',
  14999,
  NULL,
  '🎧',
  NULL,
  'Auriculares Baseus Encok H17 con cable, sonido estéreo de alta calidad y micrófono. Ideales para música y llamadas, conexión 3.5mm.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/6703_2-7f477fbb123c0b9fbe17463073498996-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/6703_2-7f477fbb123c0b9fbe17463073498996-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Planchita de pelo Alien Tech',
  'Belleza',
  14000,
  NULL,
  '💄',
  NULL,
  'Conseguí un lacio perfecto con la Planchita Alien Tech CH-0440. Placas de 90x27mm, calentamiento rápido y cable de 1.8 metros. ¡Comprá al mejor precio!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-20-1e09a462c2b9f0562017802578155858-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-20-1e09a462c2b9f0562017802578155858-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Depilador / perfilador de cejas',
  'Belleza',
  4500,
  NULL,
  '💄',
  'Oferta',
  'Lográ cejas perfectas y sin dolor con el perfilador eléctrico Flawlbss. Cabezal hipoalergénico de oro 18K y luz LED integrada. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-27-at-07-17-31-17db8a54a3e378767517802571563919-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-27-at-07-17-31-17db8a54a3e378767517802571563919-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Corta pelo Profesional',
  'Belleza',
  18200,
  NULL,
  '💄',
  NULL,
  'Lográ un corte perfecto con la máquina Nogaan DL-1639. Diseño vintage de dragón con pantalla LED, carga USB y cuchillas profesionales. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-25-at-07-33-48-ff1d60f737a04a614c17802569510063-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-25-at-07-33-48-ff1d60f737a04a614c17802569510063-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cepillo secador alisador',
  'Belleza',
  16000,
  NULL,
  '💄',
  NULL,
  'Secá, alisá y modelá tu cabello en minutos con el Cepillo Eléctrico AiTECH. 1000W de potencia, tecnología de iones y cable giratorio 360°. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-25-e0f87a7a3dc03ea52117802566609963-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-25-e0f87a7a3dc03ea52117802566609963-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Corta pelos nasal',
  'Belleza',
  4500,
  NULL,
  '💄',
  'Oferta',
  'Eliminá los vellos de nariz y orejas sin tirones con el recortador GOOD LOOK. Diseño portátil a pila, incluye cepillo limpiador y tapa. ¡Comprá acá!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-08-01-50-facab41c5105a26b8517802558515626-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-08-01-50-facab41c5105a26b8517802558515626-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Espejo triptico Led',
  'Belleza',
  20000,
  NULL,
  '💄',
  NULL,
  'Conseguí la iluminación perfecta con este espejo tríptico de maquillaje LED. Diseño plegable, botón táctil, paneles de aumento y base organizadora.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-30-at-04-02-13-062afa06007177fcad17802556556433-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-30-at-04-02-13-062afa06007177fcad17802556556433-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Patillera Exxtra Tech',
  'Belleza',
  14999,
  NULL,
  '💄',
  NULL,
  'Consigue cortes precisos con la Exxtra Tech. Incluye 4 peines guía, diseño ergonómico y batería recargable. Ideal para barba y contornos. ¡Compra la tuya!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-11-c1f254682be63cc82917738532830207-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-11-c1f254682be63cc82917738532830207-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Corta pelo 3 en 1',
  'Belleza',
  19999,
  NULL,
  '💄',
  NULL,
  'Descubre el kit Seis CPR01. Sistema 3 en 1: afeitadora, cortadora de pelo y recortador de nariz. Recargable y preciso. ¡El regalo ideal para hombres!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-9-b5264dcc631c3bd58217738527579133-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-9-b5264dcc631c3bd58217738527579133-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mini planchita de pelo flequillera',
  'Belleza',
  4999,
  NULL,
  '💄',
  'Oferta',
  'Mini planchita de pelo flequillera, compacta y rápida. Ideal para retoques y viajes. ¡Lleva tu estilo impecable siempre! Compra ahora y luce perfecta.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-18-at-21-41-26-3bfbdc46c31785526e17582981082824-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-18-at-21-41-26-3bfbdc46c31785526e17582981082824-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'espejo lelog con luz led',
  'Belleza',
  17999,
  NULL,
  '💄',
  NULL,
  'Espejo de maquillaje LELONG con luz LED, aumento 1X y organizador en la base. Diámetro de 150mm. Ideal para tu rutina de belleza. Fácil de almacenar.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-17-a-las-00-09-58_9acf61aa-ade6c4f65abf7d5b4117554006507632-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-17-a-las-00-09-58_9acf61aa-ade6c4f65abf7d5b4117554006507632-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Máquina de Afeitar Inalambrica',
  'Belleza',
  7999,
  NULL,
  '💄',
  'Oferta',
  'Máquina de cortar pelo y barba recargable con diseño exclusivo de dragón. Ideal para terminaciones precisas, patillas y dibujos.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/503594_13__5_1-72f4cc2b61c30a60ad17454456116551-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/503594_13__5_1-72f4cc2b61c30a60ad17454456116551-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Futbol Flip Kids',
  'Niños',
  4000,
  NULL,
  '🧸',
  'Oferta',
  '¡Diversión al instante con Fútbol Flip de Kids Club! Mini juego de fútbol estilo flipper mecánico para 2 jugadores. No usa pilas. Edad +3 años.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-1-a0faf7d44baf5d33fa17802609175725-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-1-a0faf7d44baf5d33fa17802609175725-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Set de peinados trenzador de pelo',
  'Niños',
  21000,
  NULL,
  '🧸',
  NULL,
  'Creá peinados únicos con el Trenzador Automático de Juguete Tiny. Incluye cepillo, hilos de 8m, gomitas y mostacillas. ¡El regalo ideal para jugar!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-10-2c6f41ae34aa4a801a17802597594338-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-10-2c6f41ae34aa4a801a17802597594338-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Botella de Agua Plegable Básquet | Silicona Flexible con Mosquetón',
  'Niños',
  5999,
  NULL,
  '🧸',
  'Oferta',
  'Botella deportiva plegable con diseño de básquet. Hecha de silicona libre de BPA, incluye mosquetón y boquilla deportiva. ¡Ahorra espacio con estilo!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-5-e26ffac302d2048fbb17738450935963-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-5-e26ffac302d2048fbb17738450935963-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Termo Infantil de Acero Inoxidable con Funda y Correa | 500ml',
  'Niños',
  19999,
  NULL,
  '🧸',
  NULL,
  'Termos infantiles con diseños divertidos. Incluyen funda protectora, correa ajustable y sorbete. ¡Hidratación segura y con estilo para el colegio!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-3-609392c09fa92534a317738427985679-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-3-609392c09fa92534a317738427985679-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Termo Térmico Kawaii Gatito &quot;Bubble Cute&quot;',
  'Niños',
  14999,
  NULL,
  '🧸',
  NULL,
  'Botella térmica de gatito con diseño kawaii. Acero inoxidable, apertura de un toque y sorbete integrado. Ideal para el colegio u oficina. ¡Compra el tuyo!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-1-bbeb461494a29d0f4717738399831979-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-1-bbeb461494a29d0f4717738399831979-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Tableta/Pizarra 8.5&quot; con diseño para dibujar',
  'Niños',
  7999,
  NULL,
  '🧸',
  'Oferta',
  'Pizarra mágica LCD para niños. Dibujá, escribí y borrá fácilmente. Sin papel ni tiza. Diseños de Spider-Man, Princesas y Selección.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-03-a-las-00-54-30_8cfdf126-242eac305b624cbb4717541933381057-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-03-a-las-00-54-30_8cfdf126-242eac305b624cbb4717541933381057-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Pistola Hidrogel',
  'Niños',
  19999,
  NULL,
  '🧸',
  NULL,
  'Pistola gel blaster eléctrica Desert Eagle con bolitas de gel, recargable y segura. Ideal para juegos al aire libre y diversión asegurada.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-03-a-las-00-40-00_15c23ec0-d2ef3ed8ba4f8606a517541924708032-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-03-a-las-00-40-00_15c23ec0-d2ef3ed8ba4f8606a517541924708032-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Corta pelo para mascotas',
  'Mascotas',
  14999,
  NULL,
  '🐾',
  NULL,
  'Cortadora de pelo para mascotas Onica. Motor potente 5W, súper silenciosa y con 90 min de autonomía. Incluye peines guía. ¡Resultados profesionales en casa!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-10-f675c48516f2895d2917738529848629-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-10-f675c48516f2895d2917738529848629-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cepillo a Vapor Quita Pelos Crema',
  'Mascotas',
  4999,
  NULL,
  '🐾',
  'Oferta',
  ' Cepillo de vapor para mascotas que desenreda el pelo, masajea y aporta humedad. Elimina pelaje suelto y mantiene el pelo sano.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/images-6bb22900be372b904a17738489007509-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/images-6bb22900be372b904a17738489007509-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Aceitera dual 2 en 1',
  'Bazar',
  5500,
  NULL,
  '🏠',
  'Oferta',
  'Optimizá tus comidas con la Aceitera Dual de Vidrio. Sistema 2 en 1 con atomizador spray para Air Fryer y pico vertedor tradicional. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-22-at-07-47-49-302609c2fc03457b5217802607751507-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-22-at-07-47-49-302609c2fc03457b5217802607751507-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Termo Liso Simil stanley',
  'Bazar',
  19000,
  NULL,
  '🏠',
  NULL,
  'Disfrutá tus mates siempre calientes con el Termo de Acero Inoxidable de 1 Litro. Doble capa al vacío, manija reforzada y tapa vaso. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-11-cb1edf857672c2447c17802595513791-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-11-cb1edf857672c2447c17802595513791-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Taza Osito',
  'Bazar',
  5500,
  NULL,
  '🏠',
  'Oferta',
  'Disfrutá tus cafés con la taza de doble vidrio con forma de osito. Mantiene la temperatura, no quema las manos y tiene un diseño viral. ¡Comprá acá!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-30-at-03-57-48-e47b3e13f54b691aa217802586659777-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-30-at-03-57-48-e47b3e13f54b691aa217802586659777-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Vaso termino Copa del Mundo',
  'Bazar',
  22000,
  NULL,
  '🏠',
  NULL,
  'Mantené tus bebidas heladas con el Chopp Térmico Copa del Mundo. Interior de aluminio, espectacular diseño 3D y color dorado. ¡Comprá el tuyo!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-28-at-08-05-50-0b253385faa348ec6917802582712957-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-28-at-08-05-50-0b253385faa348ec6917802582712957-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Jarro termico &quot;Un Poco de Ruido&quot;',
  'Bazar',
  16000,
  NULL,
  '🏠',
  NULL,
  'Disfrutá tus bebidas bien frías con el Chopp Térmico de Un Poco de Ruido. Interior de aluminio, cuerpo resistente y diseño oficial. ¡Comprá acá!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-21-3e928ccd69bf6a0f0917802575356997-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-21-3e928ccd69bf6a0f0917802575356997-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Saca corcho automatico',
  'Bazar',
  13500,
  NULL,
  '🏠',
  NULL,
  'Abrí tus botellas en segundos y sin esfuerzo con este sacacorchos eléctrico automático. Diseño elegante con luces LED y doble botón. ¡Comprá acá!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-13-28-17-19da5d3b3c729b6d8617802543438340-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-13-28-17-19da5d3b3c729b6d8617802543438340-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Termo media manija + Mate',
  'Bazar',
  22000,
  NULL,
  '🏠',
  NULL,
  'Comprá el Set Matero LUO. Termo de acero inoxidable y mate térmico en colores pastel y mate. Conserva el agua caliente por más tiempo. ¡Envíos!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-39-417139fff86eecfdc017802538657625-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-39-417139fff86eecfdc017802538657625-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Termo eléctrico Oryx 1L',
  'Bazar',
  93999,
  NULL,
  '🏠',
  NULL,
  'Calienta y mantiene el agua para tu mate con el Termo Eléctrico Oryx de 1L. Control digital, acero inoxidable y diseño portátil. ¡Ideal para viajes y oficina! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-38-3ac28d2161083b92bc17741100107163-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-38-3ac28d2161083b92bc17741100107163-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Tapa pico cebador',
  'Bazar',
  4999,
  NULL,
  '🏠',
  'Oferta',
  'Mejorá tu termo con el Tapón Cebador Universal. Cierre hermético, sistema de apertura rápida y vertido preciso. ¡Ideal para cebar los mejores mates! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/9950-1-689f340570eba-0a758b0bb26accc9f917741098000525-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/9950-1-689f340570eba-0a758b0bb26accc9f917741098000525-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Pava eléctrica con corte de mate',
  'Bazar',
  24999,
  NULL,
  '🏠',
  NULL,
  'Logra el agua ideal para tus mates con la Jarra Eléctrica OM. 2 Litros, acero inoxidable, corte automático y 2000W. ¡Rapidez y precisión en tu cocina! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-37-fc113397aae78932ab17741094001903-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-37-fc113397aae78932ab17741094001903-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mate Neo Classic',
  'Bazar',
  9999,
  NULL,
  '🏠',
  'Oferta',
  'Descubre el Mate Neo Classic de 150ml. Diseño moderno, borde cromado y base estable. Ideal para un mate con estilo y durabilidad. ¡Elegí el tuyo ahora! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-41-92f2db4883de56948b17741086006577-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-41-92f2db4883de56948b17741086006577-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Jarro térmico Trillum',
  'Bazar',
  15999,
  NULL,
  '🏠',
  NULL,
  'Mantén tu bebida perfecta con el Chopp Trillium. Acero inoxidable, 24 horas de frío o calor y asa reforzada. ¡El legendario clásico que necesitas!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-12-a7f8f89da25a0a3fad17738537757177-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-12-a7f8f89da25a0a3fad17738537757177-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Parlante Onix 8&quot;',
  'Parlantes',
  33000,
  NULL,
  '🔊',
  NULL,
  'Ponéle música y color a tus días con el Parlante AiTECH ONIX de 8&quot;. Potencia de 5W, luces LED rítmicas y manija de transporte. ¡Comprá el tuyo hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-13-57-58-2690e9305dd421c74d17802584727991-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-29-at-13-57-58-2690e9305dd421c74d17802584727991-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Parlante símil JBL P2Pro',
  'Parlantes',
  24999,
  NULL,
  '🔊',
  NULL,
  'Disfruta de 10W de potencia con el Parlante Charge P2 Pro. Resistente al agua (IPX6), luces LED RGB y múltiples conexiones. ¡El sonido ideal para exteriores! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-20-24317e31a733aaeea617738600812756-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-20-24317e31a733aaeea617738600812756-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Parlante Ibek MagSafe IK-G300',
  'Parlantes',
  14999,
  NULL,
  '🔊',
  NULL,
  'Potencia tu música con el Altavoz Wibek IK-G300 de 5W. Bluetooth 5.4, diseño transparente con LED, succión magnética y hasta 4h de autonomía. ¡Portabilidad total!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-19-feb5ae6bbe76c16b7a17738598360178-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-19-feb5ae6bbe76c16b7a17738598360178-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono con cable',
  'Parlantes',
  7999,
  NULL,
  '🔊',
  'Oferta',
  'Mejora tu sonido con el Micrófono Soliter DM-701K. Unidireccional, alta fidelidad y construcción robusta. Ideal para karaoke y eventos. ¡Calidad profesional!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-15-894d4392daa20e099f17738550879939-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-15-894d4392daa20e099f17738550879939-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Parlante RGB 4&quot; Star Vision',
  'Parlantes',
  34999,
  NULL,
  '🔊',
  NULL,
  'Parlante Bluetooth portátil con luces LED, batería recargable y sonido potente de 10W. Ideal para fiestas y uso diario.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-46-3559ad748c142c415117577099416613-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-46-3559ad748c142c415117577099416613-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Parlante Touch Luz led Bluetooth',
  'Parlantes',
  9999,
  NULL,
  '🔊',
  'Oferta',
  'Disfrutá de tu música con la mejor onda gracias a este parlante Bluetooth portátil con lámpara táctil RGB. Cambiá los colores con un toque y crea el ambiente perfecto para cualquier ocasión. Ofrece un sonido claro y potente, ideal para tu habitación, sala o llevarlo a tus reuniones. Conéctalo fácilmente a tu ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-17-a-las-00-43-40_eb417292-6c0d844f085cd5bfe317554024843973-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-17-a-las-00-43-40_eb417292-6c0d844f085cd5bfe317554024843973-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Parlante chico LUO cilíndrico con rgb',
  'Parlantes',
  14999,
  NULL,
  '🔊',
  NULL,
  'Llevá la música a todas partes con este parlante Bluetooth LUO. Compacto, potente, con luces LED que cambian de color. ¡Ideal para tus reuniones o el aire libre!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/captura-de-pantalla_10-6-2025_205451_pency-app-01c13c9a27b0c5ae0517502847639719-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/captura-de-pantalla_10-6-2025_205451_pency-app-01c13c9a27b0c5ae0517502847639719-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Candado para Moto',
  'Varios',
  6500,
  NULL,
  '📎',
  'Oferta',
  'Protegé tu vehículo sin usar llaves. Candado de freno de disco con combinación numérica de 4 dígitos para motos, bicis y monopatines. ¡Comprá acá!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-20-at-09-00-37-0aa55fbc13324c549417802573281538-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-20-at-09-00-37-0aa55fbc13324c549417802573281538-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono inalambrico Tomate',
  'Varios',
  54999,
  NULL,
  '📎',
  NULL,
  'Sistema de micrófonos duales UHF Tomate TM-012. Gran alcance, baterías de litio recargables y sonido profesional. ¡Ideal para eventos y karaoke! Comprá hoy.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/54-999-1-9afc56e0762e4067b417748694128925-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/54-999-1-9afc56e0762e4067b417748694128925-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mini masajeador',
  'Varios',
  6999,
  NULL,
  '📎',
  'Oferta',
  'Alivia el dolor y la tensión con la Mini Fascial Gun. Masaje muscular profundo, diseño ultra compacto, batería de larga duración y funcionamiento silencioso. ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-40-dd3691b7dd83c9e0bb17741088668959-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-40-dd3691b7dd83c9e0bb17741088668959-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Tensiometro de brazo',
  'Varios',
  19999,
  NULL,
  '📎',
  NULL,
  'Controla tu salud con el Tensiómetro Digital de Brazo. Medición precisa de presión y pulso, detección de arritmias y memoria para 2 usuarios. ¡Fácil y confiable! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-25-a0e2b851285fe257c117738615393892-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-25-a0e2b851285fe257c117738615393892-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Drone 998 ProMax',
  'Varios',
  45000,
  NULL,
  '📎',
  NULL,
  'Drone 998 plegable con cámara HD, joystick y conexión WiFi por app. Ideal para principiantes y tomas aéreas increíbles.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-20-751239e375f7a4525e17621835645388-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-20-751239e375f7a4525e17621835645388-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'LLavero con linterna multifuncional',
  'Varios',
  9999,
  NULL,
  '📎',
  'Oferta',
  'Llavero con linterna multifuncional LED, encendedor y carga USB. Ideal para camping y emergencias. ¡Llevá tu herramienta todo en uno hoy mismo!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-26-at-17-13-36-e46a2f5d24c723153317589184591940-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-26-at-17-13-36-e46a2f5d24c723153317589184591940-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Alargue con 4 puertos USB y 1 puerto tipo C',
  'Varios',
  24999,
  NULL,
  '📎',
  NULL,
  'Optimiza tu espacio y mantené todos tus dispositivos conectados con esta regleta múltiple con 3 tomas universales y 4 puertos USB. Ideal para el hogar, la oficina o viajes, ofrece protección contra sobrecarga y cortocircuitos, asegurando una carga rápida y segura para celulares, tablets, notebooks y más. Diseño c',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-18-at-21-41-28-ab1aad4d09e31b924b17582859425588-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-18-at-21-41-28-ab1aad4d09e31b924b17582859425588-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Pila AA C/U',
  'Varios',
  499,
  NULL,
  '📎',
  'Oferta',
  '¡Mantén tus dispositivos funcionando con este práctico pack de 4 pilas AAA! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-46-11-088a4e8700a4b6167017577101474206-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-46-11-088a4e8700a4b6167017577101474206-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Masajeador curvo',
  'Varios',
  29999,
  NULL,
  '📎',
  NULL,
  '¡Alivia la tensión muscular y recupera tu bienestar con este masajeador de percusión eléctrico! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-12-at-17-17-48-6ae0bb515e3f9e4a9817577083081864-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-12-at-17-17-48-6ae0bb515e3f9e4a9817577083081864-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Estéreo para auto Nivhus',
  'Varios',
  24999,
  NULL,
  '📎',
  NULL,
  'Disfrutá del Estéreo para auto Nivhus con Bluetooth, USB y sonido superior. Conectate y manejá con seguridad. ¡Compralo ya!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-10-572df5aa976241b5bb17577073629089-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-10-572df5aa976241b5bb17577073629089-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cargador con cable tipo C 35W',
  'Cargadores y cables',
  8000,
  NULL,
  '🔌',
  'Oferta',
  'Cargá tu celular a máxima velocidad con el Kit AiTECH de 35W. Incluye fuente de pared USB-C, cable Tipo C a Tipo C y protección inteligente. ¡Comprá ya!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-6-4a8ea60d728aa01fed17802602856446-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-6-4a8ea60d728aa01fed17802602856446-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cargador inalambrico',
  'Cargadores y cables',
  8000,
  NULL,
  '🔌',
  'Oferta',
  'Cargá tu smartphone sin cables. Base de carga inalámbrica rápida AiTECH con indicador LED y cable incluido. Compatible con tecnología Qi.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-28-at-11-16-14-929f78f3602120c5a217802599325566-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-28-at-11-16-14-929f78f3602120c5a217802599325566-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Power Bank Ibek 20.000 mAh',
  'Cargadores y cables',
  21999,
  NULL,
  '🔌',
  NULL,
  'Batería externa Wibek de 20.000mAh. Incluye cables Lightning, Tipo C y USB. Carga varios equipos a la vez. ¡Nunca más te quedes sin batería! Envío en Córdoba.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-2-93dcde6d0a2438795317778153272480-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-2-93dcde6d0a2438795317778153272480-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cargador Samsung fuente y cable C a C',
  'Cargadores y cables',
  14999,
  NULL,
  '🔌',
  NULL,
  'Cargador Samsung de 25W con tecnología Power Delivery. Incluye cable USB-C a USB-C. Carga segura y rápida para tu Galaxy y más. ¡Envíos a todo el país!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-8-76f439f68543f3d06417738464934046-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-8-76f439f68543f3d06417738464934046-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Fuente Samsung certificada carga rápida',
  'Cargadores y cables',
  4999,
  NULL,
  '🔌',
  'Oferta',
  'Carga tu celular rápido y seguro con la fuente Samsung certificada. Compacta, ligera y compatible. ¡Compra ya y disfruta energía al instante!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-18-at-21-41-27-1-f204c79362cb1f316817582990836556-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-18-at-21-41-27-1-f204c79362cb1f316817582990836556-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cargador de Pilas AA/AAA Netmak',
  'Cargadores y cables',
  7999,
  NULL,
  '🔌',
  'Oferta',
  '¡Nunca te quedes sin energía! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-20-cc351c220ebf4d4bee17577065919260-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-20-cc351c220ebf4d4bee17577065919260-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cable USB a Iphone Aomin',
  'Cargadores y cables',
  1999,
  NULL,
  '🔌',
  'Oferta',
  '¡Carga y sincroniza tus dispositivos Android eficientemente! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/cable-aomin-512d92d0d13b92624717577059950105-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/cable-aomin-512d92d0d13b92624717577059950105-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cable de red 2m Netmak',
  'Cargadores y cables',
  4999,
  NULL,
  '🔌',
  'Oferta',
  '¡Conectá tu mundo con el Cable de Red Ethernet Netmak! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-22-69b3aa947db908477e17577058238583-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-22-69b3aa947db908477e17577058238583-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Adaptador tipo C a miniplug',
  'Cargadores y cables',
  3999,
  NULL,
  '🔌',
  'Oferta',
  'Conecta tus auriculares o altavoces con ficha 3.5mm a cualquier dispositivo con puerto USB-C. Este adaptador te permite seguir utilizando tus accesorios de audio favoritos en celulares y tablets modernos sin jack de auriculares. Ideal para escuchar música, ver videos o realizar llamadas con comodidad. Un accesorio ese',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/adaptador-miniplug-a-tipo-c-samsung-77f18a7b1c287196a317576988844364-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/adaptador-miniplug-a-tipo-c-samsung-77f18a7b1c287196a317576988844364-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cargador 12V para Auto',
  'Cargadores y cables',
  14999,
  NULL,
  '🔌',
  NULL,
  'Cargador de auto TRV con puerto USB. Ideal para mantener tus dispositivos cargados mientras viajas. Compacto, potente y compatible con 12V.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-03-a-las-00-01-01_c031d426-a7f2b17f013e6b216d17541900991516-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/imagen-de-whatsapp-2025-08-03-a-las-00-01-01_c031d426-a7f2b17f013e6b216d17541900991516-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cable USB a Iphone certificado 1mt',
  'Cargadores y cables',
  3999,
  NULL,
  '🔌',
  'Oferta',
  'Cable Lightning a USB de 1 metro original para cargar y sincronizar tus dispositivos iPhone, iPad y iPod. Calidad y velocidad garantizadas.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/7273-9d68b4b5afa5194a6417504509718138-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/7273-9d68b4b5afa5194a6417504509718138-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Cable Iphone a tipo C certificado 1mt',
  'Cargadores y cables',
  3999,
  NULL,
  '🔌',
  'Oferta',
  'Comprá online Cable Iphone a tipo C certificado 1mt por $3.999,00. Hacé tu pedido y pagalo online.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/7218-1-dbb95cc368990001ed17504508313801-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/7218-1-dbb95cc368990001ed17504508313801-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Tira luz Neon 5M',
  'Iluminación & Filmaking',
  10400,
  NULL,
  '💡',
  NULL,
  'Transformá tus espacios con la Tira Neón Flex LED AiTECH. Iluminación continua, diseño ultra flexible y fuente incluida. ¡Comprá hoy al mejor precio!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-13-1af8158a00c7a4e43517802590518367-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-13-1af8158a00c7a4e43517802590518367-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Palo Selfie tripode 3 en 1',
  'Iluminación & Filmaking',
  18000,
  NULL,
  '💡',
  NULL,
  'Lográ fotos y videos perfectos con el Trípode Palo Selfie JC-20H. Incluye mini aro de luz LED, control remoto Bluetooth y cabezal giratorio. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-27-at-09-46-05-342cb3007adea576cc17802564546623-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-27-at-09-46-05-342cb3007adea576cc17802564546623-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono corbatero F15',
  'Iluminación & Filmaking',
  15000,
  NULL,
  '💡',
  NULL,
  'Mejorá tus videos con el micrófono inalámbrico F15. Incluye filtro anti-viento de felpa y receptor dual Tipo-C/Iphone. Audio profesional. ¡Comprá hoy!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-23-at-07-20-32-107422256ef2c7b5c917802554483172-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-23-at-07-20-32-107422256ef2c7b5c917802554483172-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono corbatero doble',
  'Iluminación & Filmaking',
  18000,
  NULL,
  '💡',
  NULL,
  'Mejorá el audio de tus videos con este set doble de micrófonos corbateros inalámbricos 2.4G. Incluye estuche de carga inteligente con pantalla LED.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-22-at-08-30-41-4b7a2b000cce69470017802551963813-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2026-05-22-at-08-30-41-4b7a2b000cce69470017802551963813-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Luz de emergencia Orix',
  'Iluminación & Filmaking',
  21999,
  NULL,
  '💡',
  NULL,
  'Luz de emergencia solar Oryx con 48 LEDs. Carga solar y USB, 5 horas de autonomía y diseño portátil. ¡Ideal para cortes de luz y camping!',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-14-952bd4f204eaf057f117738548162785-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-14-952bd4f204eaf057f117738548162785-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Luz Bolichera',
  'Iluminación & Filmaking',
  14999,
  NULL,
  '💡',
  NULL,
  'Luz LED RGB con control remoto. Iluminá fiestas, escenarios o tu casa con colores vibrantes y efectos automáticos.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-18-354322389c71e4374117621826445141-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-11-03-at-11-57-18-354322389c71e4374117621826445141-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono corbatero MI-08 tipo C con adap iphone',
  'Iluminación & Filmaking',
  14999,
  NULL,
  '💡',
  NULL,
  '¡Eleva la calidad de tu audio con el Micrófono Inalámbrico IBEK MK-08! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-12-at-17-23-06-a14b127958410bf31117577086604231-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-12-at-17-23-06-a14b127958410bf31117577086604231-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Micrófono corbatero K9 Tipo C',
  'Iluminación & Filmaking',
  14999,
  NULL,
  '💡',
  NULL,
  '¡Mejora la calidad de tu audio con el Micrófono Inalámbrico K9! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-13-aec5375be493bcb38417577084905854-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-13-aec5375be493bcb38417577084905854-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Microfono corbatero K8 para Iphone',
  'Iluminación & Filmaking',
  14999,
  NULL,
  '💡',
  NULL,
  '¡Captura audio de alta calidad con el Micrófono Inalámbrico K8! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-48-2-861a3dd8a2a08ea20517577084230409-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-48-2-861a3dd8a2a08ea20517577084230409-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mini teclado portatil',
  'Informática',
  11999,
  NULL,
  '💻',
  NULL,
  'Controla tu Smart TV y PC con el Mini Teclado Yelandar. Retroiluminación LED, touchpad integrado y conexión inalámbrica. ¡El accesorio que te falta! ⌨️',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-39-2050056f1d5299797e17741090960234-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/diseno-sin-titulo-39-2050056f1d5299797e17741090960234-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Teclado + Mouse con cable Teclas redondas Netmak',
  'Informática',
  14999,
  NULL,
  '💻',
  NULL,
  'Optimiza tu espacio de trabajo con el Kit de Teclado y Mouse USB Netmak. Este combo alámbrico en color negro es ideal para oficina y uso diario, ofreciendo comodidad y precisión. Conecta y usa fácilmente en tu PC o notebook. ¡Encuéntralo ahora y mejora tu productividad! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-46-7-7a316a794ec3142eb017577110686363-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-46-7-7a316a794ec3142eb017577110686363-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Repetidor Wifi Noga',
  'Informática',
  14999,
  NULL,
  '💻',
  NULL,
  '¡Amplía la cobertura de tu WiFi con el Repetidor Inalámbrico Noga NGA-REP3! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-14-454bf27c277c6f32f517577104384537-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-14-454bf27c277c6f32f517577104384537-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mouse Netmak M-625 con cable',
  'Informática',
  4999,
  NULL,
  '💻',
  'Oferta',
  '¡Experimenta un control preciso y cómodo con el Mouse Óptico USB Netmak Optimize M625! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-25-5a24d1a014fa264cbd17577091912845-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-11-at-17-54-47-25-5a24d1a014fa264cbd17577091912845-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Mouse inalambrico Netmak M-614',
  'Informática',
  14999,
  NULL,
  '💻',
  NULL,
  '¡Libérate de los cables con el Mouse Inalámbrico Netmak Optimize M640! ',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-12-at-17-29-13-e9e41124929e69f5ff17577089813177-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/whatsapp-image-2025-09-12-at-17-29-13-e9e41124929e69f5ff17577089813177-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'TECLADO + MOUSE CON CABLE NETMAK',
  'Informática',
  14999,
  NULL,
  '💻',
  NULL,
  'Combo esencial de teclado y mouse con cable USB. Diseño ergonómico y duradero. Ideal para uso diario en oficina o en casa. Confiabilidad NETMAK.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-8-df4493c439f1b8794517523500815536-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/descarga-8-df4493c439f1b8794517523500815536-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'MOUSE INALAMBRICO NETMAK M-680',
  'Informática',
  9999,
  NULL,
  '💻',
  'Oferta',
  'Mouse inalámbrico NETMAK. Conexión USB, diseño compacto y ergonómico. Ideal para PC, notebooks y trabajo diario. Precisión y comodidad sin cables.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/images-2-2983049c29a0b1ede717523498779368-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/images-2-2983049c29a0b1ede717523498779368-640-0.webp',
  true,
  '__main__'
);
INSERT INTO products (name, category, price, old_price, image, tag, description, image_urls, image_url, active, store_slug) VALUES (
  'Reloj Smartwatch 7 mallas + Auriculares',
  'Smartwatch',
  29999,
  NULL,
  '⌚',
  NULL,
  ' Kit completo de smartwatch Ultra con pantalla HD, auriculares inalámbricos y 7 mallas para personalizar tu estilo. Monitoreo de salud y conexión total.',
  '["https://dcdn-us.mitiendanube.com/stores/006/114/708/products/captura-de-pantalla_10-6-2025_211428_pency-app-8ebf873c50f467d26117502855672090-640-0.webp"]'::jsonb,
  'https://dcdn-us.mitiendanube.com/stores/006/114/708/products/captura-de-pantalla_10-6-2025_211428_pency-app-8ebf873c50f467d26117502855672090-640-0.webp',
  true,
  '__main__'
);
COMMIT;
