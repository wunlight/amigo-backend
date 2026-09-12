import { PoolClient } from "pg";
import { CreateSaleRequest } from "./sales.schema.js";

export async function createSale(client: PoolClient, data: CreateSaleRequest) {
  const result = await client.query(
    `
    INSERT INTO sales (
      reference_number,
      discount,
      notes,
      sold_at
    )
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      reference_number,
      discount,
      notes,
      sold_at,
      created_at
    `,
    [data.reference_number, data.discount, data.notes, data.sold_at],
  );

  return result.rows[0];
}

export async function createSaleProductItems(
  client: PoolClient,
  saleID: string,
  items: CreateSaleRequest["product_items"],
) {
  const createdItems = [];

  for (const item of items) {
    const result = await client.query(
      `
      INSERT INTO sale_product_items (
        sale_id,
        product_id,
        quantity,
        unit_price,
        unit_cost
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        sale_id,
        product_id,
        quantity,
        unit_price,
        unit_cost,
        created_at
    `,
      [saleID, item.product_id, item.quantity, item.unit_price, item.unit_cost],
    );

    createdItems.push(result.rows[0]);
  }

  return createdItems;
}

export async function createSaleServiceItems(
  client: PoolClient,
  saleID: string,
  items: CreateSaleRequest["service_items"],
) {
  const createdItems = [];

  for (const item of items) {
    const result = await client.query(
      `
      INSERT INTO sale_service_items (
        sale_id,
        service_id,
        unit_price
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        sale_id,
        service_id,
        unit_price,
        created_at
    `,
      [saleID, item.service_id, item.unit_price],
    );

    createdItems.push(result.rows[0]);
  }

  return createdItems;
}
