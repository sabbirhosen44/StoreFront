"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromWishlist, clearWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { items } = useAppSelector((state) => state.wishlist);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast(`"${product.title}" added to shopping cart!`, "success", "Added to Cart");
  };

  const handleRemove = (id: number, title: string) => {
    dispatch(removeFromWishlist(id));
    toast(`"${title}" removed from your wishlist.`, "info", "Removed");
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Wishlist banner background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-xs" />
        <div className="relative flex flex-col items-center justify-center text-center p-4">
          <div className="relative size-10 mb-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium font-heading tracking-wide">
            My Wishlist
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Wishlist</span>
          </div>
        </div>
      </div>

      {/* MAIN WISHLIST GRID */}
      <div className="container-center py-12 lg:py-20">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
            <div className="p-6 rounded-full bg-furniro-gold/10 text-furniro-gold">
              <Heart className="size-16 stroke-[1.5]" />
            </div>
            <div className="max-w-md space-y-2">
              <h2 className="text-2xl font-bold font-heading">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Explore our store catalog and click the heart icon on any product to save your favorite items here for later!
              </p>
            </div>
            <Link href="/products">
              <Button className="px-8 py-6 rounded-xl bg-furniro-gold text-white font-medium hover:bg-furniro-gold/90 transition-all gap-2 cursor-pointer">
                <ArrowLeft className="size-4" />
                <span>Browse Products</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
              <div>
                <h2 className="text-2xl font-bold font-heading">Saved Items ({items.length})</h2>
                <p className="text-sm text-muted-foreground">Manage your bookmarked items and move them to cart anytime.</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(clearWishlist());
                  toast("Cleared all wishlist items.", "info");
                }}
                className="text-xs border-destructive/40 text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => {
                const imageUrl = product.images?.[0] || "/images/placeholder.jpg";
                return (
                  <div
                    key={product.id}
                    className="group bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full bg-accent/20 overflow-hidden">
                      <Image
                        src={imageUrl.replace(/[\[\]"]/g, "")}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <button
                        onClick={() => handleRemove(product.id, product.title)}
                        className="absolute top-3 right-3 p-2.5 rounded-full bg-card/80 backdrop-blur-md text-destructive hover:bg-destructive hover:text-white transition-colors cursor-pointer shadow-sm"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          {product.category?.name || "General"}
                        </span>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-base font-bold font-heading line-clamp-1 hover:text-furniro-gold transition-colors mt-1">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-lg font-bold text-furniro-gold mt-2">
                          ${product.price?.toFixed(2)}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 py-5 rounded-xl bg-furniro-gold hover:bg-furniro-gold/90 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingCart className="size-4" />
                          <span>Add to Cart</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
