import { pool } from "../../database/database.js";
import { CreateProductRequest } from "./products.schema.js";
import { Product } from "./products.types.js";

export async function findAll(): Promise<Product[]> {
  const result = await pool.query<Product>(
    `
    SELECT
      id,
      category_id,
      name,
      sku,
      unit,
      selling_price,
      minimum_stock,
      is_active,
      created_at,
      updated_at
    FROM
      products
    ORDER BY
      name
    `,
  );

  return result.rows;
}

export async function findByID(id: string): Promise<Product | null> {
  const result = await pool.query<Product>(
    `
    SELECT
      id,
      category_id,
      name,
      sku,
      unit,
      selling_price,
      minimum_stock,
      is_active,
      created_at,
      updated_at
    FROM
      products
    WHERE
      id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function create(data: CreateProductRequest): Promise<Product> {
  const result = await pool.query<Product>(
    `
      INSERT INTO products
      (
        category_id,
        name,
        sku,
        unit,
        selling_price,
        minimum_stock
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        category_id,
        name,
        sku,
        unit,
        selling_price,
        minimum_stock,
        is_active,
        created_at,
        updated_at
    `,
    [
      data.category_id,
      data.name,
      data.sku,
      data.unit,
      data.selling_price,
      data.minimum_stock,
    ],
  );

  return result.rows[0];
}
