"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  const { resolvedTheme } = useTheme();

  const variant =
    resolvedTheme === "dark"
      ? { background: "#1f2937", color: "#fff" }
      : { background: "#fff", color: "#1f2937" };

  return (
    <Toaster
      toastOptions={{
        duration: 1500,
        style: variant,
      }}
    />
  );
};

export default ToasterContext;
