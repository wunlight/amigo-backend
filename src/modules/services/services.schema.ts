import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  default_price: z.number().nonnegative("default price cannot be negative"),
});

export const updateServiceSchema = createServiceSchema.extend({
  id: z.string().uuid("invalid service id"),
});

export type CreateServiceRequest = z.infer<typeof createServiceSchema>;
export type UpdateServiceRequest = z.infer<typeof updateServiceSchema>;
