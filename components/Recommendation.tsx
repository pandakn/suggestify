import React from "react";
import { TopTrack } from "@/lib/spotify/@types";

import { getSeedTopItem } from "@/lib/spotify";
import { getRecommendations } from "@/lib/spotify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

import CardTrack from "@/components/CardTrack";
import ReGenerateButton from "./ReGenerateButton";

const TopTracks = async () => {
  const session = await getServerSession(authOptions);

  const seedTracks = await getSeedTopItem(
    {
      type: "tracks",
      timeRange: "medium_term",
    },
    session?.accessToken
  );

  const recommend: TopTrack[] =
    seedTracks &&
    (await getRecommendations(
      { seedTracks: seedTracks, limit: 12 },
      session?.accessToken
    ));

  return (
    <>
      <ReGenerateButton />
      <div className="grid grid-cols-1 gap-6 my-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommend.map((r) => {
          return (
            <CardTrack
              key={r.id}
              name={r.name}
              uri={r.uri}
              href={r.external_urls.spotify}
              image={r.album.images[0]}
              artists={r.artists}
              previewUrl={r.preview_url}
            />
          );
        })}
      </div>
    </>
  );
};

export default TopTracks;
