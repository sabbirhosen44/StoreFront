"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HEADER_ACTIONS, NAV_LINKS } from "@/constants/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background py-4 shadow-sm border-b border-border">
      <div className="container-center flex items-center justify-between ">
        {/* --- Logo Section --- */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="relative size-8 md:size-10">
            <Image
              src="/images/logo.png"
              alt="StoreFront Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-heading">
            StoreFront
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-base font-medium transition-colors hover:text-furniro-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* --- Icon Actions --- */}
        <div className="flex items-center gap-4 md:gap-8">
          {HEADER_ACTIONS.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              size="icon"
              className={`hover:bg-accent/50 cursor-pointer relative ${
                !action.showOnMobile ? "hidden sm:flex" : "flex"
              }`}
            >
              <action.icon className="size-6 stroke-[1.5px]" />
              {action.hasBadge && (
                <span className="absolute -top-1 -right-1 bg-furniro-gold text-white text-[0.75rem] size-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              )}
            </Button>
          ))}

          {/* --- Mobile Menu --- */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-96  bg-background">
                <nav className="flex flex-col items-center gap-8 m-12">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-xl font-medium hover:text-furniro-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
