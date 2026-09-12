import z from "zod";

export const createProductSchema = z.object({
  category_id: z.string().trim().min(1, "category id is required"),
  name: z.string().trim().min(1, "name is required"),
  sku: z.string().trim().min(1, "sku is required"),
  unit: z.string().trim().min(1, "unit is required"),
  selling_price: z
    .number()
    .min(0, "selling price must be greater than or equal to 0"),
  minimum_stock: z
    .number()
    .min(0, "minimum stock must be greater than or equal to 0"),
});

export const updateProductSchema = createProductSchema.extend({
  id: z.string().uuid("invalid product id"),
});

export type CreateProductRequest = z.infer<typeof createProductSchema>;
export type UpdateProductRequest = z.infer<typeof updateProductSchema>;
