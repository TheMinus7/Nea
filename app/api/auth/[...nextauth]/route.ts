import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        try {
          const email = credentials?.email?.trim().toLowerCase();
          const password = credentials?.password?.trim();

          if (!email || !password) return null;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.warn("[auth] authorize: user not found", { email });
            return null;
          }

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) {
            console.warn("[auth] authorize: password mismatch", {
              email,
              passwordHashLength: user.passwordHash.length,
            });
            return null;
          }

          console.info("[auth] authorize: success", { email });
          return { id: user.id, email: user.email };
        } catch (e) {
          console.error("[auth] authorize: error", e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
