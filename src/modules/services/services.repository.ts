import { pool } from "../../database/database.js";
import {
  CreateServiceRequest,
  UpdateServiceRequest,
} from "./services.schema.js";
import { Service } from "./services.types.js";

export async function findAll(): Promise<Service[]> {
  const result = await pool.query<Service>(
    `
    SELECT
      id,
      name,
      default_price
    FROM
      services
    ORDER BY
      name
    `,
  );

  return result.rows;
}

export async function findByID(id: string): Promise<Service | null> {
  const result = await pool.query<Service>(
    `
    SELECT
      id,
      name,
      default_price
    FROM
      services
    WHERE
      id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function create(data: CreateServiceRequest): Promise<Service> {
  const result = await pool.query<Service>(
    `
    INSERT INTO services
    (
      name,
      default_price
    )
    VALUES ($1, $2)
    RETURNING
      id,
      name,
      default_price
    `,
    [data.name, data.default_price],
  );

  return result.rows[0];
}

export async function update(
  data: UpdateServiceRequest,
): Promise<Service | null> {
  const result = await pool.query<Service>(
    `
    UPDATE services
    SET
      name = $2,
      default_price = $3
    WHERE id = $1
    RETURNING
      id,
      name,
      default_price
    `,
    [data.id, data.name, data.default_price],
  );

  return result.rows[0] ?? null;
}

export async function remove(id: string): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM services
    WHERE id = $1
    `,
    [id],
  );

  return (result.rowCount ?? 0) > 0;
}
