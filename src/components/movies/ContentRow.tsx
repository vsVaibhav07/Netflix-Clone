"use client";

import type { Content,Episode } from "@/generated/prisma";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import MovieDialog from "./MovieDialog";

type ContentWithEpisodes = Content & { episodes?: Episode[] };

type ContentRowProps = {
  content: ContentWithEpisodes[];
 
  category?: string;
};

const ContentRow = ({ content, category = "default" }: ContentRowProps) => {
  if (!content || content.length === 0) return null;

  
  const prevBtnClass = `swiper-button-prev-${category}`;
  const nextBtnClass = `swiper-button-next-${category}`;

  return (
    <section className="relative w-full py-4">
      
      <button
        aria-label="Previous"
        className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 transform bg-black/60 p-2 text-white transition hover:bg-black/80 ${prevBtnClass}`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        aria-label="Next"
        className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 transform bg-black/60 p-2 text-white transition hover:bg-black/80 ${nextBtnClass}`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 8 },
          480: { slidesPerView: 2.5, spaceBetween: 14 },
          790: { slidesPerView: 3.5, spaceBetween: 18 },
          1024: { slidesPerView: 4.5, spaceBetween: 20 },
          1280: { slidesPerView: 5.5, spaceBetween: 22 },
          1536: { slidesPerView: 6.5, spaceBetween: 24 },
        }}
        navigation={{
          nextEl: `.${nextBtnClass}`,
          prevEl: `.${prevBtnClass}`,
        }}
        loop={false} 
      >
        {content.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-40 transform cursor-pointer overflow-hidden rounded-md shadow transition-transform duration-300 hover:scale-105 sm:h-52 md:rounded-lg xl:rounded-xl">
              <MovieDialog content={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ContentRow;