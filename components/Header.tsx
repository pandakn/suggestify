"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4 my-10">
      <h1 className="text-3xl font-bold">
        <span className="text-green-500">Hey,</span>{" "}
        <span>{session?.user?.name}</span>
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <Avatar className="w-16 h-16">
            <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="hover:cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ModeToggle />
    </div>
  );
};

export default Header;
