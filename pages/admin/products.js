import { useState, useEffect } from 'react';
import { supabasePublic } from '../../lib/supabase';
import AdminNav from '../../components/AdminNav';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Electrónica', price: '', old_price: '', image: '📦', tag: '', rating: 4.5, reviews: 0 });

  const load = async () => {
    const { data } = await supabasePublic.from('products').select('*').order('id');
    setProducts(data || []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', category: 'Electrónica', price: '', old_price: '', image: '📦', tag: '', rating: 4.5, reviews: 0 });
    setEditId(null);
    setShowForm(false);
  };

  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), old_price: p.old_price ? String(p.old_price) : '', image: p.image, tag: p.tag, rating: p.rating, reviews: p.reviews });
    setEditId(p.id);
    setShowForm(true);
  };

  const save = async () => {
    const payload = { ...form, price: Number(form.price), old_price: form.old_price ? Number(form.old_price) : null, rating: Number(form.rating), reviews: Number(form.reviews) };
    if (editId) {
      await supabasePublic.from('products').update(payload).eq('id', editId);
    } else {
      await supabasePublic.from('products').insert([payload]);
    }
    resetForm();
    load();
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar producto?')) return;
    await supabasePublic.from('products').delete().eq('id', id);
    load();
  };

  const toggleActive = async (id, current) => {
    await supabasePublic.from('products').update({ active: !current }).eq('id', id);
    load();
  };

  const CATEGORIES = ['Electrónica', 'Bazar', 'Hogar', 'Varios'];
  const EMOJIS = ['📺', '🎧', '❄️', '🍳', '🌀', '📱', '🥃', '☀️', '🌪️', '💡', '⌚', '🎒', '📦', '🔌', '🖥️', '⌨️', '🖨️', '📷', '🎮', '🔊'];

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4' }}>
      <AdminNav />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ color: '#0F1923', fontFamily: "'Syne',sans-serif" }}>📦 Productos ({products.length})</h1>
          <button onClick={() => { resetForm(); setShowForm(true); }} style={{ padding: '10px 20px', background: '#FF4B2B', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 13 }}>+ Nuevo producto</button>
        </div>

        {showForm && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,25,35,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ color: '#0F1923', fontFamily: "'Syne',sans-serif", fontSize: 18 }}>{editId ? 'Editar' : 'Nuevo'} producto</h2>
                <button onClick={resetForm} style={{ background: 'none', fontSize: 22, color: '#8A8A8A' }}>×</button>
              </div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>NOMBRE</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />

              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>CATEGORÍA</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>PRECIO ($)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>PRECIO ANTIGUO ($)</label>
                  <input type="number" value={form.old_price} onChange={e => setForm({ ...form, old_price: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
                </div>
              </div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>EMOJI / IMAGEN</label>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                {EMOJIS.map(e => (
                  <button key={e} type="button" onClick={() => setForm({ ...form, image: e })} style={{ fontSize: 22, padding: 4, borderRadius: 8, border: form.image === e ? '2px solid #FF4B2B' : '2px solid transparent', background: form.image === e ? '#FFF0ED' : 'none' }}>{e}</button>
                ))}
              </div>

              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>TAG (Oferta, Nuevo, o vacío)</label>
              <input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>RATING (0-5)</label>
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>RESEÑAS</label>
                  <input type="number" value={form.reviews} onChange={e => setForm({ ...form, reviews: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
                <button onClick={resetForm} style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontWeight: 600, fontSize: 13, background: '#fff', color: '#8A8A8A' }}>Cancelar</button>
                <button onClick={save} disabled={!form.name || !form.price} style={{ flex: 2, padding: '11px', borderRadius: 10, background: '#FF4B2B', color: '#fff', fontWeight: 700, fontSize: 13, opacity: !form.name || !form.price ? 0.5 : 1 }}>{editId ? 'Guardar cambios' : 'Crear producto'}</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {products.map(p => (
            <div key={p.id} style={{ background: '#fff', borderRadius: 14, padding: '14px 18px', border: '1.5px solid #E5E0D8', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#F2EEE8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{p.image}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                  {!p.active && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: '#FEF3C7', color: '#92400E', fontWeight: 700 }}>OCULTO</span>}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 12, color: '#8A8A8A' }}>
                  <span>{p.category}</span>
                  <span>$ {Number(p.price).toLocaleString('es-AR')}</span>
                  {p.old_price && <span style={{ textDecoration: 'line-through' }}>$ {Number(p.old_price).toLocaleString('es-AR')}</span>}
                  <span>★ {p.rating}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button onClick={() => toggleActive(p.id, p.active)} style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #E5E0D8', background: '#fff', fontSize: 14 }}>{p.active ? '🙈' : '👁️'}</button>
                <button onClick={() => openEdit(p)} style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #E5E0D8', background: '#fff', fontSize: 14 }}>✏️</button>
                <button onClick={() => remove(p.id)} style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #E5E0D8', background: '#fff', fontSize: 14 }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
