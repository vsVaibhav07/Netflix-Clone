"use client";
import { Video } from "@imagekit/next";
import React, { FC, useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Movie = {
  id: string;
  moviename: string;
  description: string;
  videourl: string;
};

type MovieBannerProps = {
  movies?: Movie[];
};

const MovieBanner: FC<MovieBannerProps> = ({ movies = [] }) => {
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

  return (
    <div className="relative w-full h-[80vh]">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-[80vh]">
              {index === activeIndex && (
                <Video
                  ref={videoRef}
                  urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                  src={movie.videourl}
                  autoPlay={play}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 z-10 text-white max-w-xl">
                <h1 className="text-5xl font-extrabold">{movie.moviename}</h1>
                <p className="mt-4 text-lg text-gray-200">{movie.description}</p>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => setPlay((prev) => !prev)}
                    className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    {play ? "Pause" : "Play"}
                  </button>
                  <button className="bg-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
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
