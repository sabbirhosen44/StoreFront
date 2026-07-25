import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastProvider } from "@/components/ui/toast";

const sampleProduct: Product = {
  id: 303,
  title: "Nordic Minimalist Armchair",
  slug: "nordic-armchair",
  price: 249.99,
  description: "Beautiful Nordic design armchair for cozy interiors.",
  category: {
    id: 2,
    name: "Chairs",
    image: "https://placehold.co/100",
    slug: "chairs",
  },
  images: ["https://placehold.co/600"],
};

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <ToastProvider>{ui}</ToastProvider>
    </Provider>
  );
}

describe("ProductCard Component", () => {
  it("renders product title, price, and category in grid view", () => {
    renderWithProviders(<ProductCard product={sampleProduct} viewMode="grid" />);

    expect(screen.getByText("Nordic Minimalist Armchair")).toBeDefined();
    expect(screen.getByText("Chairs")).toBeDefined();
    expect(screen.getByText("$249.99")).toBeDefined();
  });

  it("renders product description and action button in list view", () => {
    renderWithProviders(<ProductCard product={sampleProduct} viewMode="list" />);

    expect(screen.getByText("Nordic Minimalist Armchair")).toBeDefined();
    expect(
      screen.getByText("Beautiful Nordic design armchair for cozy interiors.")
    ).toBeDefined();
    expect(screen.getByText("Add to cart")).toBeDefined();
  });
});
