import { describe, it, expect } from "vitest";
import wishlistReducer, {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist,
} from "@/store/slices/wishlistSlice";
import { Product } from "@/types/product";

const mockProduct: Product = {
  id: 202,
  title: "Modern Wooden Desk",
  slug: "wooden-desk",
  price: 299.0,
  description: "Minimalist solid wood desk.",
  category: {
    id: 1,
    name: "Furniture",
    image: "https://placehold.co/100",
    slug: "furniture",
  },
  images: ["https://placehold.co/600"],
};

describe("Wishlist Slice Redux Reducer", () => {
  it("should add product to wishlist when toggled on", () => {
    const initialState = { items: [] };
    const stateAfterToggle = wishlistReducer(
      initialState,
      toggleWishlist(mockProduct)
    );

    expect(stateAfterToggle.items.length).toBe(1);
    expect(stateAfterToggle.items[0].id).toBe(202);
  });

  it("should remove product from wishlist when toggled off", () => {
    const stateWithItem = { items: [mockProduct] };
    const stateAfterToggle = wishlistReducer(
      stateWithItem,
      toggleWishlist(mockProduct)
    );

    expect(stateAfterToggle.items.length).toBe(0);
  });

  it("should remove item by ID using removeFromWishlist", () => {
    const stateWithItem = { items: [mockProduct] };
    const stateAfterRemove = wishlistReducer(
      stateWithItem,
      removeFromWishlist(202)
    );

    expect(stateAfterRemove.items.length).toBe(0);
  });

  it("should clear all items using clearWishlist", () => {
    const stateWithItem = { items: [mockProduct] };
    const stateAfterClear = wishlistReducer(stateWithItem, clearWishlist());

    expect(stateAfterClear.items).toEqual([]);
  });
});
