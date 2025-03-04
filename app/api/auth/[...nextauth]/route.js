import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";


const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Session valid for 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET, // Used to encrypt JWT and cookies
  providers: [
    // Credentials-based Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;



        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/login`,
            {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: { "Content-Type": "application/json" },
            }
          );
          const user = await res.json();

          if (res.ok) {

            return { ...user };
          } else {
            throw new Error(
              JSON.stringify({
                message: user.error,
              })
            );
          }
        } catch (error) {
          throw new Error(
            JSON.stringify({
              message: "An unexpected error occurred. Please try again later.",
            })
          );
        }



      }
    }),
  ],
  callbacks: {

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      session = { ...session, ...token };

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
