import { useState, useEffect } from 'react';
import { supabasePublic } from '../../lib/supabase';
import AdminNav from '../../components/AdminNav';
import { requireAdmin } from '../../lib/auth-check';
import { STORE_SLUG } from '../../lib/store';

export const getServerSideProps = requireAdmin;

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const sf = STORE_SLUG ? (q) => q.eq('store_slug', STORE_SLUG) : (q) => q;
    sf(supabasePublic.from('settings').select('*')).then(({ data }) => {
      const obj = {};
      (data || []).forEach(s => obj[s.key] = s.value);
      setSettings(obj);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg('');
    const entries = Object.entries(settings).map(([key, value]) => ({ key, value }));
    const r = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: entries })
    });
    if (r.ok) {
      setMsg('✅ Guardado correctamente');
    } else {
      setMsg('❌ Error al guardar');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const FIELDS = [
    { key: 'store_name', label: 'Nombre de la tienda', type: 'text' },
    { key: 'store_slogan', label: 'Eslogan', type: 'text' },
    { key: 'bank_titular', label: 'Titular de la cuenta', type: 'text' },
    { key: 'bank_cuit', label: 'CUIT', type: 'text' },
    { key: 'bank_cbu', label: 'CBU', type: 'text' },
    { key: 'bank_alias', label: 'Alias', type: 'text' },
    { key: 'bank_banco', label: 'Banco', type: 'text' },
    { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
    { key: 'email', label: 'Email de contacto', type: 'email' },
    { key: 'email_pagos', label: 'Email para comprobantes', type: 'email' },
  ];

  const COLORS = [
    { key: 'color_primary', label: 'Color principal', default: '#FF4B2B' },
    { key: 'color_dark', label: 'Color oscuro', default: '#0F1923' },
    { key: 'color_bg', label: 'Color de fondo', default: '#FAF8F4' },
    { key: 'color_grey', label: 'Color gris', default: '#F2EEE8' },
    { key: 'color_text', label: 'Color de texto', default: '#1C1C1C' },
  ];

  const PROPS = [
    { iconKey: 'prop1_icon', titleKey: 'prop1_title', descKey: 'prop1_desc' },
    { iconKey: 'prop2_icon', titleKey: 'prop2_title', descKey: 'prop2_desc' },
    { iconKey: 'prop3_icon', titleKey: 'prop3_title', descKey: 'prop3_desc' },
    { iconKey: 'prop4_icon', titleKey: 'prop4_title', descKey: 'prop4_desc' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4' }}>
      <AdminNav />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '30px 20px' }}>
        <h1 style={{ color: '#0F1923', fontFamily: "'Syne',sans-serif", marginBottom: 24 }}>⚙️ Configuración</h1>

        <div style={{ background: '#fff', borderRadius: 16, padding: 26, border: '1.5px solid #E5E0D8' }}>
          {FIELDS.map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
              <input type={f.type} value={settings[f.key] || ''} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
            </div>
          ))}

          <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0F1923', fontFamily: "'Syne',sans-serif", marginBottom: 14, marginTop: 24 }}>🎨 Colores de la tienda</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {COLORS.map(c => (
              <div key={c.key}>
                <label style={{ fontSize: 10, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>{c.label}</label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input type="color" value={settings[c.key] || c.default} onChange={e => setSettings({ ...settings, [c.key]: e.target.value })} style={{ width: 40, height: 36, borderRadius: 6, border: '1.5px solid #E5E0D8', padding: 2, cursor: 'pointer' }} />
                  <input type="text" value={settings[c.key] || c.default} onChange={e => setSettings({ ...settings, [c.key]: e.target.value })} placeholder={c.default} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1.5px solid #E5E0D8', fontSize: 12, fontFamily: 'monospace' }} />
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0F1923', fontFamily: "'Syne',sans-serif", marginBottom: 14, marginTop: 24 }}>🖼️ Banner principal</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Imagen de fondo (URL)</label>
            <input type="text" value={settings.banner_url || ''} onChange={e => setSettings({ ...settings, banner_url: e.target.value })} placeholder="https://ejemplo.com/banner.jpg" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
            {settings.banner_url && (
              <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', height: 100 }}>
                <img src={settings.banner_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
              </div>
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Texto del banner</label>
            <input type="text" value={settings.banner_title || ''} onChange={e => setSettings({ ...settings, banner_title: e.target.value })} placeholder="Ej: ¡Ofertas de temporada!" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Subtítulo del banner</label>
            <input type="text" value={settings.banner_subtitle || ''} onChange={e => setSettings({ ...settings, banner_subtitle: e.target.value })} placeholder="Ej: Hasta 40% off en seleccionados" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Descripción del banner</label>
            <input type="text" value={settings.banner_desc || ''} onChange={e => setSettings({ ...settings, banner_desc: e.target.value })} placeholder="Ej: Electrónica, hogar, bazar y más" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: '#8A8A8A', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>Etiqueta del banner (ej: 🔥 Ofertas)</label>
            <input type="text" value={settings.banner_tag || ''} onChange={e => setSettings({ ...settings, banner_tag: e.target.value })} placeholder="🔥 Ofertas especiales" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
          </div>

          <h2 style={{ fontSize: 14, fontWeight: 800, color: '#0F1923', fontFamily: "'Syne',sans-serif", marginBottom: 14, marginTop: 24 }}>🏷️ Propiedades visuales (inicio)</h2>
          {PROPS.map((p, i) => (
            <div key={p.iconKey} style={{ marginBottom: 16, padding: 14, background: '#FAF8F4', borderRadius: 12, border: '1px solid #E5E0D8' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#8A8A8A', marginBottom: 10 }}>PROPIEDAD {i + 1}</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <input value={settings[p.iconKey] || ''} onChange={e => setSettings({ ...settings, [p.iconKey]: e.target.value })} placeholder="Icono (ej: 🚚)" style={{ width: 60, padding: '10px 8px', borderRadius: 8, border: '1.5px solid #E5E0D8', fontSize: 13, textAlign: 'center' }} />
                <input value={settings[p.titleKey] || ''} onChange={e => setSettings({ ...settings, [p.titleKey]: e.target.value })} placeholder="Título" style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
              </div>
              <input value={settings[p.descKey] || ''} onChange={e => setSettings({ ...settings, [p.descKey]: e.target.value })} placeholder="Descripción" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
            </div>
          ))}

          <button onClick={save} disabled={saving} style={{ width: '100%', padding: '12px', background: '#FF4B2B', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 14, marginTop: 8, opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Guardando...' : '💾 Guardar configuración'}
          </button>
          {msg && <p style={{ textAlign: 'center', marginTop: 12, fontWeight: 600, fontSize: 13, color: msg.includes('✅') ? '#16A34A' : '#EF4444' }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}
