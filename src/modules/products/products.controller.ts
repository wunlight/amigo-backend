import { Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "./products.schema.js";
import * as service from "./products.service.js";

export async function getProducts(_req: Request, res: Response) {
  const products = await service.getProducts();

  res.json(products);
}

export async function getProduct(req: Request, res: Response) {
  const requestedID = req.params.id;

  if (typeof requestedID !== "string") {
    return res.status(400).json({
      error: "invalid product id",
    });
  }

  const product = await service.getProduct(requestedID);

  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  const parsedReq = createProductSchema.safeParse(req.body);

  if (!parsedReq.success) {
    return res.status(400).json({
      error: "invalid request body",
      detail: parsedReq.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const product = await service.createProduct(parsedReq.data);

  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const parsedReq = updateProductSchema.safeParse({
    ...req.body,
    id: req.params.id,
  });

  if (!parsedReq.success) {
    return res.status(400).json({
      error: "invalid request body",
      detail: parsedReq.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const product = await service.updateProduct(parsedReq.data);

  res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const requestedID = req.params.id;

  if (typeof requestedID !== "string") {
    return res.status(400).json({
      error: "invalid product id",
    });
  }

  await service.deleteProduct(requestedID);

  res.json({ message: "product deleted successfully" });
}
