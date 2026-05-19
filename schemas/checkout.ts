import * as z from "zod";

export const checkoutSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().optional(),
    country: z.string().min(1, "Country / Region is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    townCity: z.string().min(1, "Town / City is required"),
    province: z.string().min(1, "Province is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    phone: z.string().min(6, "Provide a valid phone number"),
    email: z.string().email("Please input a valid email"),
    additionalInfo: z.string().optional(),
    paymentMethod: z.enum(["bank-transfer", "cod"]),
});

export type CheckoutFormSchema = z.infer<typeof checkoutSchema>;