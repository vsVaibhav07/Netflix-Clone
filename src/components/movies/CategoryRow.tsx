"use client";

import type { Movie } from "@/generated/prisma";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieDialog from "./MovieDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryRowProps = {
  category: string;
  movies?: Movie[];
};

const CategoryRow = ({ category, movies = [] }: CategoryRowProps) => {
  if (!movies?.length) return null;

  const prevBtnClass = `swiper-button-prev-${category}`;
  const nextBtnClass = `swiper-button-next-${category}`;

  return (
    <section className="w-full relative py-4">
      
      

      {/* Navigation Buttons */}
      <button
        aria-label="Previous"
        className={`absolute top-1/2 -left-3 sm:-left-4 z-10 transform -translate-y-1/2 ${prevBtnClass} bg-black/60 hover:bg-black/80 p-2 rounded-full transition`}
      >
        <ChevronLeft className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        aria-label="Next"
        className={`absolute top-1/2 -right-3 sm:-right-4 z-10 transform -translate-y-1/2 ${nextBtnClass} bg-black/60 hover:bg-black/80 p-2 rounded-full transition`}
      >
        <ChevronRight className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          0:{ slidesPerView: 1, spaceBetween: 8},
          480: { slidesPerView: 2, spaceBetween: 14 },  // phones
          790: { slidesPerView: 3, spaceBetween: 18 },    // tablets
          1024: { slidesPerView: 4, spaceBetween: 20 },   // laptops
          1280: { slidesPerView: 5, spaceBetween: 22 },   // desktops
          1536: { slidesPerView: 6, spaceBetween: 24 },   // ultrawide
        }}
        navigation={{
          nextEl: `.${nextBtnClass}`,
          prevEl: `.${prevBtnClass}`,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="rounded-xl text-black flex text-center h-40 sm:h-52 shadow hover:scale-105 justify-center transition-transform duration-300">
              <MovieDialog movie={movie} />
              

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryRow;
