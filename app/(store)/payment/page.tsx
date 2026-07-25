"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, Landmark, ShieldCheck, DollarSign } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Payment Options banner background"
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
            Payment Options
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Payment</span>
          </div>
        </div>
      </div>

      <div className="container-center py-16 lg:py-24 max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-furniro-gold/10 text-furniro-gold text-xs font-bold uppercase tracking-wider">
            <CreditCard className="size-4" />
            <span>Flexible & Secure Checkout</span>
          </div>
          <h2 className="text-3xl font-bold font-heading">Accepted Payment Methods</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            StoreFront supports multiple payment gateways and payment options to ensure a smooth, transparent, and secure checkout experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-card border border-border space-y-4">
            <div className="p-3.5 rounded-2xl bg-furniro-gold/10 text-furniro-gold w-fit">
              <Landmark className="size-7" />
            </div>
            <h3 className="text-xl font-bold font-heading">Direct Bank Transfer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transfer funds directly from your bank account. Use your unique Order ID as the reference payment code. Your order ships as soon as funds clear.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border space-y-4">
            <div className="p-3.5 rounded-2xl bg-furniro-gold/10 text-furniro-gold w-fit">
              <DollarSign className="size-7" />
            </div>
            <h3 className="text-xl font-bold font-heading">Cash On Delivery (COD)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pay with cash upon package delivery directly to your courier at your doorstep. Simple, safe, and convenient.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-4">
          <ShieldCheck className="size-8 text-emerald-500 shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="text-lg font-bold font-heading text-foreground">256-Bit SSL Encrypted Security</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All payment transactions and customer communication on StoreFront are protected with bank-grade 256-bit encryption. Your financial data is never exposed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
