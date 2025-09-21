"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="relative"  ref={menuRef}>
      <Image
        src={user.imageUrl}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg">
          <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-800">
            Dashboard
          </Link>
          <SignOutButton>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-800">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
