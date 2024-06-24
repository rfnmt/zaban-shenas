export interface IPurchasedProducts {
  id: number;
  checksum: number;
  data: {
    id: number;
    expiry_date: string;
    remaining_amount: number;
    max_amount: number;
  };
}

export interface IPurchasables {
  id: number;
  checksum: number;
  data: {
    id: number;
    type: string;
    title: string;
    description: string;
    slogan: string;
    button: null | any;
    slug: string;
    theming: {
      id: number;
      background_gradiant_primary_light: string;
      background_gradiant_secondary_light: string;
      text_color_light: string;
      background_gradiant_primary_dark: string;
      background_gradiant_secondary_dark: string;
      text_color_dark: string;
    };
    detailed_description_list: string[];
    images: {
      thumbnail: string;
      wide: string;
      animation: string;
    };
    pricing: {
      price: number;
      minutes_per_refill: number;
      variations: [
        {
          id: number;
          price: number;
          amount: number;
          thumbnail: string;
        }
      ];
    };
    discount: number;
  };
}

export interface IShopMetaData {
  id: number;
  data: {
    id: number;
    gem_exchange_value: number;
  };
}

export interface IDiscount {
  id: number;
  expiry_date: number;
  checksum: number;
  data: {
    id: number;
    discount_percentage: number;
    expiry_date: any;
  };
}

export interface IShop {
  discounts: IDiscount[] | [];
  purchased_products: IPurchasedProducts[] | [];
  purchasable_bundle: IPurchasableBundle[] | [];
  purchasables: IPurchasables[] | [];
  shop_meta_data: IShopMetaData;
}

export interface IPurchasableBundle {
  id: number;
  checksum: number;
  data: {
    purchasable_bundle_id: number;
    containers: [
      {
        title: string;
        purchasables: number[];
      }
    ];
  };
}
