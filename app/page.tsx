"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const T = {
  bg: "#0A0A0A", surface: "#111111", surface2: "#181818",
  border: "rgba(255,255,255,0.07)", gold: "#C8A96E",
  textPri: "#FFFFFF", textSec: "rgba(255,255,255,0.5)",
  textTer: "rgba(255,255,255,0.25)",
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder"
  );
}

export default function Home() {
  const [brands, setBrands] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const supabase = getSupabase();
    supabase.from("Brands").select("*").then(({ data }) => {
      if (data) setBrands(data);
      setLoading(false);
    });
  }, []);

  if (!mounted) return null;

  const openBrand = async (brandName: string) => {
    setSelected(brandName);
    const supabase = getSupabase();
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
    <main style={{ background: T.bg, minHeight: "100vh", direction: "rtl
