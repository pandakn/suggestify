"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignOut from "./SignOut";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4 mb-5">
      <h3 className="font-bold">
        <span className="text-green-600">Hey,</span>{" "}
        <span>{session?.user?.name}</span>
      </h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <Avatar>
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || "user profile"}
            />
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
    </div>
  );
};

export default Header;
