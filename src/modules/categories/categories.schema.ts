import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
