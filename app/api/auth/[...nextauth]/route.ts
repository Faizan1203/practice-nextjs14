import Google from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import prisma from "@utils/PrismaClient";
import { Session, User } from "next-auth";
import Github from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env?.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    Google({
      clientId: process.env?.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await prisma.user.findFirst({
        where: {
          email: session.user.email ?? "",
        },
      });
      session.user.id = sessionUser?.id?.toString() ?? "";
      return session;
    },
    async signIn({ user }: { user: User }) {
      try {
        const userExists = await prisma.user.findFirst({
          where: {
            email: user.email ?? "",
          },
        });
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: user.email ?? "",
              username: (user.name ?? "").replaceAll(" ", "").toLowerCase(),
              image: user.image ?? "",
            },
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
