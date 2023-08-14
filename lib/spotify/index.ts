import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { revalidateTag } from "next/cache";

export const BASE_URL = "https://api.spotify.com/v1";

// types
type TopItem = "tracks" | "artists";
type TimeRange = "short_term" | "medium_term" | "long_term";

type ParamsTopItem = {
  type: TopItem;
  timeRange: TimeRange;
  limit?: number;
};

const scopes = [
  "user-read-email",
  "user-top-read",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(",");
const params = {
  scope: scopes,
};

export const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

// get seed
export const getSeedTopItem = async (
  params: ParamsTopItem,
  accessToken: string | undefined
) => {
  const res = await fetch(
    `${BASE_URL}/me/top/${params.type}?time_range=${params?.timeRange}&limit=${
      params.limit || 5
    }`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  return (
    data &&
    data.items
      .slice()
      .map((t: any) => t.id)
      .join(",")
  );
};

// require seed tracks
export const getRecommendations = async (
  params: { seedTracks: string; limit?: number | 10 },
  accessToken: string | undefined
) => {
  const res = await fetch(
    `${BASE_URL}/recommendations?limit=${params.limit}&seed_tracks=${params.seedTracks}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }
  );

  const data = await res.json();

  return data.tracks;
};

// export const createPlaylist = async (
//   // userId: string,
//   formData: FormData
//   // accessToken: string | undefined
// ) => {
//   "use server";

//   const session = await getServerSession(authOptions);

//   const name = formData.get("playlistName") as string;

//   if (!name) return;

//   const newPlaylist: PlaylistBody = { name };

//   await fetch(`${BASE_URL}/users/${session?.user?.id}/playlists`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${session?.accessToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newPlaylist),
//   });

//   revalidateTag("playlist");
// };

export const getPlaylists = async (
  userId: string,
  accessToken: string | undefined
) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/playlists?limit=5`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-cache",
    next: {
      tags: ["playlist"],
    },
  });

  const data = await res.json();

  return data.items;
};

export const addSongToPlaylist = async (
  playlistId: string,
  songUri: string,
  accessToken: string | undefined
) => {
  const song = { uris: [songUri] };

  const res = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });

  const data = await res.json();
  return data;
};
