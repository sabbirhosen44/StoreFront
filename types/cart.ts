import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  townCity: string;
  province: string;
  zipCode: string;
  phone: string;
  email: string;
  additionalInfo?: string;
  paymentMethod: "bank-transfer" | "cod";
}
