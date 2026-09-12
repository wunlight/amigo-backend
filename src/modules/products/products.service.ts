import * as repository from "./products.repository.js";
import { CreateProductRequest, UpdateProductRequest } from "./products.schema.js";

export async function getProducts() {
  return repository.findAll();
}

export async function getProduct(id: string) {
  const product = await repository.findByID(id);

  if (!product) {
    throw new Error("product not found");
  }

  return product;
}

export async function createProduct(data: CreateProductRequest) {
  return repository.create(data);
}

export async function updateProduct(data: UpdateProductRequest) {
  const product = await repository.update(data);

  if (!product) {
    throw new Error("product not found");
  }

  return product;
}

export async function deleteProduct(id: string) {
  const deleted = await repository.remove(id);

  if (!deleted) {
    throw new Error("product not found");
  }
}
