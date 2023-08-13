"use client";

import React, { useState } from "react";

// components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// types
import { Artist, Image as ImageType } from "@/lib/spotify/@types";

// icons
import { PlayIcon, Pause } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PlaylistsDialog from "./PlaylistsDialog";

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
  const [trackActiveId, setTrackActiveId] = useState("");
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
    <Card>
      <CardHeader>
        <AspectRatio>
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
                  className="px-2 text-gray-900 bg-white rounded-full hover:text-white"
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

      <CardContent>
        <h1 className="font-bold hover:underline">
          <a href={href} target="_blank">
            {name}
          </a>
        </h1>
        <div className="flex flex-wrap">
          {artists.map((a) => (
            <p key={a.id} className="">
              {a.name}
            </p>
          ))}
        </div>
      </CardContent>

      {/* song */}
      <audio ref={audioRef} preload="auto">
        <source src={previewUrl} type="audio/mpeg" />
      </audio>
    </Card>
  );
};

export default CardTrack;
