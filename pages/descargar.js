import { useState, useEffect } from "react";
import { supabasePublic } from "../lib/supabase";
import { STORE_SLUG } from "../lib/store";

const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || "Technolandsense";
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || "vitrinear-store";

export default function Descargar() {
  const [settings, setSettings] = useState({});
  const [release, setRelease] = useState(null);

  useEffect(() => {
    const sf = STORE_SLUG ? (t) => t.eq('store_slug', STORE_SLUG) : (t) => t;
    sf(supabasePublic.from('settings').select('*')).then(({ data }) => {
      const obj = {};
      (data || []).forEach(s => obj[s.key] = s.value);
      setSettings(obj);
    });
    fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`)
      .then(r => r.json())
      .then(d => setRelease(d.tag_name ? d : null))
      .catch(() => {});
  }, []);

  const storeName = settings?.store_name || "VitrineAR";
  const apkUrl = release?.assets?.[0]?.browser_download_url;

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", color: "var(--text)" }}>
      <style>{`body{margin:0;font-family:'Plus Jakarta Sans',sans-serif;background:#FAF8F4;color:#1C1C1C}:root{--navy:#0F1923;--coral:#FF4B2B;--cream:#FAF8F4}`}</style>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>📱</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "var(--navy)", marginBottom: 8 }}>
          App Android {storeName}
        </h1>
        <p style={{ color: "var(--mid)", fontSize: 14, lineHeight: 1.7, marginBottom: 30 }}>
          Descargá la app oficial y accedé a la tienda directamente desde tu celular.
          Comprá más rápido, recibí notificaciones y tené siempre la tienda a un toque.
        </p>

        {apkUrl ? (
          <a href={apkUrl} download
            style={{ display: "inline-block", padding: "14px 36px", background: "var(--coral)", color: "#fff", borderRadius: 12, fontWeight: 800, fontSize: 15, fontFamily: "'Syne',sans-serif", textDecoration: "none", boxShadow: "0 4px 20px rgba(255,75,43,.4)" }}>
            📲 Descargar APK
          </a>
        ) : (
          <div style={{ padding: "14px 36px", background: "var(--grey)", borderRadius: 12, color: "var(--mid)", fontWeight: 600, fontSize: 13 }}>
            ⏳ APK en preparación...
          </div>
        )}

        <div style={{ marginTop: 24, background: "#fff", borderRadius: 12, border: "1.5px solid var(--border)", padding: "16px 20px", textAlign: "left", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "var(--navy)", display: "block", marginBottom: 6 }}>📋 Instrucciones</strong>
          <ol style={{ margin: 0, paddingLeft: 20, color: "var(--mid)" }}>
            <li style={{ marginBottom: 5 }}>Descargá el archivo APK</li>
            <li style={{ marginBottom: 5 }}>En tu Android, abrí el archivo descargado</li>
            <li style={{ marginBottom: 5 }}>Si pide permisos, activá <strong>"Instalar apps desconocidas"</strong></li>
            <li>Listo — la app aparece en tu pantalla de inicio</li>
          </ol>
        </div>

        <div style={{ marginTop: 24, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "12px 16px", fontSize: 12, color: "#9A3412" }}>
          ⚠️ Podés tener la app y el navegador al mismo tiempo. La app es solo un acceso directo optimizado a la tienda web.
        </div>

        <div style={{ marginTop: 32 }}>
          <a href="/" style={{ color: "var(--coral)", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>← Volver a la tienda</a>
        </div>
      </div>
    </div>
  );
}
