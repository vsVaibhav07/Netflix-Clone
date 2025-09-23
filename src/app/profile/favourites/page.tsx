"use client";
import ContentRow from "@/components/movies/ContentRow";
import SeriesRow from "@/components/series/SeriesRow";
import { Content } from "@/generated/prisma";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [wishlist, setWishlist] = useState<Content[]>([]);
  const [videos, setVideos] = useState<Content[]>([]);
  const [playlists, setPlaylists] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }

    fetch("/api/user/wishlist")
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data.wishlist);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const video = wishlist.filter((item) => item.videoUrl);
    const playlist = wishlist.filter((item) => !item.videoUrl);
    setVideos(video);
    setPlaylists(playlist);
  }, [wishlist]);


  if (!isLoaded || loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl">
        Please Sign In to view this page
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-10 py-20">
      <div>
        <h2 className="text-2xl font-bold">Saved Videos</h2>
        {videos.length === 0 ? (
          <p>No videos saved yet</p>
        ) : (
          <ContentRow content={videos} category="favourite-videos" />
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Playlists</h2>
        {playlists.length === 0 ? (
          <p>No playlists saved yet</p>
        ) : (
          <SeriesRow content={playlists} category="favourite-playlists" />
        )}
      </div>
    </div>
  );
};

export default Page;
