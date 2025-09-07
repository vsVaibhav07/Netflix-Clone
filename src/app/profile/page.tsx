"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Film, ListVideo, Settings, Clock } from "lucide-react";
import React from "react";

const Dashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <main className="min-h-screen w-full p-40 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.firstName || "Guest"} 👋
      </h1>


      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/my-list"
          className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 p-4 rounded-xl transition"
        >
          <ListVideo className="w-6 h-6" />
          <span>My List</span>
        </Link>

        <Link
          href="/continue-watching"
          className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 p-4 rounded-xl transition"
        >
          <Clock className="w-6 h-6" />
          <span>Continue Watching</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 p-4 rounded-xl transition"
        >
          <Settings className="w-6 h-6" />
          <span>Account Settings</span>
        </Link>
      </section>

      {/* Recently Watched */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Recently Watched</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {/* Example thumbnails */}
          <div className="bg-gray-800 aspect-[2/3] rounded-lg flex items-center justify-center">
            <Film className="w-8 h-8" />
          </div>
          <div className="bg-gray-800 aspect-[2/3] rounded-lg flex items-center justify-center">
            <Film className="w-8 h-8" />
          </div>
          <div className="bg-gray-800 aspect-[2/3] rounded-lg flex items-center justify-center">
            <Film className="w-8 h-8" />
          </div>
        </div>
      </section>

   
      <section>
        <h2 className="text-xl font-semibold mb-3">Recommended For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <div className="bg-gray-800 aspect-[2/3] rounded-lg flex items-center justify-center">
            <Film className="w-8 h-8" />
          </div>
          <div className="bg-gray-800 aspect-[2/3] rounded-lg flex items-center justify-center">
            <Film className="w-8 h-8" />
          </div>
          <div className="bg-gray-800 aspect-[2/3] rounded-lg flex items-center justify-center">
            <Film className="w-8 h-8" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
