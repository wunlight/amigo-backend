import { PoolClient } from "pg";
import { CreatePurchaseRequest } from "./purchases.schema.js";
import { Purchase, PurchaseItem } from "./purchases.types.js";

export async function createPurchase(
  client: PoolClient,
  data: CreatePurchaseRequest,
) {
  const result = await client.query<Purchase>(
    `
    INSERT INTO purchases (
      reference_number,
      notes,
      purchased_at
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      reference_number,
      notes,
      purchased_at,
      created_at
    `,
    [data.reference_number, data.notes ?? null, data.purchased_at],
  );

  return result.rows[0];
}

export async function createPurchaseItems(
  client: PoolClient,
  purchaseID: string,
  items: CreatePurchaseRequest["items"],
) {
  const createdItems = [];

  for (const item of items) {
    const result = await client.query<PurchaseItem>(
      `
      INSERT INTO purchase_items (
        purchase_id,
        product_id,
        quantity,
        unit_cost
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        purchase_id,
        product_id,
        quantity,
        unit_cost,
        created_at
      `,
      [purchaseID, item.product_id, item.quantity, item.unit_cost],
    );

    createdItems.push(result.rows[0]);
  }

  return createdItems;
}
