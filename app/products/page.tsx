import { Product, ProductsCategory } from "@/types/product";
import FilterBar from "@/components/products/FilterBar";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";

interface PageProps {
  searchParams: Promise<{
    title?: string;
    price_min?: string;
    price_max?: string;
    categoryId?: string;
    sort?: string;
    page?: string;
    view?: "grid" | "list";
  }>;
}

const ITEMS_PER_PAGE = 16;

async function getProducts(params: Record<string, string | number>) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.escuelajs.co/api/v1";
  const url = new URL(`${baseUrl}/products`);

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== "") {
      url.searchParams.append(key, String(val));
    }
  });

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load inventory catalog.");
  return (await res.json()) as Product[];
}

async function getCategories() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.escuelajs.co/api/v1";
  const res = await fetch(`${baseUrl}/categories`, { cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()) as ProductsCategory[];
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const viewMode = resolvedParams.view || "grid";

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const countQuery: Record<string, string | number> = {
    title: resolvedParams.title || "",
    price_min: resolvedParams.price_min || "",
    price_max: resolvedParams.price_max || "",
  };

  if (resolvedParams.categoryId) {
    countQuery.categoryId = resolvedParams.categoryId;
  }

  const displayQuery = {
    ...countQuery,
    limit: ITEMS_PER_PAGE,
    offset: offset,
  };

  const [allMatchingItems, paginatedProducts, API_Categories] =
    await Promise.all([
      getProducts(countQuery),
      getProducts(displayQuery),
      getCategories(),
    ]);

  const totalResults = allMatchingItems.length;

  const safeTotalResults =
    totalResults === 0 && paginatedProducts.length > 0
      ? paginatedProducts.length
      : totalResults;

  if (resolvedParams.sort === "price-asc") {
    paginatedProducts.sort((a, b) => a.price - b.price);
  } else if (resolvedParams.sort === "price-desc") {
    paginatedProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.max(Math.ceil(safeTotalResults / ITEMS_PER_PAGE), 3);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Products Hero Banner */}
      <div className="relative w-full h-[300px] flex flex-col items-center justify-center bg-[url('/images/products-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-heading mb-2">
            Products
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base text-foreground/80 font-medium">
            <span className="font-bold text-foreground">Home</span>
            <span className="text-xs">&gt;</span>
            <span className="font-light">Products</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        categories={API_Categories}
        totalResults={
          safeTotalResults === 0 ? paginatedProducts.length : safeTotalResults
        }
        startOffset={paginatedProducts.length === 0 ? 0 : offset + 1}
        endOffset={offset + paginatedProducts.length}
      />

      {/* Product Grid */}
      <div className="container-center py-16 px-8">
        <ProductGrid products={paginatedProducts} viewMode={viewMode} />

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <ProductPagination
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
