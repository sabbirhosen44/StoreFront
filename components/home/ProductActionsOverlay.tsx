"use client";

import { PRODUCT_ACTIONS } from "@/constants/productActions";

type OverlayProps = {
  productId: number;
};

export default function ProductActionsOverlay({ productId }: OverlayProps) {
  return (
    <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-6 z-10 px-4">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Add to cart:", productId);
        }}
        className="w-full max-w-[202px] bg-white text-furniro-gold font-semibold py-3 px-6 transition-colors hover:bg-furniro-gold hover:text-white cursor-pointer shadow-sm relative z-20"
      >
        Add to cart
      </button>

      <div className="flex justify-center items-center gap-4 w-full max-w-[202px] text-white font-semibold text-sm relative z-20">
        {PRODUCT_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(action.log, productId);
            }}
            className="flex items-center gap-1.5 hover:text-furniro-gold transition-colors cursor-pointer bg-transparent border-none"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
