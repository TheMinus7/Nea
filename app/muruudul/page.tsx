"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Dream = {
  ner: string;
  utas?: string | null;
  email: string;
  husel: string;
  zorilgo: string;
  tolovlogoo: string;
  biylelt: string;
  updatedAt?: string;
};

export default function MuruudulPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edit, setEdit] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dream, setDream] = useState<Dream>({ ner: "", utas: "", email: "", husel: "", zorilgo: "", tolovlogoo: "", biylelt: "" });

  const bgStyle = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(rgba(5,4,10,0.70), rgba(5,4,10,0.85)), url(https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    void fetch("/api/dream", { cache: "no-store" })
      .then(async (r) => {
        const data = (await r.json().catch(() => null)) as { dream?: Dream | null; error?: string } | null;
        if (!r.ok) {
          throw new Error(data?.error ?? "load_failed");
        }
        if (cancelled) return;
        if (data?.dream) {
          setDream({
            ner: data.dream.ner ?? "",
            utas: data.dream.utas ?? "",
            email: data.dream.email ?? "",
            husel: data.dream.husel ?? "",
            zorilgo: data.dream.zorilgo ?? "",
            tolovlogoo: data.dream.tolovlogoo ?? "",
            biylelt: data.dream.biylelt ?? "",
            updatedAt: data.dream.updatedAt,
          });
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(typeof e?.message === "string" ? e.message : "Ачааллахад алдаа гарлаа.");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      const r = await fetch("/api/dream", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ner: dream.ner,
          utas: dream.utas,
          email: dream.email,
          husel: dream.husel,
          zorilgo: dream.zorilgo,
          tolovlogoo: dream.tolovlogoo,
          biylelt: dream.biylelt,
        }),
      });

      if (!r.ok) {
        const data = (await r.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Хадгалах үед алдаа гарлаа.");
        return;
      }

      const data = (await r.json()) as { dream: Dream };
      setDream({
        ner: data.dream.ner ?? "",
        utas: data.dream.utas ?? "",
        email: data.dream.email ?? "",
        husel: data.dream.husel ?? "",
        zorilgo: data.dream.zorilgo ?? "",
        tolovlogoo: data.dream.tolovlogoo ?? "",
        biylelt: data.dream.biylelt ?? "",
        updatedAt: data.dream.updatedAt,
      });
      setEdit(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen py-10" style={bgStyle}>
      <div className="container-neaw">
        <div className="card-neaw px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Dream on
              </div>
              <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Ирээдүйн булан</h1>
              <br />
              <div>
                <h1>Дараах хэсгийн хүснэгт бүрт өөрийн хүссэнээ бичиж болох бөгөөд зөвхөн бичсэн хүн өөрөө л харах боломжтой юм.</h1>
                <h2>Хувь хүний нууцлалын бодлогын хүрээнд зөвхөн хэрэглэгчээс бусад ямар ч хүн харах боломжнүй бөгөөд бичсэн зүйлс хадгалагдах тул дараа нь харах эсвэл засварлах боломжтой.</h2>
                <br />
                <h1>Бичсэний дараа &ldquo;Хадгалах&rdquo; дараад &ldquo;Түгжих&rdquo; дарсанаар хадгалагдана</h1>
              </div>
              <div className="mt-2 text-sm md:text-base" style={{ color: "var(--muted)" }}>
                Хүсэл · Зорилго · Төлөвлөгөө · Биелэлт <br />Амжилт хүсье.
              </div>
            </div>
            <Link className="btn-neaw text-sm" href="/">
              Буцах
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {loading ? (
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Ачаалж байна...
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border px-4 py-3" style={{ borderColor: "var(--border)", background: "rgba(0,0,0,0.22)" }}>
                <div className="text-sm md:text-base" style={{ color: "var(--muted)" }}>
                  {error}
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Нэр
                </div>
                <input
                  className="btn-neaw text-sm md:text-base"
                  placeholder="Нэр"
                  style={{ width: "100%" }}
                  value={dream.ner}
                  onChange={(e) => setDream((d) => ({ ...d, ner: e.target.value }))}
                  disabled={!edit}
                />
              </label>

              <label className="grid gap-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Утасны дугаар (заавал биш)
                </div>
                <input
                  className="btn-neaw text-sm md:text-base"
                  type="tel"
                  placeholder="Утас"
                  style={{ width: "100%" }}
                  value={dream.utas ?? ""}
                  onChange={(e) => setDream((d) => ({ ...d, utas: e.target.value }))}
                  disabled={!edit}
                />
              </label>

              <label className="grid gap-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Email
                </div>
                <input
                  className="btn-neaw text-sm md:text-base"
                  type="email"
                  placeholder="Email"
                  style={{ width: "100%" }}
                  value={dream.email}
                  onChange={(e) => setDream((d) => ({ ...d, email: e.target.value }))}
                  disabled={!edit}
                />
              </label>

              <label className="grid gap-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Хүсэл
                </div>
                <textarea
                  className="btn-neaw text-sm md:text-base"
                  placeholder="Юуг хамгийн их хүсэж байна вэ?"
                  style={{ width: "100%", minHeight: 110, resize: "vertical" }}
                  value={dream.husel}
                  onChange={(e) => setDream((d) => ({ ...d, husel: e.target.value }))}
                  disabled={!edit}
                />
              </label>

              <label className="grid gap-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Зорилго
                </div>
                <textarea
                  className="btn-neaw text-sm md:text-base"
                  placeholder="Ямар зорилго тавьж байна вэ?"
                  style={{ width: "100%", minHeight: 110, resize: "vertical" }}
                  value={dream.zorilgo}
                  onChange={(e) => setDream((d) => ({ ...d, zorilgo: e.target.value }))}
                  disabled={!edit}
                />
              </label>

              <label className="grid gap-2 md:col-span-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Төлөвлөгөө
                </div>
                <textarea
                  className="btn-neaw text-sm md:text-base"
                  placeholder="Яаж хэрэгжүүлэх вэ? (алхам алхмаар)"
                  style={{ width: "100%", minHeight: 140, resize: "vertical" }}
                  value={dream.tolovlogoo}
                  onChange={(e) => setDream((d) => ({ ...d, tolovlogoo: e.target.value }))}
                  disabled={!edit}
                />
              </label>

              <label className="grid gap-2 md:col-span-2">
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  Биелэлт
                </div>
                <textarea
                  className="btn-neaw text-sm md:text-base"
                  placeholder="Одоогоор юуг нь хийж эхэлсэн бэ?"
                  style={{ width: "100%", minHeight: 140, resize: "vertical" }}
                  value={dream.biylelt}
                  onChange={(e) => setDream((d) => ({ ...d, biylelt: e.target.value }))}
                  disabled={!edit}
                />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" className="btn-neaw text-sm" onClick={save} disabled={saving || loading}>
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
              <button type="button" className="btn-neaw text-sm" onClick={() => setEdit((v) => !v)} disabled={loading}>
                {edit ? "Түгжих" : "Засах"}
              </button>
            </div>

            {dream.updatedAt ? (
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                Сүүлд шинэчилсэн: {new Date(dream.updatedAt).toLocaleString()}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
