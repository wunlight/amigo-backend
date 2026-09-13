import { pool } from "../../database/database.js";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./categories.schema.js";
import { Category } from "./categories.types.js";

export async function findAll(): Promise<Category[]> {
  const result = await pool.query<Category>(
    `
    SELECT
      id,
      name
    FROM
      categories
    ORDER BY
      name
    `,
  );

  return result.rows;
}

export async function findByID(id: string): Promise<Category | null> {
  const result = await pool.query<Category>(
    `
    SELECT
      id,
      name
    FROM
      categories
    WHERE
      id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function create(data: CreateCategoryRequest): Promise<Category> {
  const result = await pool.query<Category>(
    `
    INSERT INTO categories
    (
      name
    )
    VALUES ($1)
    RETURNING
      id,
      name
    `,
    [data.name],
  );

  return result.rows[0];
}

export async function update(
  data: UpdateCategoryRequest,
): Promise<Category | null> {
  const result = await pool.query<Category>(
    `
    UPDATE categories
    SET
      name = $2
    WHERE id = $1
    RETURNING
      id,
      name
    `,
    [data.id, data.name],
  );

  return result.rows[0] ?? null;
}

export async function remove(id: string): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM categories
    WHERE id = $1
    `,
    [id],
  );

  return (result.rowCount ?? 0) > 0;
}
