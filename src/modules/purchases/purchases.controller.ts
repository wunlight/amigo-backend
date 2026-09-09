import { Request, Response } from "express";
import { createPurchaseSchema } from "./purchases.schema.js";
import * as service from "./purchases.service.js";

export async function createPurchase(req: Request, res: Response) {
  const result = createPurchaseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "invalid request body",
      details: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const purchase = await service.createPurchase(result.data);

  return res.status(201).json(purchase);
}
