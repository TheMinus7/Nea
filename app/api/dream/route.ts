import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

type DreamRow = {
  ner: string;
  utas: string | null;
  email: string;
  husel: string;
  zorilgo: string;
  tolovlogoo: string;
  biylelt: string;
  updatedAt: Date;
};

async function getAuthFromReq(
  req: NextRequest
): Promise<{ userId: string | null; email: string | null } | null> {
  if (!process.env.NEXTAUTH_SECRET) return null;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const userId = typeof token?.sub === "string" ? token.sub : null;
  const email = typeof token?.email === "string" ? token.email : null;
  return { userId, email };
}

async function resolveUserId(auth: { userId: string | null; email: string | null }): Promise<string | null> {
  if (auth.userId) {
    const u = await prisma.user.findUnique({ where: { id: auth.userId }, select: { id: true } });
    if (u?.id) return u.id;
  }
  if (auth.email) {
    const u = await prisma.user.findUnique({ where: { email: auth.email }, select: { id: true } });
    if (u?.id) return u.id;
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromReq(req);
    if (!auth) return NextResponse.json({ error: "Unauthorized. Sign in дахин хийгээд refresh хийнэ үү." }, { status: 401 });

    const userId = await resolveUserId(auth);

    if (!userId) return NextResponse.json({ error: "Unauthorized. Sign in дахин хийгээд refresh хийнэ үү." }, { status: 401 });

    const dream = (await prisma.dream.findUnique({ where: { userId } })) as DreamRow | null;

    return NextResponse.json({
      dream: dream
        ? {
            ner: dream.ner,
            utas: dream.utas,
            email: dream.email,
            husel: dream.husel,
            zorilgo: dream.zorilgo,
            tolovlogoo: dream.tolovlogoo,
            biylelt: dream.biylelt,
            updatedAt: dream.updatedAt,
          }
        : null,
    });
  } catch (e) {
    const msg = typeof (e as { message?: unknown })?.message === "string" ? (e as { message: string }).message : "";
    const code = typeof (e as { code?: unknown })?.code === "string" ? (e as { code: string }).code : "";
    const lower = msg.toLowerCase();
    console.error("/api/dream GET error", { code, msg });
    if (
      code === "P2021" ||
      code === "P2022" ||
      lower.includes("relation") ||
      lower.includes("table") ||
      lower.includes("column") ||
      lower.includes("does not exist")
    ) {
      return NextResponse.json(
        {
          error:
            "Dream хүснэгт/багана DB дээр таарахгүй байна. Дараахыг ажиллуулаад server-ээ restart хийгээрэй: npx prisma migrate dev --name dream_contact_fields && npx prisma generate",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await getAuthFromReq(req);
    if (!auth) return NextResponse.json({ error: "Unauthorized. Sign in дахин хийгээд refresh хийнэ үү." }, { status: 401 });

    const userId = await resolveUserId(auth);

    if (!userId) return NextResponse.json({ error: "Unauthorized. Sign in дахин хийгээд refresh хийнэ үү." }, { status: 401 });

    const body = (await req.json().catch(() => null)) as
      | {
          ner?: string;
          utas?: string | null;
          email?: string;
          husel?: string;
          zorilgo?: string;
          tolovlogoo?: string;
          biylelt?: string;
        }
      | null;

    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const ner = typeof body.ner === "string" ? body.ner : "";
    const utasRaw = typeof body.utas === "string" ? body.utas : null;
    const utas = utasRaw && utasRaw.trim() ? utasRaw.trim() : null;
    const email = typeof body.email === "string" ? body.email : auth.email ?? "";
    const husel = typeof body.husel === "string" ? body.husel : "";
    const zorilgo = typeof body.zorilgo === "string" ? body.zorilgo : "";
    const tolovlogoo = typeof body.tolovlogoo === "string" ? body.tolovlogoo : "";
    const biylelt = typeof body.biylelt === "string" ? body.biylelt : "";

    const dream = (await prisma.dream.upsert({
      where: { userId },
      create: { userId, ner, utas, email, husel, zorilgo, tolovlogoo, biylelt },
      update: { ner, utas, email, husel, zorilgo, tolovlogoo, biylelt },
      select: { ner: true, utas: true, email: true, husel: true, zorilgo: true, tolovlogoo: true, biylelt: true, updatedAt: true },
    })) as DreamRow;

    return NextResponse.json({ dream });
  } catch (e) {
    const msg = typeof (e as { message?: unknown })?.message === "string" ? (e as { message: string }).message : "";
    const code = typeof (e as { code?: unknown })?.code === "string" ? (e as { code: string }).code : "";
    const lower = msg.toLowerCase();
    console.error("/api/dream PUT error", { code, msg });

    if (code === "P1001" || code === "P1002" || code === "P1017" || lower.includes("timeout") || lower.includes("connect")) {
      return NextResponse.json(
        {
          error:
            "DB connection алдаа/timeout байна. DATABASE_URL зөв эсэх, internet/DB ажиллагаатай эсэхийг шалгаад dev server-ээ restart хийгээрэй.",
          ...(process.env.NODE_ENV !== "production" ? { details: { code, msg } } : null),
        },
        { status: 500 }
      );
    }

    if (
      code === "P2021" ||
      code === "P2022" ||
      lower.includes("relation") ||
      lower.includes("table") ||
      lower.includes("column") ||
      lower.includes("does not exist") ||
      lower.includes("unknown argument") ||
      lower.includes("invalid `prisma")
    ) {
      return NextResponse.json(
        {
          error:
            "Dream хүснэгт/багана DB дээр таарахгүй (эсвэл Prisma client хуучин) байна. Дараахыг ажиллуулаад server-ээ restart хийгээрэй: npx prisma migrate dev --name dream_contact_fields && npx prisma generate",
          ...(process.env.NODE_ENV !== "production" ? { details: { code, msg } } : null),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Server error",
        ...(process.env.NODE_ENV !== "production" ? { details: { code, msg } } : null),
      },
      { status: 500 }
    );
  }
}
