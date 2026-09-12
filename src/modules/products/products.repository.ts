import { pool } from "../../database/database.js";
import { CreateProductRequest, UpdateProductRequest } from "./products.schema.js";
import { Product } from "./products.types.js";

export async function findAll(): Promise<Product[]> {
  const result = await pool.query<Product>(
    `
    SELECT
      p.id,
      p.category_id,
      p.name,
      p.sku,
      p.unit,
      p.selling_price,
      p.minimum_stock,
      COALESCE(ps.quantity, 0) AS current_stock,
      p.is_active,
      p.created_at,
      p.updated_at
    FROM
      products p
    LEFT JOIN
      product_stock ps ON p.id = ps.product_id
    ORDER BY
      p.name
    `,
  );

  return result.rows;
}

export async function findByID(id: string): Promise<Product | null> {
  const result = await pool.query<Product>(
    `
    SELECT
      p.id,
      p.category_id,
      p.name,
      p.sku,
      p.unit,
      p.selling_price,
      p.minimum_stock,
      COALESCE(ps.quantity, 0) AS current_stock,
      p.is_active,
      p.created_at,
      p.updated_at
    FROM
      products p
    LEFT JOIN
      product_stock ps ON p.id = ps.product_id
    WHERE
      p.id = $1
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

export async function update(data: UpdateProductRequest): Promise<Product | null> {
  const result = await pool.query<Product>(
    `
      UPDATE products
      SET
        category_id = $2,
        name = $3,
        sku = $4,
        unit = $5,
        selling_price = $6,
        minimum_stock = $7,
        updated_at = NOW()
      WHERE id = $1
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
      data.id,
      data.category_id,
      data.name,
      data.sku,
      data.unit,
      data.selling_price,
      data.minimum_stock,
    ],
  );

  return result.rows[0] ?? null;
}

export async function remove(id: string): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM products
      WHERE id = $1
    `,
    [id],
  );

  return (result.rowCount ?? 0) > 0;
}
