"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Product Catalog Runtime Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-3">
          Categories Unavailable
        </h2>
        <p className="text-base text-muted-foreground mb-8">
          We encountered an issue loading the products inventory. Please verify
          your connection or attempt a reload.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto ">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="rounded-sm h-11 px-6 font-medium text-base border-border cursor-pointer"
          >
            Refresh Page
          </Button>
          <Button
            onClick={() => reset()}
            className="bg-furniro-gold text-white rounded-sm h-11 px-6 font-semibold text-base cursor-pointer"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
