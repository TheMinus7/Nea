"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = useMemo(() => searchParams.get("callbackUrl") ?? "/", [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen py-10">
      <div className="container-neaw">
        <div className="card-neaw px-6 py-6 md:px-8 md:py-8">
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            Sign in
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Нэвтрэх</h1>

          <form
            className="mt-6 grid gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setLoading(true);
              try {
                const res = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                  callbackUrl,
                });

                if (!res || res.error) {
                  setError("Email эсвэл нууц үг буруу байна.");
                  return;
                }

                router.push(res.url ?? callbackUrl);
              } finally {
                setLoading(false);
              }
            }}
          >
            <label className="grid gap-1">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Email
              </div>
              <input
                className="btn-neaw"
                style={{ width: "100%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
              />
            </label>

            <label className="grid gap-1">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Password
              </div>
              <input
                className="btn-neaw"
                style={{ width: "100%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? (
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                {error}
              </div>
            ) : null}

            <button type="submit" className="btn-neaw text-sm md:text-base" disabled={loading}>
              {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </button>

            <a className="link-neaw text-sm" href="/signup">
              Бүртгүүлэх
            </a>
          </form>
        </div>
      </div>
    </main>
  );
}
