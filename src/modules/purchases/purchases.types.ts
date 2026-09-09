export type Purchase = {
  id: string;
  reference_number: string;
  notes: string;
  purchased_at: Date;
  created_at: Date;
};

export type PurchaseItem = {
  id: string;
  purchase_id: string;
  product_id: string;
  quantity: number;
  unit_cost: number;
  created_at: Date;
};
