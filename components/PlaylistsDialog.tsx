"use client";

import React from "react";
import useSWR from "swr";
import { Playlist } from "@/lib/spotify/@types";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";
import { BASE_URL, addSongToPlaylist } from "@/lib/spotify";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const fetcher = async ([url, token]: any) => {
  const res = await fetch(url, {
    headers: { Authorization: "Bearer " + token },
  });

  const data = await res.json();
  return data.items;
};

type PlaylistsDialogProps = {
  songUri?: string;
};

const PlaylistsDialog = ({ songUri }: PlaylistsDialogProps) => {
  const { data: session } = useSession();

  const {
    data: playlists,
    error,
    isLoading,
  } = useSWR<Playlist[] | undefined>(
    [
      `${BASE_URL}/users/${session?.user.id}/playlists?limit=50`,
      session?.accessToken,
    ],
    fetcher
  );

  if (error) return "An error has occurred.";

  const handleClickPlaylist = async (id: string, name: string) => {
    const res =
      songUri && (await addSongToPlaylist(id, songUri, session?.accessToken));

    if (!res.snapshot_id) {
      toast.error("Error add song");
      return;
    }

    toast.success(`Added to your ${name}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Heart className="absolute text-white hover:scale-125 hover:text-red-500 w-7 h-7 left-16 text-start hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="max-w-[320px] h-96 overflow-y-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-2xl">Add to Playlists</DialogTitle>
          <DialogDescription className="space-y-2">
            {isLoading ? (
              <p>Loading....</p>
            ) : (
              <>
                {playlists?.map((pl) => (
                  <li
                    key={pl.id}
                    onClick={() => handleClickPlaylist(pl.id, pl.name)}
                    className="text-lg hover:cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  >
                    {pl.name}
                  </li>
                ))}
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistsDialog;
