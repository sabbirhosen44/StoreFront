"use client";

import { Category } from "@/types/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  useEffect(() => {
    setSwiperLoaded(true);
  }, []);

  return (
    <div className="w-full relative px-0 md:px-12">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1.3}
        grabCursor={true}
        loop={categories.length > 3}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        breakpoints={{
          480: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            allowTouchMove: true,
          },
        }}
        className={`w-full !overflow-visible lg:!overflow-hidden flex gap-6 [&_.swiper-wrapper]:flex ${
          !swiperLoaded
            ? "[&_.swiper-wrapper]:gap-5 sm:[&_.swiper-wrapper]:gap-6"
            : ""
        }`}
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className={
              !swiperLoaded
                ? "!w-[calc(75%-15px)] sm:!w-[calc(45%-20px)] lg:!w-[calc(33.333%-16px)] shrink-0"
                : ""
            }
          >
            <Link
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center gap-6 w-full"
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-sm border border-border/40 transition-all duration-500 ease-out group-hover:shadow-md group-hover:border-border">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 480px) 75vw, (max-width: 768px) 45vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                  priority={category.id <= 3}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <span className="text-lg md:text-xl font-bold font-heading text-foreground tracking-wide transition-colors duration-300 group-hover:text-furniro-gold text-center">
                {category.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 text-foreground border border-border p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-40 hover:bg-furniro-gold hover:text-white hidden md:block cursor-pointer">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 text-foreground border border-border p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-40 hover:bg-furniro-gold hover:text-white hidden md:block cursor-pointer">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="swiper-pagination-custom flex justify-center gap-2 mt-10 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-muted-foreground/40 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:bg-furniro-gold [&_.swiper-pagination-bullet-active]:w-7 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet]:inline-block [&_.swiper-pagination-bullet]:cursor-pointer" />
    </div>
  );
}
