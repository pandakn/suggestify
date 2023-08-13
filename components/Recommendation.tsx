import React from "react";
import { TopTrack } from "@/lib/spotify/@types";

import { getSeedTopItem } from "@/lib/spotify";
import { getRecommendations } from "@/lib/spotify";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

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
    seedTracks && (await getRecommendations(seedTracks, session?.accessToken));

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {recommend.map((r) => {
          return (
            <div key={r.id}>
              <p>{r.name}</p>
              <audio controls>
                <source src={r.preview_url} type="audio/mpeg"></source>
              </audio>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TopTracks;
