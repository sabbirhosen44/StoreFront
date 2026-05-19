"use client";

import { useAppDispatch } from "@/store";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { CartItem } from "@/types/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartTableItem({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  const subtotal = item.product.price * item.quantity;
  const thumbnail = item.product.images?.[0] || "https://placehold.co/600x400";

  return (
    <tr className="border-b border-border/10 text-center transition-colors duration-200 hover:bg-muted/5">
      <td className="py-6 pr-4 text-left pl-6">
        <div className="flex items-center gap-4">
          <div className="relative size-20 sm:size-24 bg-furniro-beige rounded-xl overflow-hidden shrink-0 border border-border/10 transition-transform duration-300 hover:scale-102">
            <Image
              src={thumbnail}
              alt={item.product.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="font-normal text-muted-foreground text-sm sm:text-base truncate max-w-[120px] sm:max-w-xs block">
            {item.product.title}
          </span>
        </div>
      </td>
      <td className="py-6 px-2 text-muted-foreground text-sm sm:text-base">
        $
        {item.product.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="py-6 px-2">
        <div className="inline-flex items-center justify-center">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              dispatch(
                updateQuantity({
                  productId: item.product.id,
                  quantity: parseInt(e.target.value) || 1,
                })
              )
            }
            className="w-16 h-10 border border-muted-foreground/30 rounded-md text-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-furniro-gold bg-transparent transition-all duration-200"
          />
        </div>
      </td>
      <td className="py-6 px-2 text-foreground font-medium text-sm sm:text-base transition-all duration-300">
        ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </td>
      <td className="py-6 pl-4 text-right pr-6">
        <button
          onClick={() => dispatch(removeFromCart(item.product.id))}
          className="text-furniro-gold hover:text-destructive transition-colors duration-300 cursor-pointer p-2 rounded-full hover:bg-destructive/5 active:scale-95 inline-flex items-center justify-center"
        >
          <Trash2 className="size-5" />
        </button>
      </td>
    </tr>
  );
}
