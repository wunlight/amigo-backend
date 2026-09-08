import * as repository from "./products.repository.js";
import { CreateProductRequest } from "./products.schema.js";

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
