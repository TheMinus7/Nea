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
    <main className="min-h-screen auth-bg py-10 flex items-center justify-center">
      <div className="container-neaw">
        <div className="mx-auto max-w-4xl auth-card">
          <div className="grid md:grid-cols-2">
            <div className="auth-left p-7 md:p-10">
              <div className="auth-left-inner">

                <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Welcome Nea</h1>
                <p className="mt-3 text-sm md:text-base" style={{ opacity: 0.92 }}>
                   Энэ сайтад байрлах захиа ирээдүйгээс ирсэн байж болзошгүй.
                  <br />
                 Бүх зүйл цаг нь ирэхээр болно.
                  <br />
                  Тиймээс энэхүү сайт нь бэлэгний зориулалттай юм. Гэхдээ бас ...
                   <br />
                  Таалагдана гэж найдаж байна.
                </p>
              </div>
            </div>

            <div className="auth-right p-7 md:p-10">
              <div className="text-xs font-semibold tracking-widest" style={{ color: "rgba(122, 88, 170, 0.9)" }}>
                CREATE ACCOUNT
              </div>
              <h2 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight" style={{ color: "rgba(28, 14, 32, 0.92)" }}>
                Бүртгүүлэх
              </h2>

              <form
                className="mt-6 grid gap-4"
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
                <label className="grid gap-2">
                  <div className="text-xs font-medium" style={{ color: "rgba(28, 14, 32, 0.72)" }}>
                    Email
                  </div>
                  <input
                    className="auth-input"
                    style={{ width: "100%" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <div className="text-xs font-medium" style={{ color: "rgba(28, 14, 32, 0.72)" }}>
                    Password
                  </div>
                  <input
                    className="auth-input"
                    style={{ width: "100%" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <div className="text-xs font-medium" style={{ color: "rgba(28, 14, 32, 0.72)" }}>
                    Confirm password
                  </div>
                  <input
                    className="auth-input"
                    style={{ width: "100%" }}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    required
                  />
                </label>

                {error ? <div className="auth-error text-sm">{error}</div> : null}

                <button type="submit" className="auth-primary text-sm md:text-base" disabled={loading}>
                  {loading ? "Үүсгэж байна..." : "Бүртгүүлэх"}
                </button>

                <a className="auth-link text-sm" href="/signin">
                  Нэвтрэх
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
