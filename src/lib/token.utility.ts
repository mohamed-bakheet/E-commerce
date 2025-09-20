import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";



export async function getUserToken() {

      const cookieStore = await cookies();
  const encodedToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value || // sometimes secure version
    cookieStore.get("_vercel_jwt")?.value; // Vercel default



     
        if (!encodedToken) return null;

  // Decode token
  const decoded = await decode({
    token: encodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const token = decoded?.token

  return token;
}