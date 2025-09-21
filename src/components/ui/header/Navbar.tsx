"use client";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
import SearchBox from "./SearchBox";
import UserProfile from "./UserProfile";
import { useUser } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="flex items-center justify-between bg-gray-950 px-4 py-2 text-white">
        <Link className="w-24 hidden md:block" href="/">
          <Image
            width={400}
            height={60}
            className="w-24  bg-transparent"
            src="/logo.png"
            priority
            alt="Logo"
          />
        </Link>
        <nav className="hidden space-x-6 font-medium md:flex md:text-lg">
          <Link href="/category/movies">Movies</Link>
          <Link href="/category/tv-shows">TV Shows</Link>
          <Link href="/category/web-series">Web-Series</Link>
        </nav>
        <div className="md:hidden">
          <MobileMenu />
        </div>
        <div className="flex items-center gap-4">
          <SearchBox />
          <div className="hidden sm:block">
            <UserProfile />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
