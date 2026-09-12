import { Request, Response } from "express";
import { createSaleSchema } from "./sales.schema.js";
import * as service from "./sales.service.js";

export async function createSale(req: Request, res: Response) {
  const result = createSaleSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "invalid request body",
      details: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const sale = await service.createSale(result.data);

  return res.status(201).json(sale);
}
