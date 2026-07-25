"use client";

import { useAppSelector } from "@/store";
import { PackageCheck, Clock, MapPin, CreditCard, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const { orders } = useAppSelector((state) => state.order);

  return (
    <div className="w-full min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* HERO BANNER */}
      <div className="w-full h-72 sm:h-80 relative flex items-center justify-center overflow-hidden border-b border-border">
        <Image
          src="/images/checkout-bg.jpg"
          alt="Orders banner background"
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
            Order History
          </h1>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-furniro-gold transition-colors duration-200"
            >
              Home
            </Link>
            <span className="text-muted-foreground/60 select-none">&gt;</span>
            <span className="text-muted-foreground font-light">Orders</span>
          </div>
        </div>
      </div>

      {/* MAIN ORDERS LIST */}
      <div className="container-center py-12 lg:py-20 max-w-5xl">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
            <div className="p-6 rounded-full bg-furniro-gold/10 text-furniro-gold">
              <ShoppingBag className="size-16 stroke-[1.5]" />
            </div>
            <div className="max-w-md space-y-2">
              <h2 className="text-2xl font-bold font-heading">No Orders Placed Yet</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                When you place an order during checkout, your purchase history and order details will appear right here!
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-furniro-gold text-white font-medium hover:bg-furniro-gold/90 transition-all cursor-pointer"
            >
              <ArrowLeft className="size-4" />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <h2 className="text-2xl font-bold font-heading">Your Placed Orders ({orders.length})</h2>
            </div>

            <div className="space-y-6">
              {orders.map((order) => {
                const dateFormatted = new Date(order.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-3xl overflow-hidden shadow-xs p-6 sm:p-8 space-y-6"
                  >
                    {/* ORDER HEADER */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-border/60">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold font-heading tracking-wide text-foreground">
                            {order.id}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <PackageCheck className="size-3.5" />
                            <span>{order.status}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Clock className="size-3.5" />
                          <span>Placed on {dateFormatted}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Total Amount</p>
                        <p className="text-2xl font-bold text-furniro-gold">
                          ${order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    {/* ITEMS LIST */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">
                        Ordered Items
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.items.map((item, idx) => {
                          const img = item.product.images?.[0] || "/images/placeholder.jpg";
                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-4 p-3 rounded-2xl bg-accent/20 border border-border/40"
                            >
                              <div className="relative size-16 rounded-xl overflow-hidden bg-card shrink-0">
                                <Image
                                  src={img.replace(/[\[\]"]/g, "")}
                                  alt={item.product.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h5 className="text-sm font-bold font-heading truncate">
                                  {item.product.title}
                                </h5>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  Quantity: <span className="font-semibold text-foreground">{item.quantity}</span> × ${item.product.price}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ADDRESS & PAYMENT INFO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/60 text-xs text-muted-foreground">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="size-4 text-furniro-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-foreground block mb-0.5">Shipping Address:</span>
                          <p>
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                            {order.shippingAddress.streetAddress}, {order.shippingAddress.townCity},{" "}
                            {order.shippingAddress.country} ({order.shippingAddress.zipCode})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CreditCard className="size-4 text-furniro-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-foreground block mb-0.5">Payment Method:</span>
                          <p className="capitalize">
                            {order.paymentMethod === "bank-transfer" ? "Direct Bank Transfer" : "Cash On Delivery"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
