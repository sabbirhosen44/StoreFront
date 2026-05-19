import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().trim().min(2, "Category name must be at least 2 characters long"),
    image: z.string().url("Must be a valid image URL"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;