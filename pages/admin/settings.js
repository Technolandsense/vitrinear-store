import { useState, useEffect } from 'react';
import { supabasePublic } from '../../lib/supabase';
import AdminNav from '../../components/AdminNav';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    supabasePublic.from('settings').select('*').then(({ data }) => {
      const obj = {};
      (data || []).forEach(s => obj[s.key] = s.value);
      setSettings(obj);
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg('');
    for (const [key, value] of Object.entries(settings)) {
      await supabasePublic.from('settings').upsert({ key, value }, { onConflict: 'key' });
    }
    setMsg('✅ Guardado correctamente');
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
          {msg && <p style={{ textAlign: 'center', marginTop: 12, fontWeight: 600, fontSize: 13, color: '#16A34A' }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}
