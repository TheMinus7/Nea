"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="min-h-screen py-10">
      <div className="container-neaw">
        <div className="card-neaw px-6 py-6 md:px-8 md:py-8">
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            Sign up
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Бүртгүүлэх</h1>

          <form
            className="mt-6 grid gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);

              if (password.length < 8) {
                setError("Нууц үг 8-аас дээш тэмдэгттэй байх хэрэгтэй.");
                return;
              }

              if (password !== confirm) {
                setError("Нууц үг таарахгүй байна.");
                return;
              }

              setLoading(true);
              try {
                const res = await fetch("/api/signup", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });

                if (!res.ok) {
                  const data = (await res.json().catch(() => null)) as { error?: string } | null;
                  setError(data?.error ?? "Бүртгэл үүсгэхэд алдаа гарлаа.");
                  return;
                }

                const signInRes = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                  callbackUrl: "/",
                });

                if (!signInRes || signInRes.error) {
                  router.push("/signin");
                  return;
                }

                router.push(signInRes.url ?? "/");
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
                autoComplete="new-password"
                required
              />
            </label>

            <label className="grid gap-1">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                Confirm password
              </div>
              <input
                className="btn-neaw"
                style={{ width: "100%" }}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
              />
            </label>

            {error ? (
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                {error}
              </div>
            ) : null}

            <button type="submit" className="btn-neaw text-sm md:text-base" disabled={loading}>
              {loading ? "Үүсгэж байна..." : "Бүртгүүлэх"}
            </button>

            <a className="link-neaw text-sm" href="/signin">
              Нэвтрэх
            </a>
          </form>
        </div>
      </div>
    </main>
  );
}
