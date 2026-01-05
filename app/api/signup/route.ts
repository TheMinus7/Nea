import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL && !process.env.DIRECT_URL) {
    return NextResponse.json({ error: "Auth is not configured yet" }, { status: 503 });
  }

  try {
    const body = (await req.json()) as { email?: string; password?: string };

    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    const msg = typeof (e as { message?: unknown })?.message === "string" ? (e as { message: string }).message : "";
    const code = typeof (e as { code?: unknown })?.code === "string" ? (e as { code: string }).code : "";
    const lower = msg.toLowerCase();

    console.error("/api/signup failed", { code, msg });

    if (
      code === "P2021" ||
      code === "P2022" ||
      code === "P1001" ||
      code === "P1002" ||
      code === "P1017" ||
      lower.includes("relation") ||
      lower.includes("table") ||
      lower.includes("column") ||
      lower.includes("does not exist") ||
      lower.includes("timeout") ||
      lower.includes("connect")
    ) {
      return NextResponse.json(
        {
          error:
            "DB тохиргоо/хүснэгт дээр асуудал байна. Vercel дээр DATABASE_URL (мөн боломжтой бол DIRECT_URL) зөв эсэхийг шалгаад, migration ажиллуулах хэрэгтэй: npx prisma migrate deploy",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
