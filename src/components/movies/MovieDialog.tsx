"use client";

import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";
import type { Movie } from "@/generated/prisma";
import Image from "next/image";

const MovieDialog = ({ movie }: { movie: Movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  // ✅ Auto-pause video when dialog closes
 useEffect(() => {
  if (isOpen && videoRef.current) {
    const video = videoRef.current;

    // Initial sync when dialog opens
    setIsPaused(video.paused);

    // Event listeners for play/pause
    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }
}, [isOpen]);

  if (!movie) return null;

  return (
    <>
  {/* Thumbnail Card */}
  <div
    onClick={() => setIsOpen(true)}
    className="relative object-cover aspect-[16/9] cursor-pointer group rounded-md sm:rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
  >
    <Image
      src={movie.thumbnailurl || movie.videourl}
      alt={movie.moviename}
      fill
      priority
      className="object-cover bg-black md:group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black/50 opacity-0 md:group-hover:opacity-100 transition" />
  </div>

  {/* Dialog Modal */}
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent
      className="
        w-auto
        max-w-full
        md:max-w-4xl
        lg:max-w-6xl
        xl:max-w-[90%]
        max-h-screen
        bg-black text-white
        border-none
        p-0
        overflow-hidden
        rounded-xl
      "
    >
      <div className="flex flex-col gap-2 p-4 sm:p-6 lg:p-6 w-full h-auto">
        {/* Title */}
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold">
            {movie.moviename}
          </DialogTitle>
        </DialogHeader>

        {/* Video Preview */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            controls
            src={movie.videourl}
            className="w-full h-full object-cover bg-black"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handlePlayToggle}
            className="bg-white text-black font-bold px-4 sm:px-6 py-2 hover:bg-gray-200 flex items-center gap-2"
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            {isPaused ? "Play" : "Pause"}
          </Button>
        </div>

        {/* Description */}
        {movie.description && (
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {movie.description}
          </p>
        )}

        {/* Genres */}
        {movie.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm lg:text-base">
            {movie.genres.map((g, i) => (
              <span
                key={i}
                className="bg-gray-800/70 px-2 sm:px-3 py-1 rounded-full text-gray-300"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
</>

  );
};

export default MovieDialog;
