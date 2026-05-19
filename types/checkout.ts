import { CheckoutFormSchema } from "@/schemas/checkout";

export type CheckoutFieldName = keyof Omit<CheckoutFormSchema, "paymentMethod">;

export interface FormFieldConfig {
    name: CheckoutFieldName;
    label: string;
    type?: string;
    required?: boolean;
}