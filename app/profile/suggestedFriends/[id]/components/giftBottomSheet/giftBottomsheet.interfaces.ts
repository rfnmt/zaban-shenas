export interface IGiftShop {
  discounts: Discount[];
  purchased_products: PurchasedProduct[];
  purchasable_bundle: PurchasableBundle[];
  purchasables: Purchasable[];
  shop_meta_data: ShopMetaData;
}

export interface Discount {
  id: number;
  expiry_date: Date;
  checksum: number;
  data: DiscountData;
}

export interface DiscountData {
  id: number;
  discount_percentage: number;
  expiry_date: Date;
}

export interface PurchasableBundle {
  id: number;
  checksum: number;
  data: PurchasableBundleData;
}

export interface PurchasableBundleData {
  purchasable_bundle_id: number;
  containers: Container[];
}

export interface Container {
  title: null | string;
  purchasables: number[];
}

export interface Purchasable {
  id: number;
  checksum: number;
  data: PurchasableData;
}

export interface PurchasableData {
  id: number;
  type: string;
  title: string;
  description: string;
  slogan: string;
  button: Button | null;
  slug: null | string;
  theming: Theming | null;
  detailed_description_list: DetailedDescriptionList[];
  images: Images;
  pricing: Pricing;
  discount: null;
}

export interface Button {
  id: number;
  purchase_label: string;
  repurchase_label: null | string;
  background_color_light: string;
  text_color_light: string;
  background_color_dark: string;
  text_color_dark: string;
}

export interface DetailedDescriptionList {
  title: string;
  subtitle: null | string;
  thumbnail: string;
}

export interface Images {
  thumbnail: null | string;
  refill_thumbnail: null | string;
  infinite_thumbnail: string;
  wide: null | string;
  animation: null | string;
}

export interface Pricing {
  variations?: Variation[];
  price?: number;
  max_amount?: number;
  lifespan_minutes?: number;
  minutes_per_refill?: number;
}

export interface Variation {
  id: number;
  price: number;
  amount?: number;
  thumbnail: null | string;
  title?: string;
  subtitle?: string;
  featured?: boolean;
  duration?: number;
}

export interface Theming {
  id: number;
  background_gradiant_primary_light: string;
  background_gradiant_secondary_light: string;
  text_color_light: string;
  background_gradiant_primary_dark: string;
  background_gradiant_secondary_dark: string;
  text_color_dark: string;
}

export interface PurchasedProduct {
  id: number;
  checksum: number;
  data: PurchasedProductData;
}

export interface PurchasedProductData {
  id: number;
  expiry_date: Date | null;
  remaining_amount: number;
  minutes_per_refill?: number;
  next_refill_date: Date;
  last_refill_date: Date;
  max_amount?: number;
}

export interface ShopMetaData {
  id: number;
  data: ShopMetaDataData;
}

export interface ShopMetaDataData {
  id: number;
  gem_exchange_value: number;
}
