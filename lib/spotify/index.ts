// types
type TopItem = "tracks" | "artists";
type TimeRange = "short_term" | "medium_term" | "long_term";

type ParamsTopItem = {
  type: TopItem;
  timeRange: TimeRange;
  limit?: number;
};

const scopes = ["user-read-email", "user-top-read"].join(",");
const params = {
  scope: scopes,
};

export const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

export const getTopItem = async (
  params: ParamsTopItem,
  accessToken: string | undefined
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/${params.type}?time_range=${params.timeRange}&limit=${params.limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();

  return data.items;
};

// get seed
export const getSeedTopItem = async (
  params: ParamsTopItem,
  accessToken: string | undefined
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/${params.type}?time_range=${
      params?.timeRange
    }&limit=${params.limit || 5}`,
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
  seedTracks: string,
  accessToken: string | undefined
) => {
  const res = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${seedTracks}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();

  return data.tracks;
};
