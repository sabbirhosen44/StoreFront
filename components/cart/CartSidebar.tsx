"use client";

import { useAppSelector, useAppDispatch } from "@/store";
import { toggleSidebar, removeFromCart } from "@/store/slices/cartSlice";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(toggleSidebar())}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background flex flex-col shadow-2xl">
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-heading tracking-wide text-foreground">
              Shopping Cart
            </h2>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ShoppingBag className="size-6 text-muted-foreground/60" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                Your cart is empty.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <div className="size-24 bg-furniro-beige rounded-xl overflow-hidden shrink-0 border border-border/10">
                    <img
                      src={item.product.images?.[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-normal text-foreground truncate">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-sm">
                      <span className="text-foreground">{item.quantity}</span>
                      <span className="text-muted-foreground/60">X</span>
                      <span className="text-furniro-gold font-medium">
                        $
                        {item.product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="text-muted-foreground/40 hover:text-destructive p-1 rounded-full border border-muted-foreground/20 cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-border/40 bg-background space-y-6">
            <div className="flex items-center justify-between text-base">
              <span className="text-foreground font-normal">Subtotal</span>
              <span className="text-furniro-gold font-semibold">
                $
                {subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/cart"
                onClick={() => dispatch(toggleSidebar())}
                className="h-9 border border-foreground rounded-full flex items-center justify-center text-xs font-normal text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => dispatch(toggleSidebar())}
                className="h-9 border border-foreground rounded-full flex items-center justify-center text-xs font-normal text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer"
              >
                Checkout
              </Link>
              <button
                type="button"
                className="h-9 border border-foreground rounded-full flex items-center justify-center text-xs font-normal text-foreground hover:bg-foreground hover:text-background transition-colors cursor-pointer bg-transparent"
              >
                Comparison
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
