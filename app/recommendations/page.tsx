import React from "react";
import { TopTrack } from "@/lib/spotify/@types";

import Recommendation from "@/components/Recommendation";
import { getSeedTopItem } from "@/lib/spotify";
import { getRecommendations } from "@/lib/spotify";
import { NextAuthOptions, getServerSession } from "next-auth";
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
      <Recommendation data={recommend} />
    </>
  );
};

export default TopTracks;
