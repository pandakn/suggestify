"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import SpotifyLogo from "@/public/spotify-logo.svg";
import Image from "next/image";
import { Headphones, Disc3 } from "lucide-react";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <h1 className="text-5xl font-bold text-green-500">
        Suggestify. <Disc3 className="inline w-12 h-12 animate-spin" />
      </h1>

      <div className="flex items-center">
        <h3 className="my-5 text-xl font-semibold text-center">
          Recommends{" "}
          <b>
            12 awesome <span className="text-green-500">Spotify</span>
          </b>{" "}
          tracks that come from your taste
        </h3>
        <Headphones className="w-8 h-8 ml-2 " />
      </div>

      <div>
        <Button
          onClick={() => signIn("spotify")}
          className="px-16 py-8 text-2xl text-green-500 bg-white border border-green-500 rounded-xl "
        >
          <Image
            src={SpotifyLogo}
            alt="spotify logo"
            className="w-8 h-8 mr-2"
          />{" "}
          Login Spotify
        </Button>
      </div>
    </div>
  );
};

export default Login;
