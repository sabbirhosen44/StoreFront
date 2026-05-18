import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
}

export default function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="size-10 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          No Matching Products
        </h3>
        <p className="text-muted-foreground max-w-sm">
          We couldn't find anything matching your adjustments. Try checking
          spelling or changing parameters.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full"
          : "flex flex-col gap-6 w-full"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}
