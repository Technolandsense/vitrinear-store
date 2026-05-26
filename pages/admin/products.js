import { useState, useEffect } from 'react';
import { supabasePublic } from '../../lib/supabase';
import AdminNav from '../../components/AdminNav';
import { requireAdmin } from '../../lib/auth-check';
import { STORE_SLUG } from '../../lib/store';

export const getServerSideProps = requireAdmin;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', price: '', old_price: '', image: '📦', tag: '', rating: 4.5, reviews: 0, description: '', image_urls: [] });

  const load = async () => {
    const sf = STORE_SLUG ? (q) => q.eq('store_slug', STORE_SLUG) : (q) => q;
    const [prodRes, catRes] = await Promise.all([
      sf(supabasePublic.from('products').select('*')).order('id'),
      sf(supabasePublic.from('categories').select('*')).order('sort_order')
    ]);
    setProducts(prodRes.data || []);
    setCategories(catRes.data || []);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: '', category: categories[0]?.name || '', price: '', old_price: '', image: '📦', tag: '', rating: 4.5, reviews: 0, description: '', image_urls: [] });
    setEditId(null);
    setShowForm(false);
  };

  const openEdit = (p) => {
    setForm({ name: p.name, category: p.category, price: String(p.price), old_price: p.old_price ? String(p.old_price) : '', image: p.image, tag: p.tag, rating: p.rating, reviews: p.reviews, description: p.description || '', image_urls: p.image_urls || [] });
    setEditId(p.id);
    setShowForm(true);
  };

  const save = async () => {
    const urls = form.image_urls.filter(u => u);
    const payload = { ...form, price: Number(form.price), old_price: form.old_price ? Number(form.old_price) : null, rating: Number(form.rating), reviews: Number(form.reviews), image_urls: urls, image_url: urls[0] || '' };
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editId ? { id: editId, ...payload } : payload)
    });
    resetForm();
    load();
  };

  const uploadImage = async (file, idx) => {
    if (!file) return;
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${idx}.${ext}`;
    const { error } = await supabasePublic.storage.from('products').upload(fileName, file, { upsert: true });
    if (error) { alert('Error al subir: ' + error.message); return; }
    const { data: { publicUrl } } = supabasePublic.storage.from('products').getPublicUrl(fileName);
    const urls = [...form.image_urls];
    urls[idx] = publicUrl;
    setForm({ ...form, image_urls: urls });
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar producto?')) return;
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    load();
  };

  const toggleActive = async (id, current) => {
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !current })
    });
    load();
  };

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
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
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

              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>DESCRIPCIÓN DEL PRODUCTO</label>
              <textarea rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13, resize: 'vertical' }} />

              <label style={{ fontSize: 11, fontWeight: 700, color: '#0F1923', display: 'block', marginBottom: 4, marginTop: 12 }}>IMÁGENES DEL PRODUCTO (hasta 3)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[0, 1, 2].map(idx => (
                  <div key={idx} style={{ border: '1.5px solid #E5E0D8', borderRadius: 10, padding: 8, textAlign: 'center' }}>
                    {form.image_urls[idx] ? (
                      <div style={{ position: 'relative' }}>
                        <img src={form.image_urls[idx]} alt="" style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 6 }} />
                        <button onClick={() => { const u = [...form.image_urls]; u[idx] = ''; setForm({ ...form, image_urls: u }); }} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,.5)', color: '#fff', borderRadius: '50%', width: 20, height: 20, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                      </div>
                    ) : (
                      <div style={{ height: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#8A8A8A', fontSize: 11 }}>
                        <span style={{ fontSize: 22, marginBottom: 4 }}>📷</span>
                        Imagen {idx + 1}
                      </div>
                    )}
                    <input type="file" accept="image/*" style={{ width: '100%', fontSize: 10, marginTop: 4 }} onChange={e => uploadImage(e.target.files[0], idx)} />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 10, color: '#8A8A8A', marginTop: 4 }}>O pegá URLs directamente (una por línea)</p>
              <textarea rows="2" value={form.image_urls.join('\n')} onChange={e => setForm({ ...form, image_urls: e.target.value.split('\n').map(s => s.trim()).filter(s => s) })} placeholder="https://ejemplo.com/foto1.jpg" style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13, resize: 'vertical' }} />

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
