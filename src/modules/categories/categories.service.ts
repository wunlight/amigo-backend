import * as repository from "./categories.repository.js";
import { CreateCategoryRequest } from "./categories.schema.js";

export async function getCategories() {
  return repository.findAll();
}

export async function getCategory(id: string) {
  const category = await repository.findByID(id);

  if (!category) {
    throw new Error("category not found");
  }

  return category;
}

export async function createCategory(data: CreateCategoryRequest) {
  return repository.create(data);
}
