"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<null | {
    title: string;
    imageTitle?: string;
    src: string;
    alt?: string;
    titleNote?: string;
    imageNote?: string;
    igUrl?: string;
  }>(null);

  return (
    <section className="pb-10">
      <div className="container-neaw">
        <div className="grid gap-4 md:gap-5">
          {items.map((t, idx) => (
            <div key={t.id} className={`card-neaw card-neaw-variant-${(idx % 3) + 1} px-4 py-4 md:px-6 md:py-5`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight title-neaw">{t.title}</h2>
                  {t.note ? (
                    <>
                      <p
                        className={`mt-2 text-sm md:text-base ${expandedNotes[t.id] ? "" : "note-clamp"}`}
                        style={{ color: "var(--muted)" }}
                      >
                        {t.note}
                      </p>
                      <button
                        type="button"
                        className="mt-2 link-neaw text-xs md:hidden"
                        onClick={() => setExpandedNotes((s) => ({ ...s, [t.id]: !s[t.id] }))}
                      >
                        {expandedNotes[t.id] ? "Хураах" : "Дэлгэрэнгүй"}
                      </button>
                    </>
                  ) : null}
                </div>
                <div className="text-xs md:text-sm" style={{ color: "var(--muted)" }}>
                  {t.images.length} зураг
                </div>
              </div>

              <div
                className={
                  t.images.length === 1
                    ? "mt-4 grid grid-cols-1 place-items-center gap-3"
                    : "mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
                }
              >
                {t.images.map((img) => (
                  <div key={img.src} className={t.images.length === 1 ? "min-w-0 w-full max-w-sm" : "min-w-0"}>
                    <button
                      type="button"
                      className="relative overflow-hidden rounded-2xl border w-full"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() =>
                        setOpen({
                          title: t.title,
                          imageTitle: img.title,
                          src: img.src,
                          alt: img.alt ?? t.title,
                          titleNote: t.note,
                          imageNote: img.note,
                          igUrl: img.igUrl,
                        })
                      }
                    >
                      <Image
                        src={img.src}
                        alt={img.alt ?? t.title}
                        width={900}
                        height={600}
                        unoptimized
                        className="h-40 md:h-48 w-full object-cover"
                        sizes="(min-width: 768px) 33vw, 50vw"
                      />
                    </button>

                    {img.title ? (
                      <div className="mt-2 text-xs md:text-sm font-medium">{img.title}</div>
                    ) : null}

                    {img.note ? (
                      <div className="mt-2 text-xs md:text-sm" style={{ color: "var(--muted)" }}>
                        {img.note}
                      </div>
                    ) : null}

                    {img.igUrl ? (
                      <a
                        className="mt-1 inline-block link-neaw text-xs md:text-sm"
                        href={img.igUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Instagram reel
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          style={{ background: "rgba(10, 14, 20, 0.55)" }}
          onClick={() => setOpen(null)}
        >
          <div className="w-full max-w-3xl card-neaw p-4 md:p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs md:text-sm" style={{ color: "var(--muted)" }}>
                  {open.title}
                </div>
                {open.imageTitle ? <div className="mt-1 text-sm md:text-base font-medium">{open.imageTitle}</div> : null}
                {open.titleNote ? (
                  <div className="mt-1 text-sm md:text-base" style={{ color: "var(--muted)" }}>
                    {open.titleNote}
                  </div>
                ) : null}
                {open.imageNote ? (
                  <div className="mt-2 text-sm md:text-base" style={{ color: "var(--muted)" }}>
                    {open.imageNote}
                  </div>
                ) : null}
              </div>
              <button type="button" className="btn-neaw text-sm" onClick={() => setOpen(null)}>
                Хаах
              </button>
            </div>

            {open.igUrl ? (
              <div className="mt-3">
                <a className="btn-neaw text-sm inline-flex items-center justify-center" href={open.igUrl} target="_blank" rel="noreferrer">
                  Instagram reel нээх
                </a>
              </div>
            ) : null}

            <div className="mt-4 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
              <div className="relative w-full h-[70vh]">
                <Image
                  src={open.src}
                  alt={open.alt ?? open.title}
                  fill
                  sizes="100vw"
                  unoptimized
                  className="object-contain bg-white/40"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
