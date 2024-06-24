export interface CheckoutDataType {
  product_id: number | undefined;
  purchase_tag: string | undefined;
  details: Detail[] | undefined;
  final_price: number | undefined;
  gem_amount: number | undefined;
  gem_value: number | undefined;
}

export interface Detail {
  value: string | undefined;
  title: string | undefined;
}
