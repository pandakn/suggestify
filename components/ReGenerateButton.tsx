"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type ReGenerateButtonProps = {
  generateNewSong: () => Promise<void>;
};

const ReGenerateButton = ({ generateNewSong }: ReGenerateButtonProps) => {
  return (
    <form action={generateNewSong}>
      <Button className="rounded-xl" formAction={generateNewSong}>
        Generate New Song
      </Button>
    </form>
  );
};

export default ReGenerateButton;
