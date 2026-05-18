import CategorySlider from "@/components/home/CategorySlider";
import { Category } from "@/types/category";

export default async function Categories() {
  let categories: Category[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch data from API");
    categories = await res.json();

    if (!categories || categories.length === 0) {
      throw new Error("API returned an empty array");
    }
  } catch (err: any) {
    console.error(err);
    error = err.message || "Something went wrong";
  }

  if (error && categories.length === 0) {
    return (
      <section className="w-full bg-background py-14 md:py-20">
        <div className="container-center text-center">
          <p className="text-destructive text-lg font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className=" w-full bg-background py-14 md:py-20 overflow-hidden">
      <div className="container-center relative group">
        <div className="text-center space-y-2 mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-foreground tracking-tight">
            Browse The Categories
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <CategorySlider categories={categories} />
      </div>
    </section>
  );
}
