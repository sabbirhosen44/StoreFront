"use client";

import { CartItem } from "@/types/cart";
import { useAppDispatch } from "@/store";
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { Trash2 } from "lucide-react";

export default function CartTableItem({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  const subtotal = item.product.price * item.quantity;

  return (
    <tr className="border-b border-border/10 text-center">
      <td className="py-6 pr-4 text-left">
        <div className="flex items-center gap-4">
          <div className="size-20 sm:size-24 bg-furniro-beige rounded-xl overflow-hidden shrink-0 border border-border/10">
            <img
              src={item.product.images?.[0]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-normal text-muted-foreground text-sm sm:text-base truncate max-w-[120px] sm:max-w-xs">
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
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            dispatch(
              updateQuantity({
                productId: item.product.id,
                quantity: parseInt(e.target.value) || 1,
              }),
            )
          }
          className="w-12 h-8 border border-muted-foreground/40 rounded-md text-center text-sm font-medium focus-visible:outline-furniro-gold bg-transparent"
        />
      </td>
      <td className="py-6 px-2 text-foreground font-medium text-sm sm:text-base">
        ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </td>
      <td className="py-6 pl-4 text-right">
        <button
          onClick={() => dispatch(removeFromCart(item.product.id))}
          className="text-furniro-gold hover:text-destructive transition-colors cursor-pointer"
        >
          <Trash2 className="size-5" />
        </button>
      </td>
    </tr>
  );
}
