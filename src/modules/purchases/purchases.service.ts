import { transaction } from "../../database/database.js";
import * as repository from "./purchases.repository.js";
import { CreatePurchaseRequest } from "./purchases.schema.js";

export async function createPurchase(data: CreatePurchaseRequest) {
  return transaction(async (client) => {
    const purchase = await repository.createPurchase(client, data);

    const items = await repository.createPurchaseItems(
      client,
      purchase.id,
      data.items,
    );

    return {
      ...purchase,
      items,
    };
  });
}
