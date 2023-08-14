"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ReGenerateButton = () => {
  return (
    <Button className="rounded-xl" onClick={() => window.location.reload()}>
      Generate New Song
    </Button>
  );
};

export default ReGenerateButton;
