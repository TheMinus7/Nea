"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="pt-5 pb-3 md:pt-8 md:pb-4 relative z-50">
      <div className="container-neaw">
        <div className="card-neaw px-4 py-4 md:px-6 md:py-5 flex items-start md:items-center justify-between gap-3 md:gap-4">
          <div className="min-w-0">
            <div className="text-xs md:text-sm" style={{ color: "var(--muted)" }}>
              ArchNea🍀🥰
            </div>
            <h1 className="text-xl md:text-3xl font-semibold tracking-tight truncate title-neaw">
              Nea🍀🥰 
            </h1>
            <div className="mt-2 text-xs md:text-base clamp-3" style={{ color: "var(--muted)" }}>
              “Some moments feel warmer in winter.”
              {"\n"}
              Таньд хамгийн доод хэсэгт нууцхан захидал ирсэн тул сүүлд нь уншиж үзнэ үү.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              {session ? (
                <Link className="btn-neaw text-sm" href="/muruudul">
                  Мөрөөдөл
                </Link>
              ) : null}

              {session ? (
                <button type="button" className="btn-neaw text-sm" onClick={() => signOut({ callbackUrl: "/signin" })}>
                  Sign out
                </button>
              ) : (
                <Link className="btn-neaw text-sm" href="/signin">
                  Sign in
                </Link>
              )}
            </div>

            <div className="md:hidden relative">
              <button type="button" className="btn-neaw btn-neaw-sm" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}>
                <div className="flex flex-col gap-1">
                  <div className="h-[2px] w-5" style={{ background: "rgba(255, 240, 248, 0.85)" }} />
                  <div className="h-[2px] w-5" style={{ background: "rgba(255, 240, 248, 0.85)" }} />
                  <div className="h-[2px] w-5" style={{ background: "rgba(255, 240, 248, 0.85)" }} />
                </div>
              </button>

              {menuOpen ? (
                <div
                  className="absolute right-0 mt-2 w-48 card-neaw p-2 z-50"
                  style={{ zIndex: 999 }}
                  role="menu"
                >
                  <div className="grid gap-2">
                    {session ? (
                      <Link className="btn-neaw btn-neaw-sm text-sm" href="/muruudul" onClick={() => setMenuOpen(false)}>
                        Мөрөөдөл
                      </Link>
                    ) : null}

                    {session ? (
                      <button
                        type="button"
                        className="btn-neaw btn-neaw-sm text-sm"
                        onClick={() => {
                          setMenuOpen(false);
                          signOut({ callbackUrl: "/signin" });
                        }}
                      >
                        Sign out
                      </button>
                    ) : (
                      <Link className="btn-neaw btn-neaw-sm text-sm" href="/signin" onClick={() => setMenuOpen(false)}>
                        Sign in
                      </Link>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
