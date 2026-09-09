import z from "zod";

export const createPurchaseSchema = z.object({
  reference_number: z.string().trim().min(1, "reference number is required"),
  notes: z.string().trim().optional(),
  purchased_at: z.iso.datetime("invalid purchased at"),
  items: z
    .array(
      z.object({
        product_id: z.uuid("invalid product id"),
        quantity: z.number().int().positive("quantity must be greater than 0"),
        unit_cost: z
          .number()
          .nonnegative("unit cost must be greater than or equal to 0"),
      }),
    )
    .min(1, "purchase must contain at least one item"),
});

export type CreatePurchaseRequest = z.infer<typeof createPurchaseSchema>;
