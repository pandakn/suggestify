"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  return (
    <div
      className={`${
        pathname === "/login" &&
        "fixed w-full bottom-16 left-1/2 -translate-x-1/2"
      } w-full my-20`}
    >
      <div className="flex items-center justify-center gap-2 mb-2 text-lg">
        Made By <Heart />
        <a
          href="https://www.linkedin.com/in/natthawut-klangyod-76b477252/"
          target="_blank"
          // className="text-blue-400"
          className="text-brownPrimary hover:underline"
        >
          Natthawut Klangyod
          {/* Pandakn */}
        </a>
      </div>
    </div>
  );
};

export default Footer;
