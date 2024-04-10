export interface ICart {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  total_price: number;
  unit_price: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreationICartDTO {
  id: number;
  product_id: number;
  user_id: number;
  total_price?: number;
  quantity: number;
  unit_price: number;
}
