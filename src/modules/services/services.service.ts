import * as repository from "./services.repository.js";
import { CreateServiceRequest } from "./services.schema.js";

export async function getServices() {
  return repository.findAll();
}

export async function getService(id: string) {
  const category = await repository.findByID(id);

  if (!category) {
    throw new Error("category not found");
  }

  return category;
}

export async function createService(data: CreateServiceRequest) {
  return repository.create(data);
}
