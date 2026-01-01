"use client";

import MusicToggle from "@/components/MusicToggle";
import { signOut, useSession } from "next-auth/react";

export default function Header({
  snowOn,
  onToggleSnow,
}: {
  snowOn: boolean;
  onToggleSnow: () => void;
}) {
  const { data: session } = useSession();

  return (
    <header className="pt-8 pb-4">
      <div className="container-neaw">
        <div className="card-neaw px-6 py-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Winter memory
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate title-neaw">
              Nea
            </h1>
            <div className="mt-2 text-sm md:text-base" style={{ color: "var(--muted)" }}>
              “Some moments feel warmer in winter.”
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MusicToggle />
            <button type="button" className="btn-neaw text-sm" onClick={onToggleSnow}>
              {snowOn ? "Tsas: ON" : "Tsas: OFF"}
            </button>

            {session ? (
              <button type="button" className="btn-neaw text-sm" onClick={() => signOut({ callbackUrl: "/signin" })}>
                Sign out
              </button>
            ) : (
              <a className="btn-neaw text-sm" href="/signin">
                Sign in
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
