import { z } from "zod";

export const productSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters long"),
    price: z.coerce.number().positive("Price must be a positive number"),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),
    categoryId: z.coerce.number().int().positive("Please select a valid category"),
    images: z.array(z.string().url("Must be a valid image URL")).min(1, "At least one image URL is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;