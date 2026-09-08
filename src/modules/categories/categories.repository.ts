import { pool } from "../../database/database.js";
import { CreateCategoryRequest } from "./categories.schema.js";
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
