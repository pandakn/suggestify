// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

// https://www.reddit.com/r/nextjs/comments/10o6aup/next_auth_spotify_reauthentication_access_token/

import { DefaultSession, Account as NextAuthAccount } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    error?: string;
  }
  interface Account extends NextAuthAccount {
    expires_at: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
    user?: Session["user"];
  }
}
