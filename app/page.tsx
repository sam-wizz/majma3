"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const T = {
  bg: "#0A0A0A", surface: "#111111", surface2: "#181818",
  border: "rgba(255,255,255,0.07)", gold: "#C8A96E",
  textPri: "#FFFFFF", textSec: "rgba(255,255,255,0.5)",
  textTer: "rgba(255,255,255,0.25)",
};

export default function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );

  const [brands, setBrands] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("Brands").select("*").then(({ data }) => {
      if (data) setBrands(data);
      setLoading(false);
    });
  }, []);

  const openBrand = async (brandName: string) => {
    setSelected(brandName);
    const { data } = await supabase.from("products").select("*").eq("brand_name", brandName);
    if (data) setProducts(data);
  };

  if (selected) {
    return (
      <main style={{ background: T.bg, minHeight: "100vh", direction: "rtl", fontFamily: "system-ui, sans-serif", padding: "60px 20px 40px" }}>
        <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: T.gold, fontSize: 14, cursor: "pointer", marginBottom: 24 }}>
          ← رجوع
        </button>
        <div style={{ fontSize: 22, fontWeight: 900, color: T.textPri, marginBottom: 24 }}>{selected}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {products.map((p, i) => (
            <div key={i} style={{ background: T.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${T.border}` }}>
              <div style={{ height: 130, background: "#161616", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                ) : (
                  <div style={{ color: T.textTer, fontSize: 12 }}>لا توجد صورة</div>
                )}
              </div>
              <div style={{ padding: "12px 12px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.textPri, marginBottom: 8 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: T.gold }}>{p.price}</span>
                  <button style={{ background: "rgba(200,169,110,0.2)", color: T.gold, border: "none", borderRadius: 9, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>اشتري</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: T.bg, minHeight: "100vh", direction: "rtl", fontFamily: "system-ui, sans-serif", padding: "60px 20px 40px" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 11, color: T.gold, letterSpacing: 3, marginBottom: 6 }}>السوق السعودي المحلي</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: T.gold, letterSpacing: -1 }}>مجـمـع</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>كل البراندات في مكان واحد</div>
      </div>

      {loading ? (
        <div style={{ color: T.textTer, textAlign: "center", marginTop: 60 }}>جاري التحميل...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {brands.map((b, i) => (
            <div key={i} onClick={() => openBrand(b.name)} style={{ background: T.surface, borderRadius: 22, overflow: "hidden", border: `1px solid ${T.border}`, cursor: "pointer" }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${T.gold}, transparent)` }}/>
              <div style={{ padding: "16px 14px 18px" }}>
                {b.logo_url ? (
                  <img src={b.logo_url} alt={b.name} style={{ width: 52, height: 52, borderRadius: 14, objectFit: "cover", marginBottom: 14, border: `1px solid ${T.border}` }}/>
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(200,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: T.gold, marginBottom: 14 }}>{b.name?.[0]}</div>
                )}
                <div style={{ fontSize: 13, fontWeight: 800, color: T.textPri, marginBottom: 2 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: T.gold, marginBottom: 4 }}>{b.name_ar}</div>
                <div style={{ fontSize: 10, color: T.textTer }}>{b.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
