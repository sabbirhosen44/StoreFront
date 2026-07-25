import { describe, it, expect, beforeEach } from "vitest";
import cartReducer, {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/store/slices/cartSlice";
import { Product } from "@/types/product";

const mockProduct: Product = {
  id: 101,
  title: "Test Ergonomic Chair",
  slug: "test-chair",
  price: 199.99,
  description: "Comfortable ergonomic office chair.",
  category: {
    id: 1,
    name: "Furniture",
    image: "https://placehold.co/100",
    slug: "furniture",
  },
  images: ["https://placehold.co/600"],
};

describe("Cart Slice Redux Reducer", () => {
  let initialState = {
    items: [],
    isOpen: false,
  };

  beforeEach(() => {
    initialState = {
      items: [],
      isOpen: false,
    };
  });

  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
      isOpen: false,
    });
  });

  it("should add a new product to the cart", () => {
    const newState = cartReducer(
      initialState,
      addToCart({ product: mockProduct, quantity: 2 })
    );

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].product.id).toBe(101);
    expect(newState.items[0].quantity).toBe(2);
  });

  it("should increment quantity if adding an existing product", () => {
    const stateWithItem = cartReducer(
      initialState,
      addToCart({ product: mockProduct, quantity: 1 })
    );

    const updatedState = cartReducer(
      stateWithItem,
      addToCart({ product: mockProduct, quantity: 3 })
    );

    expect(updatedState.items.length).toBe(1);
    expect(updatedState.items[0].quantity).toBe(4);
  });

  it("should update item quantity correctly", () => {
    const stateWithItem = cartReducer(
      initialState,
      addToCart({ product: mockProduct, quantity: 1 })
    );

    const updatedState = cartReducer(
      stateWithItem,
      updateQuantity({ productId: 101, quantity: 5 })
    );

    expect(updatedState.items[0].quantity).toBe(5);
  });

  it("should remove an item from the cart", () => {
    const stateWithItem = cartReducer(
      initialState,
      addToCart({ product: mockProduct, quantity: 1 })
    );

    const stateAfterRemove = cartReducer(
      stateWithItem,
      removeFromCart(101)
    );

    expect(stateAfterRemove.items.length).toBe(0);
  });

  it("should clear all items from the cart", () => {
    const stateWithItem = cartReducer(
      initialState,
      addToCart({ product: mockProduct, quantity: 2 })
    );

    const stateAfterClear = cartReducer(stateWithItem, clearCart());

    expect(stateAfterClear.items).toEqual([]);
  });
});
