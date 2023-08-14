"use client";

import React, { useState } from "react";

// components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// types
import { Artist, Image as ImageType } from "@/types/spotify";

// icons
import { PlayIcon, Pause } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PlaylistsDialog from "./PlaylistsDialog";
import SpotifyLogo from "@/public/spotify-icon.svg";

type CardTrackProps = {
  name: string;
  uri: string;
  href: string;
  image: ImageType;
  artists: Artist[];
  previewUrl: string;
};

const CardTrack = ({
  name,
  uri,
  href,
  artists,
  image,
  previewUrl,
}: CardTrackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef<HTMLAudioElement>();

  const togglePlay = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.volume = 0.6;
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="relative max-w-lg rounded-lg dark:bg-gray-900">
      <CardHeader>
        <AspectRatio ratio={1 / 1}>
          <div className="relative group">
            <Image
              src={image.url}
              alt={name}
              width={image.width}
              height={image.height}
              className="object-cover group-hover:bg-gray-500"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:opacity-100">
              <PlaylistsDialog songUri={uri} />
              {/* Play button */}
              {previewUrl && (
                <Button
                  size="icon"
                  className="px-2 text-gray-900 bg-white rounded-full hover:text-white dark:hover:text-gray-900 hover:scale-125"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </AspectRatio>
      </CardHeader>

      <CardContent className="mb-4">
        <h1 className="text-xl font-bold hover:underline">
          <a href={href} target="_blank">
            {name}
          </a>
        </h1>
        <div className="flex flex-wrap mt-1">
          {artists.map((a) => (
            <p key={a.id} className="opacity-80">
              {a.name}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="absolute flex bottom-4 gap-x-2">
          <Image
            src={SpotifyLogo}
            alt="spotify-logo"
            className="bottom-0 w-6 h-6 text-white "
          />
          <h3 className="">Spotify</h3>
        </div>
      </CardFooter>

      {/* song */}
      <audio ref={audioRef} preload="auto">
        <source src={previewUrl} type="audio/mpeg" />
      </audio>
    </Card>
  );
};

export default CardTrack;
