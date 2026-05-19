"use client";

import {
  FolderTree,
  LayoutDashboard,
  Menu,
  ShoppingBag,
  Users,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: ShoppingBag },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/users", label: "User Directory", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-40 shadow-xs">
        <span className="font-heading font-bold text-lg tracking-tight text-furniro-gold">
          Admin Control Center
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border border-border rounded-xl bg-background text-muted-foreground cursor-pointer transition-colors active:bg-accent"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Sidebar Drawer System */}
      <aside
        className={`fixed md:sticky top-[61px] md:top-0 left-0 bottom-0 z-30 w-64 border-r border-border bg-card p-6 transform transition-transform duration-300 md:translate-x-0 flex flex-col justify-between h-[calc(100vh-61px)] md:h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="hidden md:block">
            <span className="font-heading font-bold text-2xl tracking-tight bg-linear-to-r from-furniro-gold to-foreground bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>

          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-furniro-gold text-white shadow-xs"
                      : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                  }`}
                >
                  <link.icon className="size-4.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Back to Storefront Link */}
            <div className="pt-6 mt-6 border-t border-border">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent/40 hover:text-foreground transition-all"
              >
                <ArrowLeft className="size-4.5" />
                <span>Back to Storefront</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Version Footer */}
        <div className="text-center text-[11px] text-muted-foreground/50 border-t border-border/60 pt-4">
          StoreFront v2026.1
        </div>
      </aside>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-x-0 bottom-0 top-[61px] z-20 bg-background/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Viewport content layout */}
      <main className="flex-1 p-4 sm:p-8 md:p-10 overflow-x-hidden w-full">
        {children}
      </main>
    </div>
  );
}
