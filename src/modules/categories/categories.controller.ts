import { Request, Response } from "express";
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
  const category = await service.createCategory(req.body);

  res.status(201).json(category);
}
