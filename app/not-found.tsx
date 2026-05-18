import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center bg-background text-foreground">
      <div className="container-center flex flex-col items-center justify-center text-center max-w-xl px-4">
        {/* Error Status Indicator */}
        <div className="mb-6 rounded-full bg-furniro-beige p-6 text-furniro-gold animate-pulse">
          <svg
            className="size-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Messaging Block */}
        <h1 className="text-4xl sm:text-5xl font-normal font-heading tracking-wide mb-4 leading-tight">
          Page Not Found
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-10 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Navigation Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-12 bg-furniro-gold text-white font-semibold text-sm rounded-sm hover:bg-furniro-gold/90 transition-all cursor-pointer shadow-sm"
          >
            Go to Home
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-12 border border-muted-foreground text-muted-foreground hover:bg-foreground hover:text-background font-semibold text-sm rounded-sm transition-all cursor-pointer shadow-sm bg-transparent"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
