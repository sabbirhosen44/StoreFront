"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { HEADER_ACTIONS, NAV_LINKS } from "@/constants/navigation";
import { Menu, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/slices/cartSlice";
import CartSidebar from "@/components/cart/CartSidebar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItems = useAppSelector((state) => state.cart.items);
  const { user } = useAppSelector((state) => state.auth);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background py-4 shadow-sm border-b border-border">
      <div className="container-center flex items-center justify-between">
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

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          {HEADER_ACTIONS.map((action) => {
            const isCartButton = action.label?.toLowerCase() === "cart";
            const isAccountButton = action.label?.toLowerCase() === "account";

            const renderButtonContent = () => (
              <Button
                variant="ghost"
                size="icon"
                onClick={
                  isCartButton ? () => dispatch(toggleSidebar()) : undefined
                }
                className={`hover:bg-accent/50 cursor-pointer relative transition-all ${
                  !action.showOnMobile ? "hidden sm:flex" : "flex"
                } ${
                  isAccountButton && user ? "border border-furniro-gold/20" : ""
                }`}
              >
                {isAccountButton && user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="size-6 rounded-full object-cover animate-in fade-in zoom-in duration-300"
                  />
                ) : (
                  <action.icon className="size-6 stroke-[1.5px]" />
                )}

                {action.hasBadge && isCartButton && totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-furniro-gold text-white text-[0.75rem] size-4 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in duration-200">
                    {totalCartCount}
                  </span>
                )}
              </Button>
            );

            if (isAccountButton) {
              if (user) {
                return (
                  <Link key={action.id} href="/profile">
                    {renderButtonContent()}
                  </Link>
                );
              }

              return (
                <DropdownMenu key={action.id}>
                  <DropdownMenuTrigger asChild>
                    {renderButtonContent()}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 mt-2 rounded-xl border border-border bg-card p-1 shadow-md animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 font-heading">
                      Welcome Guest
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/60" />
                    <DropdownMenuItem
                      onClick={() => router.push("/login")}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer focus:bg-accent hover:text-furniro-gold transition-colors duration-150"
                    >
                      <LogIn className="size-4 opacity-70" />
                      <span>Sign In</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/register")}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer focus:bg-accent hover:text-furniro-gold transition-colors duration-150"
                    >
                      <UserPlus className="size-4 opacity-70" />
                      <span>Create Account</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return <div key={action.id}>{renderButtonContent()}</div>;
          })}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto pb-8 bg-background">
                <nav className="flex flex-col items-center gap-6 mt-8">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="text-xl font-medium hover:text-furniro-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <hr className="w-1/2 border-border/60 my-2" />

                  {user ? (
                    <Link
                      href="/profile"
                      className="text-lg font-medium text-furniro-gold hover:opacity-80 transition-opacity"
                    >
                      Account ({user.name})
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <Link
                        href="/login"
                        className="text-lg font-medium text-furniro-gold hover:opacity-80 transition-opacity"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
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
