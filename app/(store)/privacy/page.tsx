"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Privacy policy banner background"
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
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Privacy</span>
          </div>
        </div>
      </div>

      <div className="container-center py-16 lg:py-24 max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-furniro-gold/10 text-furniro-gold text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="size-4" />
            <span>Data Protection & Privacy</span>
          </div>
          <h2 className="text-3xl font-bold font-heading">Your Security is Our Priority</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            This Privacy Policy describes how StoreFront collects, uses, and shares your personal information when you visit or make a purchase from our website. We respect your privacy and are committed to protecting your personal data.
          </p>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2 text-foreground">
              <Lock className="size-5 text-furniro-gold" />
              1. Information We Collect
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              When you visit the site, we automatically collect certain information about your device, including details about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, when you make a purchase, we collect billing and shipping details.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2 text-foreground">
              <Eye className="size-5 text-furniro-gold" />
              2. How We Use Your Information
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2 text-foreground">
              <FileText className="size-5 text-furniro-gold" />
              3. Data Retention & Cookie Usage
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information. We use essential cookies to maintain your login session and shopping cart state securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
