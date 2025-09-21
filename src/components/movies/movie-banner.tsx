"use client";

import { Video } from "@imagekit/next";
import { FC, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Content } from "@/generated/prisma";

// Use a direct Prisma type for better type safety
type MovieBannerProps = {
  content: Content[];
};

const MovieBanner: FC<MovieBannerProps> = ({ content }) => {
  const [play, setPlay] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (play) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [play, activeIndex]);

  // Filter content to only include items that have a videoUrl and are not null.
  const movies = content.filter((item) => item?.videoUrl);

  // If there are no movies to display, don't render the banner.
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[80vh]  w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-[80vh] w-full">
              {/* Only render the video for the active slide */}
              {index === activeIndex && movie.videoUrl && (
                <Video
                  ref={videoRef}
                  urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                  src={movie.videoUrl}
                  // autoPlay={play}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 z-10 max-w-xl text-white">
                <h1 className="text-5xl font-extrabold">{movie.title}</h1>
                <p className="mt-4 text-lg text-gray-200">
                  {movie.description}
                </p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => setPlay((prev) => !prev)}
                    className="rounded-lg bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-300"
                  >
                    {play ? "Pause" : "Play"}
                  </button>
                  <button className="rounded-lg bg-gray-700 px-6 py-2 font-semibold transition hover:bg-gray-600">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieBanner;