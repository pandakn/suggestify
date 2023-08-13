"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import SpotifyLogo from "@/public/spotify-logo.svg";
import Image from "next/image";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <Button
          onClick={() => signIn("spotify")}
          className="px-16 py-8 text-2xl text-green-500 bg-white border border-green-500 rounded-xl hover:bg-[#191414] hover:border-[#191414]"
        >
          <Image src={SpotifyLogo} alt="spotify logo" className="w-8 h-8 " />{" "}
          Login Spotify
        </Button>
      </div>
    </div>
  );
};

export default Login;
