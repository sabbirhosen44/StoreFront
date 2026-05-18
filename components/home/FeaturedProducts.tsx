import ProductActionsOverlay from "@/components/home/ProductActionsOverlay";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

// Helper for formatting prices
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("$", "$ ");
};

// Cleans up image URLs
const getCleanImage = (images: string[] | undefined): string => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=736&auto=format&fit=crop";

  if (!images || !images[0]) return fallbackImage;
  const cleaned = images[0].replace(/[\[\]"]/g, "").trim();
  if (!cleaned || !cleaned.startsWith("http")) return fallbackImage;
  return cleaned;
};

export default async function FeaturedProducts() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch products");
    products = await res.json();
  } catch (err) {
    console.error(err);
    error = "Failed to load products";
  }

  if (error) {
    return (
      <section className="w-full bg-background py-16">
        <div className="container-center text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-background py-16">
      <div className="container-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading tracking-tight mb-8">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {products.slice(0, 8).map((product, index) => {
            const cleanImage = getCleanImage(product.images);
            const isEven = index % 2 === 0;

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative flex flex-col bg-secondary/30 overflow-hidden transition-all duration-300 cursor-pointer block"
              >
                <div className="relative w-full aspect-[285/301] overflow-hidden bg-muted">
                  <Image
                    src={cleanImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    unoptimized
                  />

                  {isEven ? (
                    <div className="absolute top-6 right-6 text-white text-sm font-semibold w-12 h-12 rounded-full flex items-center justify-center bg-destructive">
                      -30%
                    </div>
                  ) : (
                    <div className="absolute top-6 right-6 text-white text-sm font-semibold w-12 h-12 rounded-full flex items-center justify-center bg-[#2EC1AC]">
                      New
                    </div>
                  )}

                  <ProductActionsOverlay productId={product.id} />
                </div>

                <div className="p-4 flex flex-col flex-grow bg-secondary/30 min-h-[145px]">
                  <h3 className="text-[24px] font-bold text-foreground/80 truncate leading-tight mb-1 font-heading">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground text-[16px] font-medium line-clamp-1 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
                    <span className="text-[20px] font-bold text-foreground/80">
                      {formatPrice(product.price)}
                    </span>
                    {isEven && (
                      <span className="text-[16px] text-price-old font-normal">
                        {formatPrice(product.price * 1.4)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {products.length > 8 && (
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block border border-furniro-gold text-furniro-gold font-bold text-base py-3 px-20 bg-background transition-colors hover:bg-furniro-gold hover:text-white cursor-pointer tracking-wide"
            >
              Show More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
