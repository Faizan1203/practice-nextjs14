import Google from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import prisma from "@utils/PrismaClient";
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
      });
      session.user.id = sessionUser?.id?.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        const userExists = await prisma.user.findFirst({
          where: {
            email: profile.email,
          },
        });

        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name.replaceAll(" ", "").toLowerCase(),
              image: profile.picture,
            },
          });
        }
        return true;
      } catch (error) {
        console.log(error.message.toString());
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
