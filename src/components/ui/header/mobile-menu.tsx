"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="md:hidden ">
      <Button onClick={() => setShowMenu((prev) => !prev)}>
        <ChevronDown className={`transition ${showMenu ? "rotate-180" : ""}`} />
      </Button>
      {showMenu && (
        <div className="flex flex-col gap-1 z-40 absolute bg-gray-950 top-12 p-4 left-0 w-full border-b border-gray-700 text-sm font-mono">
          <Link href="/">Home</Link>
          <Link href="/category/movies">Movies</Link>
          <Link href="/category/tv-shows">Tv-Shows</Link>
          <Link href="/category/web-series">Web Series</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile/favourites">Wish-List</Link>
          <hr className="border-gray-700 my-2" />
          <SignOutButton  className="bg-red-500 w-fit cursor-pointer text-center text-xs px-4 py-2 rounded hover:bg-red-600 transition">
            Sign out
          </SignOutButton>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
