"use client";
import { UserButton } from "@clerk/nextjs";
import { Bell, Search, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import MobileMenu from "./mobile-menu";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between bg-gray-950 text-white px-4 py-2">
        <Link href="/">
          <img className="w-24 bg-transparent" src="/logo.png" alt="Logo" />
        </Link>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      
        <nav className="hidden md:flex space-x-6 text-sm md:text-lg font-medium">
          <Link href="/category/movies">Movies</Link>
          <Link href="/category/tv-shows">TV Shows</Link>
          <Link href="/category/web-series">Web-Series</Link>
          {/* <Link href="/category/my-list">My List</Link> */}
        </nav>
        <div className="flex gap-4 items-center">
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-gray-800 text-white px-3 py-1 rounded-md w-48 focus:w-64 transition-all outline-none"
                  autoFocus
                />
              </form>
            ) : (
              <Search className="cursor-pointer" onClick={() => setShowSearch(true)} />
            )}
          </div>
          <p className="cursor-pointer hidden sm:block">Kids</p>
          <Bell className="cursor-pointer" />
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Dashboard"
                href="/dashboard"
                labelIcon={<LayoutDashboard className="w-4 h-4" />}
              />
              <UserButton.Link
                label="Profile"
                href="/profile"
                labelIcon={<User className="w-4 h-4" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
