"use client";

import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AVAILABLE_COLORS,
  AVAILABLE_SIZES,
  PRODUCT_BREADCRUMB_BASE,
  PRODUCT_TABS,
} from "@/constants/product";
import { Product } from "@/types/product";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { addToCart, toggleSidebar } from "@/store/slices/cartSlice";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const dispatch = useAppDispatch();
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://placehold.co/600x400"];

  const [activeImage, setActiveImage] = useState<string>(images[0]);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    dispatch(toggleSidebar());
  };

  return (
    <div className="w-full min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full bg-furniro-beige py-4 border-b border-border/40">
        <div className="container-center flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
          {PRODUCT_BREADCRUMB_BASE.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <Link
                href={crumb.href}
                className="text-muted-foreground font-medium hover:text-furniro-gold transition-colors cursor-pointer"
              >
                {crumb.label}
              </Link>
              <span className="text-muted-foreground/40 font-light select-none">
                &gt;
              </span>
            </div>
          ))}
          <span className="border-l border-muted-foreground/40 pl-3 font-normal text-foreground truncate max-w-[180px] sm:max-w-xs md:max-w-md select-none">
            {product.title}
          </span>
        </div>
      </div>

      <div className="container-center py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-24 items-start">
          {/* Gallery Engine */}
          <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto shrink-0 pb-2 md:pb-0 scrollbar-none">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`size-16 sm:size-20 bg-furniro-beige rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    activeImage === img
                      ? "border-furniro-gold scale-95"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 bg-furniro-beige rounded-xl overflow-hidden aspect-square sm:aspect-[4/5] max-h-[400px] sm:max-h-[550px] border border-border/20 shadow-sm">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Frame */}
          <div className="flex flex-col pt-2 lg:pt-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-heading text-foreground mb-2 tracking-wide leading-tight">
              {product.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground mb-4">
              $
              {product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>

            <div className="flex items-center gap-4 mb-5 border-b border-border/40 pb-5">
              <div className="flex text-amber-400 text-sm tracking-tighter">
                ★★★★★
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground border-l border-border/60 pl-4">
                5 Customer Reviews
              </span>
            </div>

            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6 font-normal max-w-xl">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 mb-5">
              <span className="text-xs sm:text-sm tracking-wider uppercase text-muted-foreground font-medium">
                Size
              </span>
              <div className="flex gap-3">
                {AVAILABLE_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="size-8 rounded-md bg-furniro-beige text-foreground hover:bg-furniro-gold hover:text-white transition-all text-xs font-medium border border-transparent shadow-sm cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <span className="text-xs sm:text-sm tracking-wider uppercase text-muted-foreground font-medium">
                Color
              </span>
              <div className="flex gap-3">
                {AVAILABLE_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    style={{ backgroundColor: color }}
                    className="size-8 rounded-full border border-border/40 hover:scale-110 transition-transform cursor-pointer shadow-sm"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-b border-border/40 pb-10 mb-8">
              <div className="flex items-center border border-muted-foreground/60 rounded-xl h-14 bg-background overflow-hidden px-1">
                <button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  className="w-10 h-full flex items-center justify-center text-lg font-medium hover:bg-muted/40 transition-colors rounded-l-lg cursor-pointer"
                >
                  -
                </button>
                <Input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-10 text-center h-full border-none shadow-none focus-visible:ring-0 text-sm font-semibold pointer-events-none p-0 bg-transparent"
                />
                <button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  className="w-10 h-full flex items-center justify-center text-lg font-medium hover:bg-muted/40 transition-colors rounded-r-lg cursor-pointer"
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="bg-transparent text-foreground hover:bg-foreground hover:text-background border border-foreground h-14 px-6 sm:px-10 rounded-xl font-normal text-base transition-all duration-200 shadow-sm flex-1 sm:flex-none cursor-pointer"
              >
                Add To Cart
              </Button>
              <Button className="bg-transparent text-foreground hover:bg-foreground hover:text-background border border-foreground h-14 px-6 sm:px-10 rounded-xl font-normal text-base transition-all duration-200 shadow-sm flex-1 sm:flex-none cursor-pointer">
                + Compare
              </Button>
            </div>

            <div className="flex flex-col gap-3 text-xs sm:text-sm text-muted-foreground/90 font-normal">
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <span>SKU</span>
                <span className="text-foreground/80">: SS001</span>
              </div>
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <span>Category</span>
                <span className="capitalize text-foreground/80">
                  : {product.category.name}
                </span>
              </div>
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <span>Tags</span>
                <span className="capitalize text-foreground/80">
                  : {product.category.name}, Home, Products
                </span>
              </div>
              <div className="grid grid-cols-[90px_1fr] gap-2 items-center">
                <span>Share</span>
                <span className="flex gap-4 text-foreground/80 font-medium">
                  :
                  <span className="hover:text-furniro-gold cursor-pointer transition-colors">
                    Facebook
                  </span>
                  <span className="hover:text-furniro-gold cursor-pointer transition-colors">
                    Twitter
                  </span>
                  <span className="hover:text-furniro-gold cursor-pointer transition-colors">
                    LinkedIn
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="w-full border-t border-border/40 py-12 bg-background">
        <div className="container-center">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-14 border-b border-border/20 pb-6 mb-8 text-base sm:text-lg md:text-xl font-medium">
            {PRODUCT_TABS.map((tab) => (
              <span
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-6 -mb-[26px] cursor-pointer transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "text-foreground border-foreground font-semibold"
                    : "text-muted-foreground/60 border-transparent hover:text-foreground"
                }`}
              >
                {tab.label}
              </span>
            ))}
          </div>
          <div className="max-w-4xl mx-auto flex flex-col gap-6 text-sm sm:text-base text-muted-foreground/90 leading-relaxed pt-4">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "info" && (
              <p>Additional specifications and build dimensions.</p>
            )}
            {activeTab === "reviews" && (
              <p>Customer ratings and verification feedback lines.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12 max-w-5xl mx-auto">
            <div className="bg-furniro-beige rounded-2xl p-2 sm:p-4 aspect-video flex items-center justify-center overflow-hidden border border-border/20 shadow-sm">
              <img
                src={images[0]}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="bg-furniro-beige rounded-2xl p-2 sm:p-4 aspect-video flex items-center justify-center overflow-hidden border border-border/20 shadow-sm">
              <img
                src={images[0]}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related Grid Section */}
      {relatedProducts.length > 0 && (
        <div className="w-full border-t border-border/40 py-12 sm:py-20 bg-background">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground text-center mb-10 tracking-wide">
              Related Products
            </h2>
            <div className="w-full">
              <ProductGrid products={relatedProducts} viewMode="grid" />
            </div>
            <Link
              href="/products"
              className="mt-14 inline-flex items-center justify-center px-16 h-12 border border-furniro-gold text-furniro-gold hover:bg-furniro-gold hover:text-white font-semibold text-sm rounded-sm transition-all duration-300 cursor-pointer bg-transparent shadow-sm"
            >
              Show More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
