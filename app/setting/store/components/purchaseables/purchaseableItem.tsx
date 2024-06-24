import React from "react";

import Gem from "@/components/storeComponents/gem";
import Gold from "@/components/storeComponents/gold";
import OnTimeTest from "@/components/storeComponents/oneTimeTest";
import Placebo1 from "@/components/storeComponents/placebo1";
import PlaceBo2 from "@/components/storeComponents/placebo2";
import StreakFreeze from "@/components/storeComponents/streakFreeze";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import Booster from "@/components/storeComponents/booster";
import { IPurchasables, IShop } from "../../store.interfaces";

type Props = { purchaseId: number };

function PurchaseableItem({ purchaseId }: Props) {
  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;
  const gemExchangeValue = shopData?.shop_meta_data?.data?.gem_exchange_value;

  function renderPurchaseComponent(purchaseData: IPurchasables) {
    switch (purchaseData?.data?.slug) {
      case "booster":
        return <Booster data={purchaseData} exchangeValue={gemExchangeValue} />;

      case "gold":
        return <Gold data={purchaseData} />;

      case "gem":
        return <Gem data={purchaseData} />;

      case "placebo1":
        return (
          <Placebo1 data={purchaseData} exchangeValue={gemExchangeValue} />
        );

      case "placebo2":
        return (
          <PlaceBo2 data={purchaseData} exchangeValue={gemExchangeValue} />
        );

      case "one-time-test":
        return (
          <OnTimeTest data={purchaseData} exchangeValue={gemExchangeValue} />
        );

      case "streak_freeze":
        return (
          <StreakFreeze data={purchaseData} exchangeValue={gemExchangeValue} />
        );
    }
  }

  function findPurchaseItemData() {
    const itemdata = shopData?.purchasables.find(
      (purchasable: IPurchasables) => {
        return purchasable.id === purchaseId;
      }
    );

    return <div>{renderPurchaseComponent(itemdata)}</div>;
  }

  return <div>{findPurchaseItemData()}</div>;
}

export default PurchaseableItem;
