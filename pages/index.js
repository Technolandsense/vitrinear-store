import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabasePublic } from "../lib/supabase";

const FontLoader = () => (
  <style dangerouslySetInnerHTML={{__html:`
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --navy:#0F1923;--coral:#FF4B2B;--cream:#FAF8F4;
      --grey:#F2EEE8;--mid:#8A8A8A;--text:#1C1C1C;--border:#E5E0D8;
    }
    body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--cream);color:var(--text)}
    h1,h2,h3,h4,h5{font-family:'Syne',sans-serif}
    button{cursor:pointer;border:none;outline:none;font-family:'Plus Jakarta Sans',sans-serif}
    input,select{font-family:'Plus Jakarta Sans',sans-serif}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-thumb{background:var(--coral);border-radius:2px}
    @keyframes slideIn{from{transform:translateX(100%)}to{transform:none}}
    @keyframes popIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
    @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  `}}></style>
);

const fmt = (n) => "$ " + n.toLocaleString("es-AR");
const disc = (p,o) => o ? Math.round((1-p/o)*100) : 0;

function Stars({r}){
  return <span style={{color:"#F59E0B",fontSize:12}}>{"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}<span style={{color:"var(--mid)",marginLeft:4,fontSize:11}}>{r}</span></span>;
}

function ProductCard({p,onAdd}){
  const [hover,setHover]=useState(false);
  const router = useRouter();
  const pct=disc(p.price,p.old_price);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{background:"#fff",borderRadius:16,overflow:"hidden",border:`1.5px solid ${hover?"var(--coral)":"var(--border)"}`,transition:"all .25s ease",transform:hover?"translateY(-4px)":"none",boxShadow:hover?"0 12px 32px rgba(255,75,43,.15)":"0 2px 8px rgba(0,0,0,.06)",display:"flex",flexDirection:"column",cursor:"pointer"}} onClick={() => router.push(`/product/${p.id}`)}>
      <div style={{background:"linear-gradient(135deg,var(--grey) 0%,#EDE9E0 100%)",height:160,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64,position:"relative"}}>
        {p.tag&&<span style={{position:"absolute",top:10,left:10,background:p.tag==="Oferta"?"var(--coral)":"var(--navy)",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20,fontFamily:"'Syne',sans-serif"}}>{p.tag}</span>}
        {pct>0&&<span style={{position:"absolute",top:10,right:10,background:"#16A34A",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:20}}>-{pct}%</span>}
        {p.image_urls?.[0] ? <img src={p.image_urls[0]} alt={p.name} style={{maxWidth:"80%",maxHeight:130,objectFit:"contain",borderRadius:8}} onError={e=>e.target.style.display="none"} /> : p.image}
      </div>
      <div style={{padding:"14px 14px 10px",flex:1,display:"flex",flexDirection:"column",gap:5}}>
        <span style={{fontSize:10,color:"var(--coral)",fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{p.category}</span>
        <h3 style={{fontSize:13,fontWeight:700,lineHeight:1.35,color:"var(--text)"}}>{p.name}</h3>
        <div style={{display:"flex",alignItems:"center",gap:4}}><Stars r={p.rating}/><span style={{fontSize:10,color:"var(--mid)"}}>({p.reviews})</span></div>
        <div style={{marginTop:"auto",paddingTop:6}}>
          {p.old_price&&<span style={{fontSize:11,color:"var(--mid)",textDecoration:"line-through",display:"block"}}>{fmt(p.old_price)}</span>}
          <span style={{fontSize:18,fontWeight:800,color:"var(--navy)",fontFamily:"'Syne',sans-serif"}}>{fmt(p.price)}</span>
        </div>
      </div>
      <button onClick={()=>onAdd(p)} style={{margin:"0 14px 14px",padding:"9px",borderRadius:10,background:hover?"var(--coral)":"var(--navy)",color:"#fff",fontWeight:700,fontSize:12,transition:"background .2s"}}>+ Agregar al carrito</button>
    </div>
  );
}

function CartDrawer({cart,onClose,onRemove,onQty,onCheckout}){
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count=cart.reduce((s,i)=>s+i.qty,0);
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex"}}>
      <div onClick={onClose} style={{flex:1,background:"rgba(15,25,35,.5)",backdropFilter:"blur(4px)"}}/>
      <div style={{width:400,maxWidth:"95vw",background:"#fff",height:"100vh",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(0,0,0,.2)",animation:"slideIn .3s ease"}}>
        <div style={{padding:"18px 22px",background:"var(--navy)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><h2 style={{color:"#fff",fontSize:18}}>🛒 Carrito</h2><p style={{color:"rgba(255,255,255,.6)",fontSize:11,marginTop:2}}>{count} producto{count!==1?"s":""}</p></div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",color:"#fff",width:34,height:34,borderRadius:"50%",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 22px",display:"flex",flexDirection:"column",gap:10}}>
          {cart.length===0&&<div style={{textAlign:"center",padding:"60px 0",color:"var(--mid)"}}>
            <div style={{fontSize:48}}>🛍️</div>
            <p style={{marginTop:10,fontWeight:500}}>Tu carrito está vacío</p>
            <button onClick={onClose} style={{marginTop:14,background:"var(--coral)",color:"#fff",padding:"9px 22px",borderRadius:10,fontWeight:700,fontSize:13}}>Seguir comprando</button>
          </div>}
          {cart.map(item=>(
            <div key={item.id} style={{display:"flex",gap:10,padding:"10px",borderRadius:12,border:"1px solid var(--border)",background:"var(--cream)"}}>
              <div style={{width:50,height:50,borderRadius:10,background:"var(--grey)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,overflow:"hidden"}}>{item.image_urls?.[0] ? <img src={item.image_urls[0]} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"} /> : item.image}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:12,fontWeight:600,lineHeight:1.3}}>{item.name}</p>
                <p style={{fontSize:13,fontWeight:800,color:"var(--coral)",marginTop:3,fontFamily:"'Syne',sans-serif"}}>{fmt(item.price)}</p>
                <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5}}>
                  <button onClick={()=>onQty(item.id,-1)} style={{width:22,height:22,borderRadius:6,background:"var(--border)",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>−</button>
                  <span style={{fontWeight:700,fontSize:13,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>onQty(item.id,1)} style={{width:22,height:22,borderRadius:6,background:"var(--navy)",color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
                  <button onClick={()=>onRemove(item.id)} style={{marginLeft:"auto",color:"#EF4444",background:"none",fontSize:16}}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0&&<div style={{padding:"18px 22px",borderTop:"1px solid var(--border)",background:"var(--cream)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <span style={{fontWeight:600,color:"var(--mid)"}}>Total</span>
            <span style={{fontWeight:800,fontSize:20,fontFamily:"'Syne',sans-serif",color:"var(--navy)"}}>{fmt(total)}</span>
          </div>
          <button onClick={onCheckout} style={{width:"100%",padding:"13px",background:"var(--coral)",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif",boxShadow:"0 4px 16px rgba(255,75,43,.4)"}}>Finalizar compra →</button>
          <button onClick={onClose} style={{width:"100%",marginTop:6,padding:"10px",background:"none",color:"var(--mid)",fontWeight:600,fontSize:12}}>← Seguir comprando</button>
        </div>}
      </div>
    </div>
  );
}

function CheckoutModal({cart,onClose,onSuccess,settings}){
  const [step,setStep]=useState(1);
  const [method,setMethod]=useState("");
  const [form,setForm]=useState({nombre:"",email:"",tel:"",dir:""});
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const count=cart.reduce((s,i)=>s+i.qty,0);
  const METHODS=[
    {id:"transfer",icon:"🏦",label:"Transferencia bancaria",sub:"CBU/Alias — acreditación inmediata",color:"#16A34A"},
    {id:"debit",icon:"💳",label:"Tarjeta de débito",sub:"Débito instantáneo via Mercado Pago",color:"var(--navy)"},
    {id:"credit",icon:"💎",label:"Tarjeta de crédito",sub:"Hasta 12 cuotas sin interés",color:"var(--coral)"},
  ];
  const allFilled=form.nombre&&form.email&&form.tel&&form.dir;
  const handlePay=()=>method==="transfer"?setStep(3):setStep(4);
  const orderNum=`VIT-${Math.floor(Math.random()*90000)+10000}`;

  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(15,25,35,.75)",backdropFilter:"blur(6px)",padding:16}}>
      <div style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,.3)",animation:"popIn .3s ease"}}>
        <div style={{padding:"18px 26px",background:"var(--navy)",borderRadius:"20px 20px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h2 style={{color:"#fff",fontSize:17}}>{step===1?"👤 Datos de envío":step===2?"💳 Método de pago":step===3?"🏦 Datos de transferencia":step===4?"📱 Pago digital":"🎉 ¡Pedido confirmado!"}</h2>
            {step<=2&&<div style={{display:"flex",gap:6,marginTop:8}}>{[1,2].map(s=><div key={s} style={{width:s===step?28:7,height:7,borderRadius:4,transition:"all .3s",background:s<=step?"var(--coral)":"rgba(255,255,255,.2)"}}/>)}</div>}
          </div>
          <button onClick={onClose} style={{color:"rgba(255,255,255,.7)",background:"rgba(255,255,255,.1)",width:34,height:34,borderRadius:"50%",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        <div style={{padding:"22px 26px"}}>
          {step===1&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
            <p style={{color:"var(--mid)",fontSize:13,marginBottom:2}}>Completá tus datos para coordinar la entrega</p>
            {[{k:"nombre",label:"Nombre y apellido",ph:"Juan García",type:"text"},{k:"email",label:"Email",ph:"tu@email.com",type:"email"},{k:"tel",label:"Teléfono / WhatsApp",ph:settings?.whatsapp||"+54 9 351 000-0000",type:"tel"},{k:"dir",label:"Dirección de entrega",ph:"Av. Colón 1234, Córdoba",type:"text"}].map(f=>(
              <div key={f.k}>
                <label style={{fontSize:11,fontWeight:700,color:"var(--navy)",display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:.5}}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                  style={{width:"100%",padding:"11px 13px",borderRadius:10,border:"1.5px solid var(--border)",fontSize:13,outline:"none"}}
                  onFocus={e=>e.target.style.borderColor="var(--coral)"} onBlur={e=>e.target.style.borderColor="var(--border)"}/>
              </div>
            ))}
            <button disabled={!allFilled} onClick={()=>setStep(2)} style={{padding:"13px",background:"var(--coral)",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif",marginTop:4,opacity:!allFilled?.5:1,boxShadow:"0 4px 16px rgba(255,75,43,.35)",cursor:!allFilled?"not-allowed":"pointer"}}>Continuar →</button>
          </div>}

          {step===2&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:"var(--grey)",borderRadius:12,padding:"12px 16px",display:"flex",justifyContent:"space-between"}}>
              <span style={{color:"var(--mid)",fontSize:13}}>{count} producto{count!==1?"s":""}</span>
              <span style={{fontWeight:800,fontSize:17,fontFamily:"'Syne',sans-serif",color:"var(--navy)"}}>{fmt(total)}</span>
            </div>
            {METHODS.map(m=>(
              <div key={m.id} onClick={()=>setMethod(m.id)} style={{padding:"14px",borderRadius:12,border:`2px solid ${method===m.id?m.color:"var(--border)"}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,background:method===m.id?"rgba(255,75,43,.03)":"#fff",transition:"all .2s"}}>
                <span style={{fontSize:26}}>{m.icon}</span>
                <div style={{flex:1}}><p style={{fontWeight:700,fontSize:13}}>{m.label}</p><p style={{color:"var(--mid)",fontSize:11,marginTop:2}}>{m.sub}</p></div>
                <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${method===m.id?m.color:"var(--border)"}`,background:method===m.id?m.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {method===m.id&&<div style={{width:7,height:7,borderRadius:"50%",background:"#fff"}}/>}
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:2}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:"12px",borderRadius:12,border:"1.5px solid var(--border)",fontWeight:600,fontSize:13,color:"var(--mid)",background:"#fff"}}>← Volver</button>
              <button disabled={!method} onClick={handlePay} style={{flex:2,padding:"12px",background:"var(--coral)",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif",opacity:!method?.5:1,cursor:!method?"not-allowed":"pointer",boxShadow:"0 4px 14px rgba(255,75,43,.35)"}}>Pagar {fmt(total)}</button>
            </div>
          </div>}

          {step===3&&<div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:"#F0FDF4",border:"1px solid #86EFAC",borderRadius:12,padding:"12px 14px"}}>
              <p style={{fontWeight:700,color:"#15803D",fontSize:13}}>✅ Pedido registrado #{orderNum}</p>
              <p style={{color:"#166534",fontSize:12,marginTop:3}}>Realizá la transferencia y enviá el comprobante al WhatsApp</p>
            </div>
            <div style={{background:"var(--grey)",borderRadius:12,padding:"16px"}}>
              <h3 style={{fontSize:13,fontWeight:800,marginBottom:10,color:"var(--navy)"}}>🏦 Datos bancarios</h3>
              {[["Titular",settings?.bank_titular||"VitrineAR S.A.S."],["CUIT",settings?.bank_cuit||"30-12345678-9"],["CBU",settings?.bank_cbu||"0000000000000000000000"],["Alias",settings?.bank_alias||"VITRINE.AR.PAGOS"],["Banco",settings?.bank_banco||"Banco Galicia"],["Monto exacto",fmt(total)]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid var(--border)",fontSize:13}}>
                  <span style={{color:"var(--mid)",fontWeight:500}}>{k}</span>
                  <span style={{fontWeight:700,color:k==="Monto exacto"?"var(--coral)":"var(--text)"}}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{background:"#FFF7ED",border:"1px solid #FED7AA",borderRadius:12,padding:"12px 14px"}}>
              <p style={{fontWeight:700,color:"#C2410C",fontSize:12}}>📸 Enviá el comprobante por WhatsApp: {settings?.whatsapp||"+54 9 351 000-0000"}</p>
              <p style={{color:"#9A3412",fontSize:11,marginTop:3}}>o a {settings?.email_pagos||"pagos@vitrinear.com.ar"} — incluí tu nombre y el N° {orderNum}</p>
            </div>
            <button onClick={()=>setStep(5)} style={{padding:"13px",background:"var(--navy)",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif"}}>✓ Ya realicé la transferencia</button>
          </div>}

          {step===4&&<div style={{display:"flex",flexDirection:"column",gap:14,textAlign:"center"}}>
            <div style={{fontSize:56,marginBottom:4}}>💳</div>
            <h3 style={{fontSize:17,fontWeight:800,color:"var(--navy)"}}>Pago con Mercado Pago</h3>
            <p style={{color:"var(--mid)",fontSize:13}}>Serás redirigido al checkout seguro de Mercado Pago para pagar <strong>{fmt(total)}</strong></p>
            <div style={{background:"#FFF7F5",border:"1px solid #FED7CC",borderRadius:12,padding:12}}>
              <p style={{fontSize:11,color:"#9A3412",fontWeight:600}}>⚙️ Activá este botón conectando tu cuenta en mercadopago.com.ar/developers</p>
            </div>
            <button onClick={()=>setStep(5)} style={{padding:"13px",background:"#009EE3",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif",boxShadow:"0 4px 14px rgba(0,158,227,.4)"}}>Ir a Mercado Pago →</button>
            <button onClick={()=>setStep(2)} style={{padding:"10px",background:"none",color:"var(--mid)",fontWeight:600,fontSize:12}}>← Cambiar método</button>
          </div>}

          {step===5&&<div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{fontSize:64,marginBottom:14}}>🎉</div>
            <h2 style={{fontSize:20,fontWeight:800,color:"var(--navy)",marginBottom:8}}>¡Gracias por tu compra!</h2>
            <p style={{color:"var(--mid)",fontSize:13,lineHeight:1.7}}>Confirmación a <strong>{form.email}</strong>.<br/>Nos contactamos para coordinar la entrega.</p>
            <div style={{background:"var(--grey)",borderRadius:12,padding:14,margin:"18px 0",display:"flex",justifyContent:"space-between"}}>
              <span style={{color:"var(--mid)",fontWeight:500,fontSize:13}}>N° de pedido</span>
              <span style={{fontWeight:800,color:"var(--coral)",fontFamily:"'Syne',sans-serif"}}>#{orderNum}</span>
            </div>
            <button onClick={onSuccess} style={{padding:"13px 30px",background:"var(--coral)",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif",boxShadow:"0 4px 14px rgba(255,75,43,.35)"}}>Volver a la tienda</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default function VitrineAR(){
  const [cat,setCat]=useState("Todos");
  const [search,setSearch]=useState("");
  const [cart,setCart]=useState([]);
  const [showCart,setShowCart]=useState(false);
  const [showCheckout,setShowCheckout]=useState(false);
  const [sort,setSort]=useState("def");
  const [toast,setToast]=useState(null);
  const [products,setProducts]=useState([]);
  const [settings,setSettings]=useState({});
  const [categories,setCategories]=useState([]);

  useEffect(() => {
    Promise.all([
      supabasePublic.from('products').select('*').eq('active', true).order('id'),
      supabasePublic.from('settings').select('*'),
      supabasePublic.from('categories').select('*').order('sort_order')
    ]).then(([prodRes, setRes, catRes]) => {
      setProducts(prodRes.data || []);
      const obj = {};
      (setRes.data || []).forEach(s => obj[s.key] = s.value);
      setSettings(obj);
      setCategories(catRes.data || []);
    });
  }, []);

  const cartCount=cart.reduce((s,i)=>s+i.qty,0);

  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),2500);};

  const addToCart=(p)=>{
    setCart(prev=>{
      const ex=prev.find(i=>i.id===p.id);
      if(ex)return prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i);
      return [...prev,{...p,qty:1}];
    });
    showToast(`✓ "${p.name}" agregado`);
  };

  const removeFromCart=(id)=>setCart(prev=>prev.filter(i=>i.id!==id));
  const changeQty=(id,delta)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+delta)}:i));

  const filtered=products
    .filter(p=>(cat==="Todos"||p.category===cat)&&p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{if(sort==="asc")return a.price-b.price;if(sort==="desc")return b.price-a.price;if(sort==="rating")return b.rating-a.rating;return 0;});

  return (
    <div style={{minHeight:"100vh",background:"var(--cream)"}}>
      <FontLoader/>

      {toast&&<div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:9999,background:"var(--navy)",color:"#fff",padding:"10px 18px",borderRadius:12,fontSize:12,fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,.3)",animation:"fadeUp .3s ease",whiteSpace:"nowrap"}}>{toast}</div>}

      {/* HEADER */}
      <header style={{background:"var(--navy)",position:"sticky",top:0,zIndex:500,boxShadow:"0 2px 20px rgba(0,0,0,.3)"}}>
        <div style={{background:"var(--coral)",padding:"5px 20px",textAlign:"center"}}>
          <p style={{color:"#fff",fontSize:11,fontWeight:600}}>🚚 Envío gratis en compras mayores a $50.000 · Córdoba capital</p>
        </div>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",gap:14,height:62}}>
          <div style={{flexShrink:0}}>
            <h1 style={{color:"#fff",fontSize:20,fontWeight:800,letterSpacing:-.5,fontFamily:"'Syne',sans-serif"}}>{settings?.store_name||"Vitrine"}<span style={{color:"var(--coral)"}}>AR</span></h1>
            <p style={{color:"rgba(255,255,255,.35)",fontSize:8,letterSpacing:2,textTransform:"uppercase",marginTop:-2}}>{settings?.store_slogan||"Tu tienda online"}</p>
          </div>
          <div style={{flex:1,position:"relative",maxWidth:440}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
            <input placeholder="Buscar productos..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:"100%",padding:"9px 12px 9px 36px",borderRadius:10,border:"none",background:"rgba(255,255,255,.1)",color:"#fff",fontSize:13,outline:"none"}}/>
          </div>
          <button onClick={()=>setShowCart(true)} style={{display:"flex",alignItems:"center",gap:8,background:"var(--coral)",color:"#fff",padding:"9px 16px",borderRadius:10,fontWeight:700,fontSize:13,flexShrink:0,boxShadow:"0 2px 10px rgba(255,75,43,.4)"}}>
            🛒{cartCount>0&&<span style={{background:"#fff",color:"var(--coral)",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section style={{background:"linear-gradient(135deg,var(--navy) 0%,#1a2840 60%,#0d2035 100%)",padding:"56px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:280,height:280,borderRadius:"50%",background:"rgba(255,75,43,.07)"}}/>
        <div style={{position:"absolute",bottom:-70,left:-70,width:360,height:360,borderRadius:"50%",background:"rgba(255,75,43,.05)"}}/>
        <div style={{maxWidth:640,margin:"0 auto",position:"relative"}}>
          <span style={{background:"var(--coral)",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 14px",borderRadius:20,letterSpacing:1,textTransform:"uppercase",display:"inline-block",marginBottom:14}}>🔥 Ofertas especiales</span>
          <h2 style={{color:"#fff",fontSize:"clamp(26px,4.5vw,48px)",fontWeight:800,lineHeight:1.15,marginBottom:14}}>
            Todo lo que necesitás,<br/><span style={{color:"var(--coral)"}}>en un solo lugar</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:15,marginBottom:28,lineHeight:1.6}}>Electrónica, hogar, bazar y más — pago seguro, envío a Córdoba</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>setCat("Electrónica")} style={{padding:"12px 26px",background:"var(--coral)",color:"#fff",borderRadius:12,fontWeight:800,fontSize:14,fontFamily:"'Syne',sans-serif",boxShadow:"0 4px 18px rgba(255,75,43,.5)"}}>Ver electrónica →</button>
            <button onClick={()=>setCat("Todos")} style={{padding:"12px 26px",background:"rgba(255,255,255,.1)",color:"#fff",borderRadius:12,fontWeight:700,fontSize:14,border:"1.5px solid rgba(255,255,255,.2)"}}>Ver todo el catálogo</button>
          </div>
          <div style={{display:"flex",gap:28,justifyContent:"center",marginTop:36,flexWrap:"wrap"}}>
            {[["12+","Categorías"],["500+","Productos"],["⭐ 4.7","Calificación"],["🚚","Envío rápido"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <p style={{color:"var(--coral)",fontWeight:800,fontSize:18,fontFamily:"'Syne',sans-serif"}}>{n}</p>
                <p style={{color:"rgba(255,255,255,.45)",fontSize:11}}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <main style={{maxWidth:1100,margin:"0 auto",padding:"36px 20px"}}>
        <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {["Todos",...categories.map(c=>c.name)].map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:"7px 16px",borderRadius:30,fontWeight:700,fontSize:12,border:`1.5px solid ${cat===c?"var(--coral)":"var(--border)"}`,background:cat===c?"var(--coral)":"#fff",color:cat===c?"#fff":"var(--text)",transition:"all .2s"}}>{c}</button>
            ))}
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:"7px 12px",borderRadius:10,border:"1.5px solid var(--border)",fontSize:12,fontWeight:600,color:"var(--text)",background:"#fff",cursor:"pointer"}}>
            <option value="def">Ordenar por</option>
            <option value="asc">Menor precio</option>
            <option value="desc">Mayor precio</option>
            <option value="rating">Más valorados</option>
          </select>
        </div>
        <p style={{color:"var(--mid)",fontSize:12,marginBottom:18,fontWeight:500}}>{filtered.length} producto{filtered.length!==1?"s":""} encontrado{filtered.length!==1?"s":""}{cat!=="Todos"&&<span> en <strong style={{color:"var(--navy)"}}>{cat}</strong></span>}{search&&<span> para "<strong style={{color:"var(--coral)"}}>{search}</strong>"</span>}</p>

        {filtered.length===0
          ?<div style={{textAlign:"center",padding:"60px 0"}}><div style={{fontSize:56}}>🔍</div><h3 style={{marginTop:14,color:"var(--navy)"}}>Sin resultados</h3><button onClick={()=>{setSearch("");setCat("Todos")}} style={{marginTop:14,padding:"10px 22px",background:"var(--coral)",color:"#fff",borderRadius:10,fontWeight:700,fontSize:13}}>Ver todo</button></div>
          :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>{filtered.map(p=><ProductCard key={p.id} p={p} onAdd={addToCart}/>)}</div>
        }

        {/* Value props */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginTop:50}}>
          {[1,2,3,4].map(i => {
            const icon = settings[`prop${i}_icon`];
            const title = settings[`prop${i}_title`];
            const desc = settings[`prop${i}_desc`];
            if (!icon && !title && !desc) return null;
            return (
              <div key={i} style={{background:"#fff",borderRadius:14,padding:"18px",border:"1.5px solid var(--border)",display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:24}}>{icon || '📦'}</span>
                <div><p style={{fontWeight:700,fontSize:13,color:"var(--navy)"}}>{title || ''}</p><p style={{color:"var(--mid)",fontSize:11,marginTop:3}}>{desc || ''}</p></div>
              </div>
            );
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{background:"var(--navy)",color:"rgba(255,255,255,.55)",padding:"36px 20px 20px",marginTop:50}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",gap:36,flexWrap:"wrap",marginBottom:28}}>
            <div style={{flex:1,minWidth:180}}>
              <h3 style={{color:"#fff",fontSize:18,fontWeight:800,marginBottom:6}}>{settings?.store_name||"Vitrine"}<span style={{color:"var(--coral)"}}>AR</span></h3>
              <p style={{fontSize:12,lineHeight:1.7}}>Tu tienda online de confianza en Córdoba. Electrónica, hogar, bazar y más.</p>
            </div>
            <div>
              <p style={{color:"#fff",fontWeight:700,marginBottom:8,fontSize:12,textTransform:"uppercase",letterSpacing:.5}}>Pagos aceptados</p>
              {["💳 Débito y crédito","🏦 Transferencia bancaria","📱 Mercado Pago","📱 MODO / Ualá"].map(m=><p key={m} style={{fontSize:12,marginBottom:3}}>{m}</p>)}
            </div>
            <div>
              <p style={{color:"#fff",fontWeight:700,marginBottom:8,fontSize:12,textTransform:"uppercase",letterSpacing:.5}}>Contacto</p>
              <p style={{fontSize:12,marginBottom:3}}>📍 Córdoba, Argentina</p>
              <p style={{fontSize:12,marginBottom:3}}>📧 {settings?.email||"info@vitrinear.com.ar"}</p>
              <p style={{fontSize:12,marginBottom:3}}>💬 {settings?.whatsapp||"+54 9 351 000-0000"}</p>
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:16,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
            <p style={{fontSize:11}}>© 2025 {settings?.store_name||"VitrineAR"} · Córdoba, Argentina</p>
            <p style={{fontSize:11}}>Hecho con 🧡 para el comercio local</p>
          </div>
        </div>
      </footer>

      {showCart&&<CartDrawer cart={cart} onClose={()=>setShowCart(false)} onRemove={removeFromCart} onQty={changeQty} onCheckout={()=>{setShowCart(false);setShowCheckout(true);}}/>}
      {showCheckout&&<CheckoutModal cart={cart} onClose={()=>setShowCheckout(false)} onSuccess={()=>{setCart([]);setShowCheckout(false);}} settings={settings}/>}
    </div>
  );
}