"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { HEADER_ACTIONS, NAV_LINKS } from "@/constants/navigation";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/slices/cartSlice";
import CartSidebar from "@/components/cart/CartSidebar";

export default function Header() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

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
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {HEADER_ACTIONS.map((action) => {
            const isCartButton =
              action.id === "cart" || action.label?.toLowerCase() === "cart";

            return (
              <Button
                key={action.id}
                variant="ghost"
                size="icon"
                onClick={
                  isCartButton ? () => dispatch(toggleSidebar()) : undefined
                }
                className={`hover:bg-accent/50 cursor-pointer relative ${
                  !action.showOnMobile ? "hidden sm:flex" : "flex"
                }`}
              >
                <action.icon className="size-6 stroke-[1.5px]" />

                {action.hasBadge && isCartButton && totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-furniro-gold text-white text-[0.75rem] size-4 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in duration-200">
                    {totalCartCount}
                  </span>
                )}

                {action.hasBadge && !isCartButton && (
                  <span className="absolute -top-1 -right-1 bg-furniro-gold text-white text-[0.75rem] size-4 rounded-full flex items-center justify-center font-bold">
                    0
                  </span>
                )}
              </Button>
            );
          })}

          {/* --- Mobile Menu --- */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-96 bg-background">
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

      <CartSidebar />
    </header>
  );
}
