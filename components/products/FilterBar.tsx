"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { ListFilter, SearchIcon, SquareStack } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductsCategory } from "@/types/product";

interface FilterBarProps {
  totalResults: number;
  startOffset: number;
  endOffset: number;
  categories?: ProductsCategory[];
}

// 🧱 Moved outside to prevent focus loss during state changes
interface FormElementsProps {
  dynamicCategories: ProductsCategory[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  priceMin: string;
  setPriceMin: (val: string) => void;
  priceMax: string;
  setPriceMax: (val: string) => void;
  handleApplyAdvancedFilters: () => void;
  closeFilters: () => void;
}

function FilterFormElements({
  dynamicCategories,
  selectedCategory,
  setSelectedCategory,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  handleApplyAdvancedFilters,
  closeFilters,
}: FormElementsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-foreground/80 font-heading">
          Category
        </label>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 subtle-scrollbar">
          {dynamicCategories.map((cat) => {
            const catIdString = String(cat.id);
            const isCurrent = selectedCategory === catIdString;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(isCurrent ? "" : catIdString)
                }
                className={`text-sm px-4 py-2 rounded-md font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-furniro-gold text-white border-furniro-gold shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:border-muted-foreground/60"
                }`}
              >
                {isCurrent && <span className="text-xs font-bold">[✓]</span>}
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-foreground/80 font-heading">
          Price Range ($)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">Min Price</span>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value.replace(/\D/g, ""))}
              className="h-11 focus-visible:ring-furniro-gold border-border bg-background text-foreground rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">Max Price</span>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="1000"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value.replace(/\D/g, ""))}
              className="h-11 focus-visible:ring-furniro-gold border-border bg-background text-foreground rounded-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60 mt-2">
        <Button
          variant="outline"
          onClick={closeFilters}
          className="rounded-sm h-11 text-base font-medium"
        >
          Cancel
        </Button>
        <Button
          onClick={handleApplyAdvancedFilters}
          className="bg-furniro-gold text-white rounded-sm h-11 text-base font-semibold"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default function FilterBar({
  totalResults,
  startOffset,
  endOffset,
  categories = [],
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("title") || ""
  );
  const viewMode = searchParams.get("view") || "grid";

  const [priceMin, setPriceMin] = useState(searchParams.get("price_min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("price_max") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || ""
  );

  const dynamicCategories = categories.filter(
    (cat) =>
      cat?.name &&
      !cat.name.toLowerCase().includes("error") &&
      !cat.name.toLowerCase().includes("delete") &&
      !cat.name.toLowerCase().includes("testing") &&
      !cat.name.toLowerCase().includes("update")
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("title") || "");
    setPriceMin(searchParams.get("price_min") || "");
    setPriceMax(searchParams.get("price_max") || "");
    setSelectedCategory(searchParams.get("categoryId") || "");
  }, [searchParams]);

  const applyInstantParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyInstantParams({ title: searchQuery });
  };

  const handleApplyAdvancedFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (priceMin) params.set("price_min", priceMin);
    else params.delete("price_min");
    if (priceMax) params.set("price_max", priceMax);
    else params.delete("price_max");
    if (selectedCategory) params.set("categoryId", selectedCategory);
    else params.delete("categoryId");

    params.set("page", "1");

    setIsMobileOpen(false);
    setIsDesktopOpen(false);

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setPriceMin("");
    setPriceMax("");
    setSelectedCategory("");

    setIsMobileOpen(false);
    setIsDesktopOpen(false);

