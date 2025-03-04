"use client";

import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";
import { BiLogOut, BiCog } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="flex items-center text-sm">
      <BiLogOut size={20} />
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;
