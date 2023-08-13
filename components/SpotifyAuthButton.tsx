"use client";

import { signIn } from "next-auth/react";
import React from "react";

const SpotifyAuthButton = () => {
  return (
    <button
      onClick={() => signIn("spotify")}
      className="px-4 py-2 text-white bg-green-500 "
    >
      Login Spotify
    </button>
  );
};

export default SpotifyAuthButton;
