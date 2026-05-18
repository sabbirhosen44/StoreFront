"use client";

import { Category } from "@/types/category";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [_, setInit] = useState<boolean>(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
        );
        if (!res.ok) throw new Error("Failed to fetch data from API");
        const data: Category[] = await res.json();

        if (!data || data.length === 0) {
          throw new Error("API returned an empty array");
        }

        setCategories(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-background py-14 md:py-20">
        <div className="container-center text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-9 bg-muted rounded w-48 mx-auto" />
            <div className="h-4 bg-muted rounded w-72 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[480px] bg-muted rounded-xl w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-center w-full bg-background py-14 md:py-20 overflow-hidden">
      <div className="container-center relative group">
        <div className="text-center space-y-2 mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-foreground tracking-tight">
            Browse The Categories
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          {error && (
            <p className="text-destructive text-xs font-semibold mt-2">
              Note: Using local fallback data ({error})
            </p>
          )}
        </div>

        <div className="w-full relative px-0 md:px-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.3}
            grabCursor={true}
            loop={categories.length > 3}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
              setInit(true);
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
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
            className="w-full !overflow-visible lg:!overflow-hidden"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
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

          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 text-foreground border border-border p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 swiper-button-disabled:opacity-40 hover:bg-furniro-gold hover:text-white hidden md:block cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 text-foreground border border-border p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 swiper-button-disabled:opacity-40 hover:bg-furniro-gold hover:text-white hidden md:block cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="custom-swiper-pagination flex justify-center gap-2 mt-10 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:bg-muted-foreground/40 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:bg-furniro-gold [&_.swiper-pagination-bullet-active]:w-7 [&_.swiper-pagination-bullet-active]:rounded-full" />
      </div>
    </section>
  );
}
