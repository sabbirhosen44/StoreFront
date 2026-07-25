"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Truck, Headphones, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: "High Quality",
      description: "Crafted from top-tier materials with extreme attention to detail.",
    },
    {
      icon: ShieldCheck,
      title: "Warranty Protection",
      description: "Over 2 years of coverage for all our apparel & product lines.",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Order over $150 and enjoy fast, free international delivery.",
    },
    {
      icon: Headphones,
      title: "24 / 7 Support",
      description: "Dedicated support team available round the clock for your needs.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="About Us banner background"
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
            About Us
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">About</span>
          </div>
        </div>
      </div>

      {/* BRAND STORY */}
      <div className="container-center py-16 lg:py-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-furniro-gold/10 text-furniro-gold text-xs font-bold uppercase tracking-wider">
              Our Journey & Values
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading leading-tight">
              Designing Modern, Premium Products For Elevated Living
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
              At StoreFront, we believe that exceptional design and uncompromising quality should be accessible to everyone. Founded with a vision to redefine online shopping, we curate premium items that fuse timeless craftsmanship with modern aesthetic sensibility.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
              Every product in our collection undergoes rigorous quality control to ensure maximum durability, comfort, and performance. Whether you are upgrading your wardrobe or discovering everyday essentials, we are committed to delivering excellence.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-furniro-gold text-white font-medium shadow-md hover:bg-furniro-gold/90 transition-all cursor-pointer active:scale-98"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-96 sm:h-[450px] w-full rounded-3xl overflow-hidden border border-border shadow-xl">
            <Image
              src="/images/hero-bg.jpg"
              alt="StoreFront Brand Story"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs hover:border-furniro-gold/50 transition-all duration-300 group"
              >
                <div className="p-4 rounded-2xl bg-furniro-gold/10 text-furniro-gold w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="size-7" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
