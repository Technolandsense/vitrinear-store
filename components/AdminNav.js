import { useRouter } from 'next/router';

export default function AdminNav() {
  const router = useRouter();
  const links = [
    { path: '/admin', label: '📋 Pedidos' },
    { path: '/admin/products', label: '📦 Productos' },
    { path: '/admin/categories', label: '🏷️ Categorías' },
    { path: '/admin/settings', label: '⚙️ Config' },
  ];

  return (
    <div style={{ background: '#0F1923', padding: '0 20px', display: 'flex', alignItems: 'center', height: 56, gap: 4 }}>
      <span style={{ color: '#fff', fontWeight: 800, fontFamily: "'Syne',sans-serif", fontSize: 16, marginRight: 20 }}>
        Vitrine<span style={{ color: '#FF4B2B' }}>AR</span>
        <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 10, marginLeft: 8 }}>ADMIN</span>
      </span>
      {links.map(l => (
        <button key={l.path} onClick={() => router.push(l.path)}
          style={{ padding: '8px 14px', borderRadius: 8, background: router.pathname === l.path ? 'rgba(255,255,255,.12)' : 'transparent', color: router.pathname === l.path ? '#fff' : 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: 12, transition: 'all .2s' }}>
          {l.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/admin'); }} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,75,43,.3)', color: '#FF4B2B', fontSize: 11, background: 'none' }}>🚪 Salir</button>
      <button onClick={() => router.push('/')} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.5)', fontSize: 11, background: 'none' }}>← Tienda</button>
    </div>
  );
}
