import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import { calcDiffMinuteWithNow } from "@/modules/helper";

let time: number | NodeJS.Timeout = 0;

function RemainingAmountEnergyState() {
  const shopData = queryClient.getQueryData<IShop>(["shop-data"]);

  const energyPurchase = shopData?.purchasables?.find(
    (item) => item?.data?.type === "energy"
  );

  const purchasedProducts = shopData?.purchased_products.find(
    (item) => item.id === energyPurchase?.id
  );

  function toHoursAndMinutes() {
    const diffMin = calcDiffMinuteWithNow(
      purchasedProducts?.data.next_refill_date
    );

    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;
    return { hours, minutes };
  }

  const energyState = useMemo(() => {
    if (purchasedProducts) {
      const { remaining_amount, max_amount } = purchasedProducts.data;
      if (remaining_amount === max_amount) {
        return (
          <>
            <Typography sx={{ color: "success.main" }}>
              {energyPurchase?.data.title}
            </Typography>
            <Typography sx={{ color: "gray.1" }}>
              شما کامله! بزن بریم سراغ درس جدید!
            </Typography>
          </>
        );
      } else if (remaining_amount < max_amount) {
        return (
          <>
            <Typography sx={{ color: "gray.1" }}>
              {toHoursAndMinutes().hours
                ? toHoursAndMinutes().hours + " ساعت"
                : ""}
              {toHoursAndMinutes().minutes && toHoursAndMinutes().hours
                ? " و "
                : ""}
              {toHoursAndMinutes().minutes
                ? toHoursAndMinutes().minutes + " دقیقه"
                : ""}{" "}
              ساعت دیگ صبر کنی
            </Typography>
            <Typography sx={{ color: "success.main" }}>
              {energyPurchase?.data.title}
            </Typography>
            <Typography sx={{ color: "gray.1" }}> میگیری</Typography>
          </>
        );
      }
    }
  }, [purchasedProducts]);

  return <div className="fa-body">{energyState}</div>;
}

export default RemainingAmountEnergyState;
