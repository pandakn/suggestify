import { JWT } from "next-auth/jwt";

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  token.refreshToken && params.append("refresh_token", token.refreshToken);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: params,
  });

  const data = await response.json();

  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}
