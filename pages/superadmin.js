import { useState, useEffect } from 'react';
import { requireSuperAdmin } from '../lib/auth-check';

export const getServerSideProps = requireSuperAdmin;

export default function SuperAdmin() {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({ name: '', slug: '', admin_password: 'admin123' });
  const [msg, setMsg] = useState('');

  const load = async () => {
    const r = await fetch('/api/superadmin/stores');
    const data = await r.json();
    setStores(data || []);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.name || !form.slug) return;
    const r = await fetch('/api/superadmin/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const d = await r.json();
    if (r.ok) {
      setMsg(` Tienda "${form.name}" creada. Slug: ${form.slug}`);
      setForm({ name: '', slug: '', admin_password: 'admin123' });
      load();
    } else {
      setMsg(' Error: ' + (d.error || 'desconocido'));
    }
    setTimeout(() => setMsg(''), 4000);
  };

  const deleteStore = async (id, name) => {
    if (!confirm(`¿Eliminar "${name}" y todos sus datos?`)) return;
    const r = await fetch('/api/superadmin/stores', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (r.ok) {
      setMsg(` Tienda "${name}" eliminada`);
      load();
    }
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F1923', padding: '30px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <h1 style={{ color: '#fff', fontFamily: "'Syne',sans-serif", fontSize: 22 }}>
            ⚡ Super Admin <span style={{ color: '#FF4B2B', fontSize: 13, fontWeight: 400, fontFamily: "'Plus Jakarta Sans',sans-serif", marginLeft: 8 }}>Panel maestro</span>
          </h1>
          <a href="/admin" style={{ color: 'rgba(255,255,255,.4)', fontSize: 12, textDecoration: 'none' }}>← Tienda principal</a>
        </div>

        {msg && <div style={{ background: msg.includes('Error') ? '#7F1D1D' : '#065F46', color: '#fff', padding: '10px 16px', borderRadius: 10, marginBottom: 16, fontSize: 13, fontWeight: 600 }}>{msg}</div>}

        {/* Create store form */}
        <div style={{ background: '#1a2840', borderRadius: 16, padding: 24, marginBottom: 30 }}>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 800, marginBottom: 16, fontFamily: "'Syne',sans-serif" }}> Nueva tienda</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Nombre de la tienda</label>
              <input value={form.name} onChange={e => { const v = e.target.value; setForm({ ...form, name: v, slug: v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }); }} placeholder="Ej: Mueblería Hernández" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,.1)', background: 'rgba(0,0,0,.2)', color: '#fff', fontSize: 13, outline: 'none' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Slug (URL)</label>
                <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="muebles-hernandez" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,.1)', background: 'rgba(0,0,0,.2)', color: '#fff', fontSize: 13, outline: 'none' }} />
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 4 }}>Se usará en las env vars del deploy</p>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>Contraseña admin</label>
                <input value={form.admin_password} onChange={e => setForm({ ...form, admin_password: e.target.value })} placeholder="admin123" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid rgba(255,255,255,.1)', background: 'rgba(0,0,0,.2)', color: '#fff', fontSize: 13, outline: 'none' }} />
              </div>
            </div>
            <button onClick={create} disabled={!form.name || !form.slug} style={{ padding: '12px', borderRadius: 10, background: '#FF4B2B', color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: "'Syne',sans-serif", marginTop: 4, opacity: !form.name || !form.slug ? 0.5 : 1 }}>
              + Crear tienda
            </button>
          </div>
        </div>

        {/* Stores list */}
        <div style={{ background: '#1a2840', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 800, marginBottom: 16, fontFamily: "'Syne',sans-serif" }}>
            Tiendas ({stores.length})
          </h2>
          {stores.length === 0 && <p style={{ color: 'rgba(255,255,255,.3)', fontSize: 13 }}>Todavía no hay tiendas. Creá la primera.</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stores.map(s => (
              <div key={s.id} style={{ background: 'rgba(0,0,0,.2)', borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                    {s.slug === '__main__' && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#FF4B2B', color: '#fff', fontWeight: 700 }}>PRINCIPAL</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
                    <span>slug: {s.slug}</span>
                    {s.custom_domain && <span>dominio: {s.custom_domain}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {s.slug !== '__main__' && (
                    <>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', padding: '4px 8px', background: 'rgba(255,255,255,.05)', borderRadius: 6 }}>
                        pass: {s.admin_password}
                      </span>
                      <button onClick={() => deleteStore(s.id, s.name)} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,.15)', color: '#EF4444', border: 'none', fontSize: 14, cursor: 'pointer' }}>🗑️</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginTop: 30, background: '#1a2840', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 800, marginBottom: 12, fontFamily: "'Syne',sans-serif" }}> Cómo crear el deploy del cliente</h2>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 2 }}>
            <p>1. Creá la tienda acá arriba ^</p>
            <p>2. Andá a <strong style={{ color: '#fff' }}>Vercel.com → Add New → Project</strong></p>
            <p>3. Elegí el mismo repo <strong style={{ color: '#fff' }}>vitrinear-store</strong></p>
            <p>4. En Environment Variables, agregá:</p>
            <div style={{ background: 'rgba(0,0,0,.3)', borderRadius: 8, padding: '12px 16px', margin: '8px 0', fontSize: 12, fontFamily: 'monospace' }}>
              <div>NEXT_PUBLIC_STORE_SLUG=<span style={{ color: '#FF4B2B' }}>[slug de acá]</span></div>
              <div>ADMIN_PASSWORD=<span style={{ color: '#FF4B2B' }}>[contraseña de acá]</span></div>
              <div>NEXT_PUBLIC_SUPABASE_URL=... (igual que el principal)</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=... (igual)</div>
              <div>SUPABASE_SERVICE_ROLE_KEY=... (igual)</div>
              <div>JWT_SECRET=... (igual)</div>
              <div>MERCADO_PAGO_ACCESS_TOKEN=test</div>
            </div>
            <p>5. Click <strong style={{ color: '#fff' }}>Deploy</strong> — y el cliente tiene su tienda propia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
