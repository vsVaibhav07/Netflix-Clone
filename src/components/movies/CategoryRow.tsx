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

type MovieRowProps = {
  category: string;
  movies?: Movie[];
};

const CategoryRow = ({ category, movies = [] }: MovieRowProps) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full relative">

      <div className={`absolute top-[50%] z-10 cursor-pointer swiper-button-prev-${category} bg-gray-800 p-2 rounded-full hover:bg-gray-900/50`}>
        <ChevronLeft className="text-white w-6 h-6" />
      </div>
      <div className={`absolute top-[50%] -end-4 z-10 cursor-pointer swiper-button-next-${category} bg-gray-800 p-2 rounded-full hover:bg-gray-900/50`}>
        <ChevronRight className="text-white font-bold w-6 h-6" />
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={18}
        slidesPerView={4}
        navigation={{
          nextEl: `.swiper-button-next-${category}`,
          prevEl: `.swiper-button-prev-${category}`,
        }}
        pagination={{ clickable: true }}
        loop
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="bg-transparent rounded-xl shadow-md text-center">
              <MovieDialog movie={movie} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryRow;
