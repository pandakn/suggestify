"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <button onClick={() => signOut()} className="px-4 py-2 text-white bg-black">
      Logout
    </button>
  );
};

export default SignOut;
