export interface Product {
  id: string;
  category_id: string;
  name: string;
  sku: string;
  unit: string;
  selling_price: number;
  minimum_stock: number;
  current_stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
