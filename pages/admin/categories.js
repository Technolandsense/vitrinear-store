import { useState, useEffect } from 'react';
import { supabasePublic } from '../../lib/supabase';
import AdminNav from '../../components/AdminNav';

export default function AdminCategories() {
  const [cats, setCats] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    supabasePublic.from('categories').select('*').order('sort_order').then(({ data }) => setCats(data || []));
  }, []);

  const add = async () => {
    if (!newName.trim()) return;
    await supabasePublic.from('categories').insert([{ name: newName.trim(), sort_order: cats.length + 1 }]);
    setNewName('');
    const { data } = await supabasePublic.from('categories').select('*').order('sort_order');
    setCats(data || []);
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar categoría?')) return;
    await supabasePublic.from('categories').delete().eq('id', id);
    const { data } = await supabasePublic.from('categories').select('*').order('sort_order');
    setCats(data || []);
  };

  const rename = async (id, name) => {
    await supabasePublic.from('categories').update({ name }).eq('id', id);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4' }}>
      <AdminNav />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '30px 20px' }}>
        <h1 style={{ color: '#0F1923', fontFamily: "'Syne',sans-serif", marginBottom: 24 }}>🏷️ Categorías</h1>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nueva categoría..." style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: '1.5px solid #E5E0D8', fontSize: 13 }} onKeyDown={e => e.key === 'Enter' && add()} />
          <button onClick={add} disabled={!newName.trim()} style={{ padding: '10px 20px', background: '#FF4B2B', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: 13, opacity: !newName.trim() ? 0.5 : 1 }}>Agregar</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cats.map(c => (
            <div key={c.id} style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1.5px solid #E5E0D8', display: 'flex', alignItems: 'center', gap: 10 }}>
              <input value={c.name} onChange={e => {
                const updated = cats.map(cat => cat.id === c.id ? { ...cat, name: e.target.value } : cat);
                setCats(updated);
              }} onBlur={() => rename(c.id, c.name)} style={{ flex: 1, fontWeight: 700, fontSize: 14, border: 'none', outline: 'none', padding: '4px 8px', borderRadius: 6, background: '#FAF8F4' }} />
              <button onClick={() => remove(c.id)} style={{ background: 'none', color: '#EF4444', fontSize: 16 }}>🗑️</button>
            </div>
          ))}
          {cats.length === 0 && <p style={{ color: '#8A8A8A', fontSize: 13, textAlign: 'center', padding: 30 }}>No hay categorías. Agregá la primera.</p>}
        </div>
      </div>
    </div>
  );
}
