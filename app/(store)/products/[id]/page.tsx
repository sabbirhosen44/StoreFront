import { Product } from "@/types/product";
import ProductDetailsClient from "./ProductDetailsClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getSingleProduct(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.escuelajs.co/api/v1";
  const res = await fetch(`${baseUrl}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Product not found");
  return (await res.json()) as Product;
}

async function getRelatedProducts(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.escuelajs.co/api/v1";
  const res = await fetch(`${baseUrl}/products/${id}/related`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = (await res.json()) as Product[];
  return data.slice(0, 4);
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getSingleProduct(resolvedParams.id);
  const relatedProducts = await getRelatedProducts(resolvedParams.id);

  return (
    <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
  );
}