    startTransition(() => {
      router.push("/products");
    });
  };

  const closeFilters = () => {
    setIsMobileOpen(false);
    setIsDesktopOpen(false);
  };

  const hasActiveAdvancedFilters =
    searchParams.get("price_min") ||
    searchParams.get("price_max") ||
    searchParams.get("categoryId");

  // Pack the states together neatly as arguments
  const sharedFormProps = {
    dynamicCategories,
    selectedCategory,
    setSelectedCategory,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    handleApplyAdvancedFilters,
    closeFilters,
  };

  return (
    <div
      className={`w-full bg-furniro-beige border-y border-border py-4 md:py-6 px-4 md:px-12 transition-all duration-200 ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="container-center flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 md:gap-6">
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 md:gap-6 text-foreground text-base">
          {/* Mobile Viewport Sheet Drawer */}
          <div className="md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 font-medium cursor-pointer p-0 h-auto hover:bg-transparent text-base ${
                    hasActiveAdvancedFilters ? "text-furniro-gold" : ""
                  }`}
                >
                  <span>Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="rounded-t-xl px-6 pb-8 pt-4 max-h-[85vh] overflow-y-auto bg-background border-t border-border text-foreground"
              >
                <SheetHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4 mb-4">
                  <SheetTitle className="font-heading font-bold text-xl text-foreground">
                    Filter Settings
                  </SheetTitle>
                  {hasActiveAdvancedFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllFilters}
                      className="text-sm text-destructive font-medium h-auto p-0 hover:bg-transparent"
                    >
                      Clear All
                    </Button>
                  )}
                </SheetHeader>
                <FilterFormElements {...sharedFormProps} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Overlay Popover */}
          <div className="hidden md:block">
            <Popover open={isDesktopOpen} onOpenChange={setIsDesktopOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 font-medium cursor-pointer p-0 h-auto hover:bg-transparent hover:text-furniro-gold relative text-base ${
                    hasActiveAdvancedFilters ? "text-furniro-gold" : ""
                  }`}
                >
                  <span>Filter</span>
                  {hasActiveAdvancedFilters && (
                    <span className="absolute -top-1 -right-3 size-2 bg-furniro-gold rounded-full" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-80 p-5 bg-background border border-border rounded-sm shadow-xl mt-2 z-50 text-foreground"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                  <h4 className="font-heading font-bold text-base text-foreground">
                    Filter Settings
                  </h4>
                  {hasActiveAdvancedFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAllFilters}
                      className="h-auto p-1 text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <FilterFormElements {...sharedFormProps} />
              </PopoverContent>
            </Popover>
          </div>

          {/* View Mode Toggle Switch */}
          <div className="flex items-center gap-1 border-l border-muted-foreground/40 pl-4 md:pl-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => applyInstantParams({ view: "grid" })}
              className={`cursor-pointer ${
                viewMode === "grid" ? "text-furniro-gold" : "text-foreground"
              }`}
            >
              <SquareStack className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => applyInstantParams({ view: "list" })}
              className={`cursor-pointer ${
                viewMode === "list" ? "text-furniro-gold" : "text-foreground"
              }`}
            >
              <ListFilter className="size-5" />
            </Button>
          </div>

          <span className="text-sm border-l border-muted-foreground/40 pl-4 md:pl-6 font-normal hidden sm:inline">
            Showing {startOffset}–{endOffset} of {totalResults} results
          </span>
        </div>

        {/* Right Side Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full xl:w-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center w-full xl:w-72"
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background border-border pr-16 h-11 text-base rounded-sm focus-visible:ring-furniro-gold w-full text-foreground"
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-2 h-8 hover:bg-transparent text-muted-foreground hover:text-furniro-gold cursor-pointer text-sm font-semibold"
            >
              <SearchIcon className="size-4" />
            </Button>
          </form>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <span className="text-base text-foreground whitespace-nowrap">
              Sort by
            </span>
            <Select
              defaultValue={searchParams.get("sort") || "price-asc"}
              onValueChange={(val) => applyInstantParams({ sort: val })}
            >
              <SelectTrigger className="w-[180px] bg-background border-none h-11 text-base text-muted-foreground shadow-none rounded-sm cursor-pointer outline-none focus:ring-0">
                <SelectValue placeholder="Price: Low to High" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border text-foreground">
                <SelectItem
                  value="price-asc"
                  className="text-base cursor-pointer"
                >
                  Price: Low to High
                </SelectItem>
                <SelectItem
                  value="price-desc"
                  className="text-base cursor-pointer"
                >
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
