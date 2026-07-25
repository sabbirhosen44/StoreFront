import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const getInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const savedCart = localStorage.getItem("furniro_cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState: CartState = {
  items: getInitialCart(),
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>,
    ) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.product.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("furniro_cart", JSON.stringify(state.items));
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId,
      );
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("furniro_cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("furniro_cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("furniro_cart");
      }
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleSidebar,
  setSidebarOpen,
} = cartSlice.actions;
export default cartSlice.reducer;
