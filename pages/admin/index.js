import { useState, useEffect } from 'react';
import AdminNav from '../../components/AdminNav';

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (d.authenticated) {
          setLogged(true);
          loadOrders();
        }
        setLoading(false);
      });
  }, []);

  const loadOrders = async () => {
    const r = await fetch('/api/admin/orders');
    const data = await r.json();
    setOrders(data || []);
  };

  const login = async () => {
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (r.ok) {
      setLogged(true);
      loadOrders();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const approveTransfer = async (id) => {
    await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'approved' })
    });
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'approved' } : o));
  };

  if (!logged) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF8F4' }}>
        <div style={{ background: '#fff', padding: 30, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,.1)', width: 320 }}>
          <h2 style={{ marginBottom: 20, color: '#0F1923' }}>Admin</h2>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #E5E0D8', marginBottom: 12 }}
          />
          <button onClick={login} style={{ width: '100%', padding: 12, background: '#FF4B2B', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700 }}>Entrar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4' }}>
      <AdminNav />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '30px 20px' }}>
      <h1 style={{ color: '#0F1923', marginBottom: 20 }}> Pedidos ({orders.length})</h1>
      <div style={{ display: 'grid', gap: 14 }}>
        {orders.map(order => (
          <div key={order.id} style={{ background: '#fff', padding: 18, borderRadius: 14, border: '1.5px solid #E5E0D8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, color: '#FF4B2B' }}>#{order.order_number}</span>
              <span style={{ 
                padding: '4px 10px', 
                borderRadius: 20, 
                fontSize: 11, 
                fontWeight: 700,
                background: order.status === 'paid' || order.status === 'approved' ? '#D1FAE5' : '#FEF3C7',
                color: order.status === 'paid' || order.status === 'approved' ? '#065F46' : '#92400E'
              }}>
                {order.status.replace('_', ' ')}
              </span>
            </div>
            <p style={{ margin: '8px 0', fontSize: 13 }}>{order.customer_name} — {order.customer_email}</p>
            <p style={{ margin: '6px 0', fontSize: 12, color: '#8A8A8A' }}>{order.customer_address}</p>
            <p style={{ fontWeight: 800, fontSize: 17, color: '#0F1923', marginTop: 10 }}>$ {order.total.toLocaleString('es-AR')}</p>
            <p style={{ fontSize: 12, color: '#8A8A8A', marginTop: 4 }}>Método: {order.payment_method === 'transfer' ? 'Transferencia' : 'Tarjeta'}</p>
            
            {order.payment_method === 'transfer' && order.status === 'pending_transfer' && (
              <button onClick={() => approveTransfer(order.id)} style={{ marginTop: 12, padding: 10, background: '#16A34A', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>
                Aprobar transferencia
              </button>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
