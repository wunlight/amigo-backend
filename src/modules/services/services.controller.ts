import { Request, Response } from "express";
import { createServiceSchema, updateServiceSchema } from "./services.schema.js";
import * as serviceFn from "./services.service.js";

export async function getServices(_req: Request, res: Response) {
  const services = await serviceFn.getServices();

  res.json(services);
}

export async function getService(req: Request, res: Response) {
  const requestedID = req.params.id;

  if (typeof requestedID !== "string") {
    return res.status(400).json({
      error: "invalid service id",
    });
  }

  const service = await serviceFn.getService(requestedID);

  res.json(service);
}

export async function createService(req: Request, res: Response) {
  const parsedReq = createServiceSchema.safeParse(req.body);

  if (!parsedReq.success) {
    return res.status(400).json({
      error: "invalid request body",
      detail: parsedReq.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const service = await serviceFn.createService(parsedReq.data);

  res.status(201).json(service);
}

export async function updateService(req: Request, res: Response) {
  const parsedReq = updateServiceSchema.safeParse({
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

  const service = await serviceFn.updateService(parsedReq.data);

  res.json(service);
}

export async function deleteService(req: Request, res: Response) {
  const requestedID = req.params.id;

  if (typeof requestedID !== "string") {
    return res.status(400).json({
      error: "invalid service id",
    });
  }

  await serviceFn.deleteService(requestedID);

  res.json({ message: "service deleted successfully" });
}
