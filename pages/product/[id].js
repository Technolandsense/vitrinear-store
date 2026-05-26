import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabasePublic } from '../../lib/supabase';

const fmt = (n) => "$ " + Number(n).toLocaleString("es-AR");
const disc = (p, o) => o ? Math.round((1 - p / o) * 100) : 0;

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [p, setP] = useState(null);
  const [related, setRelated] = useState([]);
  const [added, setAdded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const images = p?.image_urls?.filter(u => u) || [];

  useEffect(() => {
    if (!id) return;
    supabasePublic.from('products').select('*').eq('id', id).single().then(({ data }) => {
      setP(data);
      if (data) {
        supabasePublic.from('products').select('*').eq('category', data.category).neq('id', data.id).limit(4).then(({ data: rel }) => setRelated(rel || []));
      }
    });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const ex = cart.find(i => i.id === p.id);
    if (ex) {
      cart.forEach(i => { if (i.id === p.id) i.qty += 1; });
    } else {
      cart.push({ ...p, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!p) return <div style={{ minHeight: '100vh', background: '#FAF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#8A8A8A' }}>Cargando...</div>;

  const pct = disc(p.price, p.old_price);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4' }}>
      <div style={{ background: '#0F1923', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', color: 'rgba(255,255,255,.6)', fontSize: 13, fontWeight: 600 }}>← Volver a tienda</button>
        <span style={{ color: '#fff', fontWeight: 800, fontFamily: "'Syne',sans-serif", fontSize: 15 }}>Vitrine<span style={{ color: '#FF4B2B' }}>AR</span></span>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1.5px solid #E5E0D8' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 400 }}>
            {/* Image */}
            <div style={{ background: 'linear-gradient(135deg,#F2EEE8,#EDE9E0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, position: 'relative', padding: 20 }}>
              {images.length > 0 ? (
                <>
                  <img src={images[imgIdx]} alt={p.name} style={{ maxWidth: '90%', maxHeight: 300, objectFit: 'contain', borderRadius: 12 }} onError={e => e.target.style.display = 'none'} />
                  {images.length > 1 && (
                    <>
                      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                        {images.map((url, i) => (
                          <button key={i} onClick={() => setImgIdx(i)} style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', border: imgIdx === i ? '2px solid #FF4B2B' : '2px solid transparent', padding: 0 }}>
                            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                          </button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                        <button onClick={() => setImgIdx(i => Math.max(0, i - 1))} disabled={imgIdx === 0} style={{ padding: '4px 12px', borderRadius: 6, background: imgIdx === 0 ? '#E5E0D8' : '#0F1923', color: '#fff', fontSize: 12, fontWeight: 600 }}>← Anterior</button>
                        <button onClick={() => setImgIdx(i => Math.min(images.length - 1, i + 1))} disabled={imgIdx === images.length - 1} style={{ padding: '4px 12px', borderRadius: 6, background: imgIdx === images.length - 1 ? '#E5E0D8' : '#0F1923', color: '#fff', fontSize: 12, fontWeight: 600 }}>Siguiente →</button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <span style={{ fontSize: 100 }}>{p.image}</span>
              )}
              {p.tag && <span style={{ position: 'absolute', top: 14, left: 14, background: p.tag === 'Oferta' ? '#FF4B2B' : '#0F1923', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20 }}>{p.tag}</span>}
              {pct > 0 && <span style={{ position: 'absolute', top: 14, right: 14, background: '#16A34A', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>-{pct}%</span>}
            </div>

            {/* Info */}
            <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontSize: 11, color: '#FF4B2B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.category}</span>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F1923', fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>{p.name}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#F59E0B', fontSize: 14 }}>{'★'.repeat(Math.floor(p.rating))}{'☆'.repeat(5 - Math.floor(p.rating))}</span>
                <span style={{ color: '#8A8A8A', fontSize: 12 }}>{p.rating} ({p.reviews} reseñas)</span>
              </div>

              {p.description && <p style={{ color: '#5A5A5A', fontSize: 13, lineHeight: 1.7, marginTop: 4 }}>{p.description}</p>}

              <div style={{ marginTop: 'auto', paddingTop: 10 }}>
                {p.old_price && <span style={{ fontSize: 14, color: '#8A8A8A', textDecoration: 'line-through', display: 'block' }}>{fmt(p.old_price)}</span>}
                <span style={{ fontSize: 32, fontWeight: 800, color: '#FF4B2B', fontFamily: "'Syne',sans-serif" }}>{fmt(p.price)}</span>
              </div>

              <button onClick={addToCart} style={{ width: '100%', padding: 14, borderRadius: 12, background: added ? '#16A34A' : '#FF4B2B', color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: "'Syne',sans-serif", boxShadow: '0 4px 16px rgba(255,75,43,.4)', transition: 'all .2s' }}>
                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F1923', fontFamily: "'Syne',sans-serif", marginBottom: 16 }}>Productos relacionados</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
              {related.map(r => (
                <div key={r.id} onClick={() => router.push(`/product/${r.id}`)} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1.5px solid #E5E0D8', cursor: 'pointer' }}>
                  <div style={{ height: 120, background: '#F2EEE8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{r.image_urls?.[0] ? <img src={r.image_urls[0]} alt="" style={{ maxWidth: '80%', maxHeight: 100, objectFit: 'contain' }} onError={e => e.target.style.display = 'none'} /> : r.image}</div>
                  <div style={{ padding: 12 }}>
                    <p style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{r.name}</p>
                    <p style={{ fontWeight: 800, fontSize: 15, color: '#FF4B2B', fontFamily: "'Syne',sans-serif", marginTop: 6 }}>{fmt(r.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}