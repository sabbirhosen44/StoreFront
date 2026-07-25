import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    townCity: string;
    country: string;
    zipCode: string;
    phone: string;
    email: string;
  };
  status: "Processing" | "Shipped" | "Delivered";
}

interface OrderState {
  orders: Order[];
}

const getInitialOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("furniro_orders");
  return saved ? JSON.parse(saved) : [];
};

const initialState: OrderState = {
  orders: getInitialOrders(),
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, "id" | "createdAt" | "status">>) => {
      const newOrder: Order = {
        ...action.payload,
        id: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: "Processing",
      };
      state.orders.unshift(newOrder);
      localStorage.setItem("furniro_orders", JSON.stringify(state.orders));
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("furniro_orders");
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
