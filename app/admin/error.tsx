"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground">
        The admin dashboard encountered an unexpected error.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-furniro-gold text-white rounded-lg hover:bg-furniro-gold/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
