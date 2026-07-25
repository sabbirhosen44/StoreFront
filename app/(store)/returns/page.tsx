"use client";

import Image from "next/image";
import Link from "next/link";
import { RotateCcw, Truck, RefreshCw, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Returns banner background"
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
            Returns Policy
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Returns</span>
          </div>
        </div>
      </div>

      <div className="container-center py-16 lg:py-24 max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-furniro-gold/10 text-furniro-gold text-xs font-bold uppercase tracking-wider">
            <RotateCcw className="size-4" />
            <span>Hassle-Free Returns</span>
          </div>
          <h2 className="text-3xl font-bold font-heading">30-Day Money Back Guarantee</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            We want you to be completely satisfied with your purchase. If you are not entirely happy with your item, we offer an easy 30-day return & exchange policy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="p-3 rounded-xl bg-furniro-gold/10 text-furniro-gold w-fit">
              <RotateCcw className="size-6" />
            </div>
            <h3 className="text-lg font-bold font-heading">30 Days Return</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Items can be returned within 30 days of receiving your package.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="p-3 rounded-xl bg-furniro-gold/10 text-furniro-gold w-fit">
              <Truck className="size-6" />
            </div>
            <h3 className="text-lg font-bold font-heading">Free Return Pickup</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We schedule convenient pickup directly from your doorstep address.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="p-3 rounded-xl bg-furniro-gold/10 text-furniro-gold w-fit">
              <RefreshCw className="size-6" />
            </div>
            <h3 className="text-lg font-bold font-heading">Instant Refund</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Refunds are processed within 3-5 business days upon item inspection.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-accent/20 border border-border/60 space-y-4">
          <h3 className="text-xl font-bold font-heading">Return Conditions</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500 shrink-0" />
              <span>Products must be unused, unwashed, and in original packaging with tags intact.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500 shrink-0" />
              <span>Proof of purchase (Order ID or Invoice receipt) must accompany the return.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="size-4 text-emerald-500 shrink-0" />
              <span>Discounted or promotional items are eligible for exchange or store credit.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
