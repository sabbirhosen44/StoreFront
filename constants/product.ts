import { BreadcrumbItem } from "@/types/product";

export const PRODUCT_BREADCRUMB_BASE: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

export const AVAILABLE_SIZES = ["L", "XL", "XS"] as const;

export const AVAILABLE_COLORS = ["#816DFA", "#000000", "#B88E2F"] as const;

export const PRODUCT_TABS = [
  { id: "description", label: "Description" },
  { id: "info", label: "Additional Information" },
  { id: "reviews", label: "Reviews [5]" },
] as const;
