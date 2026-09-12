import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
});

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string().uuid("invalid category id"),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
