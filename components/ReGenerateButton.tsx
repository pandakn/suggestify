"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ReGenerateButton = () => {
  return (
    <Button onClick={() => window.location.reload()}>Generate New Song</Button>
  );
};

export default ReGenerateButton;
