"use client";
import React, { useState } from "react";
import { Button } from "../button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div className="md:hidden">
      <Button onClick={() => setShowMenu((prev) => !prev)}>
        <span>Browse</span>
        <ChevronDown className={`transition ${showMenu ? "rotate-180" : ""}`} />
      </Button>
      {showMenu && (
        <div className="flex flex-col gap-1 z-40 absolute bg-gray-950 top-12 p-4 left-0 w-full border-b border-gray-700 text-sm font-mono">
          <Link href="/">Home</Link>
          <Link href="/movies">Movies</Link>
          <Link href="/tv-shows">Tv-Shows</Link>
          <Link href="/latest">Latest</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
