import * as repository from "./services.repository.js";
import { CreateServiceRequest, UpdateServiceRequest } from "./services.schema.js";

export async function getServices() {
  return repository.findAll();
}

export async function getService(id: string) {
  const service = await repository.findByID(id);

  if (!service) {
    throw new Error("service not found");
  }

  return service;
}

export async function createService(data: CreateServiceRequest) {
  return repository.create(data);
}

export async function updateService(data: UpdateServiceRequest) {
  const service = await repository.update(data);

  if (!service) {
    throw new Error("service not found");
  }

  return service;
}

export async function deleteService(id: string) {
  const deleted = await repository.remove(id);

  if (!deleted) {
    throw new Error("service not found");
  }
}
