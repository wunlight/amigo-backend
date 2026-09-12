import { transaction } from "../../database/database.js";
import * as repository from "./sales.repository.js";
import { CreateSaleRequest } from "./sales.schema.js";

export async function createSale(data: CreateSaleRequest) {
  return transaction(async (client) => {
    const sale = await repository.createSale(client, data);

    const product_items = await repository.createSaleProductItems(
      client,
      sale.id,
      data.product_items,
    );

    const service_items = await repository.createSaleServiceItems(
      client,
      sale.id,
      data.service_items,
    );

    return {
      ...sale,
      product_items,
      service_items,
    };
  });
}
