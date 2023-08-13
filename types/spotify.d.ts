import { ISODateString } from "next-auth";

interface SpotifyProfile {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  accessToken?: string | null;
  accessTokenExpires?: string | null;
}

export interface SpotifySession {
  user?: SpotifyProfile;
  expires: ISODateString;
}
