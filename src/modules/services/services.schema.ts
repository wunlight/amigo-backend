import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  default_price: z.number().nonnegative("default price cannot be negative"),
});

export type CreateServiceRequest = z.infer<typeof createServiceSchema>;
