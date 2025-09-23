"use client";

import type { Content, Episode } from "@/generated/prisma";
import { BookmarkPlus, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type ContentDialogProps =
  | { content: Content & { episodes?: Episode[] | null } }
  | { content: Episode };

const MovieDialog = ({ content }: ContentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isContent = "category" in content;
  const isMovie = isContent && content.category === "Movie";
  const isSeries = isContent && content.category === "Web Series";

  const videoUrl = isContent
    ? isMovie
      ? content.videoUrl
      : content.episodes?.[currentEpisodeIndex]?.videoUrl
    : content.videoUrl;

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (isOpen) {
      setIsPaused(video.paused);

      const handlePlay = () => setIsPaused(false);
      const handlePause = () => setIsPaused(true);

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.pause();
      };
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, [isOpen, currentEpisodeIndex]);

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

  const [inWishlist, setInWishlist] = useState(false);

  const handleBookmark = async () => {
     setInWishlist((prev) => !prev);
    try {
      const response = await fetch(`/api/addToWishlist/${content.id}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to update wishlist");

      const data = await response.json();
      setInWishlist(data.status === "added");
    } catch (error) {
      console.error("Error updating wishlist:", error);
       setInWishlist((prev) => !prev);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative max-w-60 sm:max-w-full h-48 cursor-pointer overflow-hidden rounded-lg shadow-md transition hover:scale-[1.02] flex hover:shadow-xl group"
      >
        <Image
          src={content?.thumbnailurl || "/thumbnail.webp"}
          alt={content.title}
          fill
          sizes="absolute"
          priority
          className="object-cover h-full flex-1 aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 transition group-hover:opacity-100 flex flex-col justify-end p-3">
          <h2 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
            {content.title}
          </h2>
          {"description" in content && (
            <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
              {content.description}
            </p>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="
            w-full max-w-6xl max-h-screen 
            bg-black text-white 
            border-none p-0 overflow-y-auto 
            rounded-xl shadow-2xl
          "
        >
          <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-2xl lg:text-3xl font-bold">
                {isSeries && isContent
                  ? content.episodes?.[currentEpisodeIndex]?.title ||
                    content.title
                  : content.title}
              </DialogTitle>
            </DialogHeader>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              {videoUrl ? (
                <video
                  ref={videoRef}
                  key={videoUrl}
                  autoPlay
                  controls
                  src={videoUrl}
                  className="h-full w-full bg-black object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800 text-lg">
                  Video not available.
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handlePlayToggle}
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-2 font-semibold text-black cursor-pointer hover:bg-gray-200"
              >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
                {isPaused ? "Play" : "Pause"}
              </Button>
              <Button
                onClick={handleBookmark}
                className="  bg-white text-black cursor-pointer hover:bg-gray-200 "
                variant={"outline"}
              >
                {" "}
                <BookmarkPlus
                  fill={inWishlist ? "black" : "none"}
                  className="flex  scale-125"
                />
              </Button>
            </div>

            {isContent && (
              <div className="flex flex-col gap-4">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300">
                  {isSeries
                    ? content.episodes?.[currentEpisodeIndex]?.description ||
                      content.description
                    : content.description}
                </p>

                {isSeries &&
                  content.episodes &&
                  content.episodes.length > 0 && (
                    <div>
                      <h3 className="mb-2 font-semibold text-white">
                        Episodes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {content.episodes
                          .sort((a, b) => a.episodeNumber - b.episodeNumber)
                          .map((episode, index) => (
                            <Button
                              key={episode.id}
                              onClick={() => setCurrentEpisodeIndex(index)}
                              className={`rounded-full px-3 py-1 text-xs sm:text-sm lg:text-base transition ${
                                index === currentEpisodeIndex
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-800/70 text-gray-300 hover:bg-gray-700"
                              }`}
                            >
                              S{episode.seasonNumber}E{episode.episodeNumber}
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}

                {/* Genres */}
                {content.genres?.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {content.genres.map((g, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-gray-800/70 px-3 py-1 text-xs sm:text-sm lg:text-base text-gray-300"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieDialog;
