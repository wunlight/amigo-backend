import * as repository from "./categories.repository.js";
import { CreateCategoryRequest, UpdateCategoryRequest } from "./categories.schema.js";

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

export async function updateCategory(data: UpdateCategoryRequest) {
  const category = await repository.update(data);

  if (!category) {
    throw new Error("category not found");
  }

  return category;
}

export async function deleteCategory(id: string) {
  const deleted = await repository.remove(id);

  if (!deleted) {
    throw new Error("category not found");
  }
}
