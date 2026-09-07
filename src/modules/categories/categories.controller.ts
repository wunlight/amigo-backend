import { Request, Response } from "express";
import { createCategorySchema } from "./categories.schema.js";
import * as service from "./categories.service.js";

export async function getCategories(_req: Request, res: Response) {
  const categories = await service.getCategories();

  res.json(categories);
}

export async function getCategory(req: Request, res: Response) {
  const requestedID = req.params.id;

  if (typeof requestedID !== "string") {
    return res.status(400).json({
      error: "invalid category id",
    });
  }

  const category = await service.getCategory(requestedID);

  res.json(category);
}

export async function createCategory(req: Request, res: Response) {
  const parsedReq = createCategorySchema.safeParse(req.body);

  if (!parsedReq.success) {
    return res.status(400).json({
      error: "invalid request body",
      detail: parsedReq.error.issues,
    });
  }

  const category = await service.createCategory(parsedReq.data);

  res.status(201).json(category);
}
