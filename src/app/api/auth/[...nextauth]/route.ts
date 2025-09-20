import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials", // Ensure this matches the provider name in signIn
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Return the user object on success
        }

        throw new Error("Invalid email or password"); // Throw an error on failure
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Login page
    error: "/login", // Redirect to the login page on error
  },
  callbacks: {
     async session({ session, token , user}) {
      return { ...session, ...token , ...user};
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
   
  },
  secret: process.env.AUTH_SECRET, // Ensure this is set in your .env file
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };