"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";
import type { Movie } from "@/generated/prisma";
import Image from "next/image";

const MovieDialog = ({ movie }: { movie: Movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  if (!movie) return null;

  return (
    <>
      <div
        className="w-80 h-48 overflow-hidden m-4 cursor-pointer group relative rounded-xl"
        onClick={() => setIsOpen(true)}
      >
        <Image
     

 
          src={movie.thumbnailurl || movie.videourl}
          alt={movie.moviename}
           width={120}
  height={40}
  priority
          className="w-[90%] h-64 object-cover overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-black text-white border-none p-0 overflow-hidden">
          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {movie.moviename}
              </DialogTitle>
            </DialogHeader>

            <video
              ref={videoRef}
              autoPlay
              src={movie.videourl}
              className="w-full mt-4 rounded-lg"
            />

            <div className="flex gap-3">
              <Button
                onClick={handlePlay}
                className="bg-white text-black font-bold px-6 hover:bg-gray-200 flex items-center gap-2"
              >
                {isPaused ? <Play /> : <Pause />}
                {isPaused ? "Play" : "Pause"}
              </Button>
            </div>

            <p className="text-gray-300 text-sm">{movie.description}</p>

            {movie.genres && (
              <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                {movie.genres.map((g, i) => (
                  <span key={i} className="bg-gray-800 px-2 py-1 rounded">
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
