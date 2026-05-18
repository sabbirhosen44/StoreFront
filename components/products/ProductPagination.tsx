// components/products/ProductPagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

interface ProductPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function ProductPagination({
  totalPages,
  currentPage,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    /* Changed to 'flex-wrap' and added 'justify-center' so it handles small screens beautifully */
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 select-none w-full max-w-full px-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <Button
            key={page}
            disabled={isPending}
            onClick={() => navigateToPage(page)}
            /* Added responsive sizing: 'size-10 sm:size-12' to shrink cleanly on small phones */
            className={`size-10 sm:size-12 rounded-lg text-sm sm:text-base cursor-pointer border-none transition-all duration-200 shrink-0 ${
              isActive
                ? "bg-furniro-gold text-white font-medium hover:bg-furniro-gold/90"
                : "bg-furniro-beige text-foreground hover:bg-furniro-gold/20"
            }`}
            variant="ghost"
          >
            {page}
          </Button>
        );
      })}

      {currentPage < totalPages && (
        <Button
          disabled={isPending}
          onClick={() => navigateToPage(currentPage + 1)}
          /* Adjusted responsive height and padding to keep 'Next' looking clean alongside smaller circles */
          className="h-10 sm:h-12 px-4 sm:px-6 rounded-lg text-sm sm:text-base bg-furniro-beige text-foreground hover:bg-furniro-gold/20 cursor-pointer border-none shrink-0"
          variant="ghost"
        >
          Next
        </Button>
      )}
    </div>
  );
}
