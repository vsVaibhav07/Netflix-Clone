"use client"
import React, { Suspense } from "react";
import type { Content, Episode } from "@/generated/prisma";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type ContentWithEpisodes = Content & { episodes?: Episode[] };

type SeriesRowProps = {
  content: ContentWithEpisodes[];
  category?: string;
};

const SeriesRow = ({ content, category = "default" }: SeriesRowProps) => {
  if (!content || content.length === 0) return null;

  const prevBtnClass = `swiper-button-prev-${category}`;
  const nextBtnClass = `swiper-button-next-${category}`;

  return (
    <section className="relative w-full py-4">
      {/* Navigation buttons */}
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

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 10 },
          480: { slidesPerView: 2.5, spaceBetween: 14 },
          768: { slidesPerView: 3.5, spaceBetween: 16 },
          1024: { slidesPerView: 4.5, spaceBetween: 18 },
          1280: { slidesPerView: 5.5, spaceBetween: 20 },
        }}
        navigation={{
          nextEl: `.${nextBtnClass}`,
          prevEl: `.${prevBtnClass}`,
        }}
        loop={false}
      >
        {content.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="group relative flex flex-col overflow-hidden rounded-lg bg-zinc-950 shadow-md transition-transform duration-300 hover:scale-105">
              <div className="relative h-40 w-full sm:h-52">
                <Image
                  src={item.thumbnailurl || "/thumbnail.webp"}
                  alt={item.title}
                  fill
                  sizes="absolute"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-black/80 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h2 className="text-sm font-semibold line-clamp-1">
                  {item.episodes?.[0]?.seasonNumber &&
                  item.episodes?.[0]?.episodeNumber
                    ? `S${item.episodes[0].seasonNumber} • E${item.episodes[0].episodeNumber}: `
                    : ""}
                  {item.title}
                </h2>
                {item.description && (
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <Suspense fallback={<div>Loading Button...</div>}>
                  <Link href={`/series/${item.id}`} className="mt-3">
                    <Button className="w-full cursor-pointer bg-purple-500 hover:bg-purple-600">
                      Watch
                    </Button>
                  </Link>
                </Suspense>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SeriesRow;
