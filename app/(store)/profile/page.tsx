"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck, Mail, User, Calendar, PackageCheck, Heart } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-[85vh] bg-linear-to-b from-background via-background to-accent/20 text-foreground flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl rounded-3xl border border-border bg-card shadow-xl overflow-hidden grid md:grid-cols-5 animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out">
        <div className="md:col-span-2 bg-linear-to-b from-accent/40 to-accent/10 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border/60 relative group">
          <div className="absolute top-0 right-0 size-24 rounded-full bg-furniro-gold/5 blur-2xl pointer-events-none" />

          <div className="relative size-28 rounded-full p-1 bg-linear-to-tr from-furniro-gold via-furniro-gold/40 to-transparent shadow-md mb-4 transition-transform duration-500 group-hover:scale-105">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="size-full rounded-full object-cover bg-card"
              />
            ) : (
              <div className="size-full rounded-full bg-muted flex items-center justify-center">
                <User className="size-12 text-muted-foreground" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-heading font-bold tracking-tight mb-1 truncate max-w-full">
            {user.name}
          </h2>

          <div className="inline-flex items-center gap-1 bg-furniro-gold/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-furniro-gold border border-furniro-gold/20 mb-6">
            <ShieldCheck className="size-3" />
            <span>{user.role}</span>
          </div>

          {/* QUICK STATS */}
          <div className="w-full grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/orders"
              className="p-3 rounded-2xl bg-background/60 border border-border/80 hover:border-furniro-gold/60 transition-all flex flex-col items-center gap-1"
            >
              <PackageCheck className="size-5 text-furniro-gold" />
              <span className="font-bold text-sm">{orders.length}</span>
              <span className="text-muted-foreground text-[10px]">Orders</span>
            </Link>

            <Link
              href="/wishlist"
              className="p-3 rounded-2xl bg-background/60 border border-border/80 hover:border-furniro-gold/60 transition-all flex flex-col items-center gap-1"
            >
              <Heart className="size-5 text-rose-500" />
              <span className="font-bold text-sm">{wishlistItems.length}</span>
              <span className="text-muted-foreground text-[10px]">Wishlist</span>
            </Link>
          </div>
        </div>

        <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between gap-8">
          <div>
            <h3 className="text-sm font-heading font-semibold uppercase tracking-wider text-muted-foreground/80 mb-4">
              Account Overview
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-center gap-4 p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-accent/30 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-card border border-border text-muted-foreground transition-colors group-hover:text-foreground">
                  <User className="size-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </p>
                  <p className="text-sm font-semibold text-foreground/90">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-accent/30 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-card border border-border text-muted-foreground transition-colors group-hover:text-foreground">
                  <Mail className="size-4.5" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-foreground/90 break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-xl border border-border/70 bg-background/50 hover:bg-accent/30 transition-all duration-300 group">
                <div className="p-2 rounded-lg bg-card border border-border text-muted-foreground transition-colors group-hover:text-foreground">
                  <Calendar className="size-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    Session Status
                  </p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Connection
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60 pt-4">
            <Link
              href="/orders"
              className="w-full sm:w-auto px-5 h-11 rounded-xl bg-accent hover:bg-accent/80 text-foreground font-medium text-xs flex items-center justify-center gap-2 transition-all"
            >
              <PackageCheck className="size-4" />
              <span>View Order History</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 h-11 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] transform"
            >
              <LogOut className="size-4" />
              <span>Logout Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
