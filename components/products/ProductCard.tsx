// components/products/ProductCard.tsx
"use client";

import { Product } from "@/types/product";
import { Heart, Share2, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const thumbnail = product.images?.[0] || "https://placehold.co/600x400";

  const isSale = product.id % 3 === 0;
  const isNew = product.id % 4 === 0;

  // --- LIST VIEW MODE ---
  if (viewMode === "list") {
    return (
      <div className="flex flex-col sm:flex-row w-full bg-furniro-beige/40 dark:bg-card border border-border/40 overflow-hidden rounded-sm group transition-all duration-300 hover:shadow-md cursor-pointer">
        <div className="relative w-full sm:w-72 aspect-square shrink-0 bg-muted">
          <Image
            src={thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="p-8 flex flex-col justify-between flex-1 gap-4">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-heading">
                {product.title}
              </h3>
              <span className="text-sm font-semibold text-furniro-gold bg-furniro-gold/10 px-3 py-1 rounded-sm">
                {product.category.name}
              </span>
            </div>
            <p className="text-muted-foreground text-base max-w-xl line-clamp-3 mb-4">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-foreground">
                $
                {product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {isSale && (
                <span className="text-price-old">
                  $
                  {(product.price * 1.3).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 border-t border-border/60 pt-4">
            <Button className="bg-furniro-gold text-white font-semibold py-6 px-8 rounded-sm hover:bg-furniro-gold/90 transition-all cursor-pointer">
              Add to cart
            </Button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1.5 text-sm font-medium hover:text-furniro-gold transition-colors cursor-pointer ${
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground"
              }`}
            >
              <Heart className={`size-5 ${isLiked ? "fill-current" : ""}`} />{" "}
              Like
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-furniro-gold transition-colors cursor-pointer">
              <ArrowRightLeft className="size-5" /> Compare
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW MODE ---
  return (
    <div className="group relative flex flex-col w-full bg-furniro-beige/40 dark:bg-card overflow-hidden rounded-sm transition-all duration-300 cursor-pointer">
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <Image
          src={thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          unoptimized
        />

        {/* Badges derived via global custom color rules */}
        {isSale && (
          <span className="absolute top-6 right-6 size-12 bg-furniro-badge-sale text-white rounded-full flex items-center justify-center text-sm font-medium z-20">
            -30%
          </span>
        )}
        {!isSale && isNew && (
          <span className="absolute top-6 right-6 size-12 bg-furniro-badge-new text-white rounded-full flex items-center justify-center text-sm font-medium z-20">
            New
          </span>
        )}

        {/* Hover Action Layer Overlay */}
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-10 gap-6">
          <Button className="w-full max-w-[200px] bg-background text-furniro-gold font-semibold py-6 rounded-sm shadow-sm hover:bg-furniro-gold hover:text-white transition-all cursor-pointer text-base">
            Add to cart
          </Button>
          <div className="flex items-center gap-5 text-white text-sm font-semibold select-none">
            <button className="flex items-center gap-1 hover:text-furniro-gold transition-colors cursor-pointer">
              <Share2 className="size-4" /> Share
            </button>
            <button className="flex items-center gap-1 hover:text-furniro-gold transition-colors cursor-pointer">
              <ArrowRightLeft className="size-4" /> Compare
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer ${
                isLiked ? "text-red-500" : ""
              }`}
            >
              <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />{" "}
              Like
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-2 bg-furniro-beige/30 dark:bg-neutral-900/40">
        <h3 className="text-xl font-bold tracking-tight text-foreground line-clamp-1 font-heading">
          {product.title}
        </h3>
        <p className="text-sm font-medium text-muted-foreground line-clamp-1">
          {product.category.name}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
          <span className="text-lg font-bold text-foreground">
            $
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {isSale && (
            <span className="text-price-old">
              $
              {(product.price * 1.3).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
