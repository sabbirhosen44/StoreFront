"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { HEADER_ACTIONS, NAV_LINKS } from "@/constants/navigation";
import {
  Menu,
  LogIn,
  UserPlus,
  LayoutDashboard,
  User,
  LogOut,
  PackageCheck,
  X,
  Search as SearchIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/slices/cartSlice";
import { logout } from "@/store/slices/authSlice";
import CartSidebar from "@/components/cart/CartSidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { user } = useAppSelector((state) => state.auth);

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?title=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-border transition-colors duration-300">
      <div className="py-4">
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
                sizes="(max-width: 768px) 32px, 40px"
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
              const isWishlistButton = action.label?.toLowerCase() === "wishlist";
              const isSearchButton = action.label?.toLowerCase() === "search";
              const isAccountButton = action.label?.toLowerCase() === "account";

              const handleClick = () => {
                if (isCartButton) dispatch(toggleSidebar());
                if (isWishlistButton) router.push("/wishlist");
                if (isSearchButton) setIsSearchOpen((prev) => !prev);
              };

              const renderButtonContent = () => (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClick}
                  className={`hover:bg-accent/50 cursor-pointer relative transition-all ${
                    !action.showOnMobile ? "hidden sm:flex" : "flex"
                  } ${
                    isAccountButton && user ? "border border-furniro-gold/20" : ""
                  } ${
                    isSearchButton && isSearchOpen ? "text-furniro-gold bg-accent/60" : ""
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

                  {isCartButton && totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-furniro-gold text-white text-[0.75rem] size-4 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in duration-200">
                      {totalCartCount}
                    </span>
                  )}

                  {isWishlistButton && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[0.75rem] size-4 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in duration-200">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              );

              if (isAccountButton) {
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
                        {user ? `Hi, ${user.name}` : "Welcome Guest"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/60" />

                      {user ? (
                        <>
                          {user.role === "admin" && (
                            <DropdownMenuItem
                              onClick={() => router.push("/admin")}
                              className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer focus:bg-accent text-furniro-gold transition-colors duration-150"
                            >
                              <LayoutDashboard className="size-4 opacity-70" />
                              <span>Dashboard</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => router.push("/profile")}
                            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer focus:bg-accent transition-colors duration-150"
                          >
                            <User className="size-4 opacity-70" />
                            <span>My Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push("/orders")}
                            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer focus:bg-accent transition-colors duration-150"
                          >
                            <PackageCheck className="size-4 opacity-70" />
                            <span>My Orders</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/60" />
                          <DropdownMenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg cursor-pointer focus:bg-destructive/10 text-destructive transition-colors duration-150"
                          >
                            <LogOut className="size-4 opacity-70" />
                            <span>Logout</span>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
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
                      <div className="flex flex-col items-center gap-4">
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            className="text-lg font-medium text-furniro-gold hover:opacity-80 transition-opacity"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/profile"
                          className="text-lg font-medium hover:text-furniro-gold transition-colors"
                        >
                          Account ({user.name})
                        </Link>
                        <Link
                          href="/orders"
                          className="text-lg font-medium hover:text-furniro-gold transition-colors"
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-sm font-medium text-destructive hover:opacity-80 transition-opacity"
                        >
                          Logout
                        </button>
                      </div>
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
      </div>

      {/* DROPDOWN SEARCH BAR OVERLAY */}
      {isSearchOpen && (
        <div className="w-full bg-accent/40 border-t border-border py-3 px-4 animate-in slide-in-from-top-2 duration-200">
          <div className="container-center max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search products by name or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-background border-border pr-24 pl-4 h-11 text-sm rounded-xl focus-visible:ring-furniro-gold w-full text-foreground shadow-sm"
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 px-3 rounded-lg bg-furniro-gold text-white text-xs font-semibold hover:bg-furniro-gold/90 cursor-pointer flex items-center gap-1"
                >
                  <SearchIcon className="size-3.5" />
                  <span>Search</span>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(false)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CartSidebar />
    </header>
  );
}
