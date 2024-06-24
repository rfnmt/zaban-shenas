import React, { useMemo } from "react";

import { IShop } from "@/app/setting/store/store.interfaces";
import Icon from "@/components/icon";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

function RemainingAmountEnergyIcons() {
  const shopData = queryClient.getQueryData<IShop>(["shop-data"]);

  const energyPurchase = shopData?.purchasables?.find(
    (item) => item?.data?.type === "energy"
  );

  const purchasedProducts = shopData?.purchased_products.find(
    (item) => item.id === energyPurchase?.id
  );

  const energyIcons = useMemo(() => {
    if (purchasedProducts) {
      const { remaining_amount, max_amount } = purchasedProducts.data;
      const icons = Array.from(Array(max_amount)).map((_, index) => {
        if (index + 1 <= remaining_amount) {
          return (
            <div className="energy-icon" key={index}>
              <Icon width={24} height={24} icon="thunder" />
            </div>
          );
        } else {
          return (
            <div className="energy-icon disable" key={index}>
              <Icon width={24} height={24} icon="thunder" />
            </div>
          );
        }
      });

      return icons;
    }
  }, [purchasedProducts]);

  return <div className="thunders">{energyIcons}</div>;
}

export default RemainingAmountEnergyIcons;
