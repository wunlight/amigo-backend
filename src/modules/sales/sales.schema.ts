import z from "zod";

export const createSaleSchema = z
  .object({
    reference_number: z.string().trim().min(1, "reference number is required"),

    sold_at: z.iso.datetime("invalid sold at"),

    discount: z.number().min(0, "discount must be greater than or equal to 0"),

    notes: z.string().trim().optional(),

    product_items: z
      .array(
        z.object({
          product_id: z.uuid("invalid product id"),
          quantity: z
            .number()
            .int("quantity must be an integer")
            .positive("quantity must be greater than 0"),
          unit_price: z
            .number()
            .nonnegative("unit price must be greater than or equal to 0"),
          unit_cost: z
            .number()
            .nonnegative("unit cost must be greater than or equal to 0"),
        }),
      )
      .default([]),

    service_items: z
      .array(
        z.object({
          service_id: z.uuid("invalid service id"),
          unit_price: z
            .number()
            .nonnegative("unit price must be greater than or equal to 0"),
        }),
      )
      .default([]),
  })
  .refine(
    (data) => data.product_items.length > 0 || data.service_items.length > 0,
    {
      message: "sale must contain at least one item",
      path: ["product_items"],
    },
  );

export type CreateSaleRequest = z.infer<typeof createSaleSchema>;
