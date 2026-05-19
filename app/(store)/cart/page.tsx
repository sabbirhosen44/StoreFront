"use client";

import CartTableItem from "@/components/cart/CartTableItem";
import { useAppSelector } from "@/store";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border/10">
        <Image
          src="/images/cart-bg.jpg"
          alt="Cart banner background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/5 backdrop-blur-xs" />
        <div className="relative flex flex-col items-center justify-center text-center p-4">
          <div className="relative size-10 mb-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium font-heading tracking-wide text-foreground">
            Cart
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Cart</span>
          </div>
        </div>
      </div>

      <div className="container-center py-12 lg:py-20">
        {items.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-semibold mb-4 text-foreground/90">
              Your cart is currently empty
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center h-12 px-12 border border-furniro-gold text-furniro-gold font-medium rounded-sm hover:bg-furniro-gold hover:text-white transition-all duration-300 ease-out cursor-pointer shadow-xs active:scale-[0.98]"
            >
              Fill Your Cart
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 overflow-x-auto scrollbar-none w-full border border-border/10 rounded-lg shadow-2xs">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-furniro-beige text-foreground font-medium text-sm sm:text-base">
                    <th className="py-4 pr-4 rounded-l-md text-left pl-6">
                      Product
                    </th>
                    <th className="py-4 px-2">Price</th>
                    <th className="py-4 px-2">Quantity</th>
                    <th className="py-4 px-2">Subtotal</th>
                    <th className="py-4 pl-4 rounded-r-md text-right pr-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {items.map((item) => (
                    <CartTableItem key={item.product.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-furniro-beige dark:bg-card border border-border/10 rounded-xl p-8 flex flex-col items-center text-center shadow-xs transition-all duration-300 hover:shadow-sm">
              <h2 className="text-2xl font-bold font-heading tracking-wider mb-8">
                Cart Totals
              </h2>
              <div className="w-full space-y-5 text-sm sm:text-base border-b border-border/20 pb-6 mb-6">
                <div className="flex justify-between px-4">
                  <span className="font-medium text-foreground">Subtotal</span>
                  <span className="text-muted-foreground font-medium transition-all duration-300">
                    $
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between px-4">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-furniro-gold font-bold text-lg sm:text-xl transition-all duration-300">
                    $
                    {subtotal.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center h-14 border border-foreground rounded-xl text-base font-normal text-foreground hover:bg-foreground hover:text-background transition-all duration-300 ease-out tracking-wide cursor-pointer shadow-sm active:scale-[0.99]"
              >
                Check Out
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
