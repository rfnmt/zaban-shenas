import Image from "next/image";
import React, { useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { CurrentCourseInterface } from "@/app/home/index.interfaces";
import { IShop } from "@/app/setting/store/store.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import Icon from "@/components/icon";
import {
  setOpenActivationBottomSheet,
  setOpenProductBottomSheet,
} from "@/providers/Redux/general/generalSlice";
import {
  closeBoard,
  setNeedingOneGem,
} from "@/providers/Redux/home/freemuim/freemuimBoardHomeSlice";

function PurchaseItemsToGetMoreEnergy() {
  const dispatch = useDispatch();
  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const shopData = queryClient.getQueryData<IShop>(["shop-data"]);

  const energyPurchase = shopData?.purchasables?.find(
    (item) => item?.data?.type === "energy"
  );

  function openProductBottomSheet() {
    dispatch(closeBoard());
    dispatch(setOpenProductBottomSheet(true));
  }

  const purchasItemsToGetMoreEnergy = useMemo(() => {
    if (cachedUserCurrentCourseAllData?.courses[0]) {
      const purchasItems = [];

      if (cachedUserCurrentCourseAllData?.courses[0]?.data?.purchasable) {
        const gemEexchangeValue =
          shopData?.shop_meta_data.data.gem_exchange_value;

        const purchasables =
          [cachedUserCurrentCourseAllData?.courses[0]?.data?.purchasable] || [];

        const filterShopPurchasables = shopData?.purchasables.filter((r) =>
          purchasables.includes(r.id)
        );

        const purchasedProducts = shopData?.purchased_products.find(
          (item) => item.id === energyPurchase?.id
        );

        if (purchasedProducts) {
          const findEnergyPurchase = shopData?.purchasables.find(
            (purchase) => purchase.data.title === energyPurchase?.data.title
          );

          const { remaining_amount, max_amount } = purchasedProducts.data;

          if (findEnergyPurchase && max_amount > remaining_amount) {
            const { price } = findEnergyPurchase?.data?.pricing;
            purchasItems.push(
              <Button
                onClick={() => {
                  localStorage.setItem("activationID", energyPurchase?.id);
                  dispatch(setOpenActivationBottomSheet(true));
                  dispatch(closeBoard());
                  dispatch(setNeedingOneGem(price / gemEexchangeValue));
                }}
                sx={{
                  backgroundColor: "white.flexible",
                  boxShadow: "0px 1px 1px #00000029",
                }}
                className="purchase-item single-energy"
                key={findEnergyPurchase.id}
              >
                <div className="description">
                  <Icon width={24} height={24} icon="thunder" />
                  <Typography sx={{ direction: "rtl", color: "gray.1" }}>
                    1 {findEnergyPurchase.data.title}
                  </Typography>
                </div>
                {gemEexchangeValue && (
                  <Typography sx={{ color: "gray.1" }}>
                    <Image
                      src="/svg/diamond.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    {price / gemEexchangeValue}
                  </Typography>
                )}
              </Button>
            );
          }

          if (max_amount > remaining_amount + 1) {
            purchasItems.push(
              <Button
                onClick={() => {
                  localStorage.setItem("activationID", energyPurchase?.id);
                  localStorage.removeItem("needingOneGem");
                  dispatch(setOpenActivationBottomSheet(true));
                  dispatch(closeBoard());
                }}
                key="replenish-energy"
                className="purchase-item replenish-energy"
                sx={{
                  backgroundColor: "white.flexible",
                  boxShadow: "0px 1px 1px #00000029",
                }}
              >
                <div className="description fill-energy">
                  <Icon width={24} height={24} icon="thunder" />
                  <Icon width={24} height={24} icon="thunder" />
                  <Typography sx={{ color: "gray.1" }}>پر کردن</Typography>
                </div>
                {gemEexchangeValue && findEnergyPurchase?.data?.pricing && (
                  <Typography sx={{ color: "gray.1" }}>
                    <Image
                      src="/svg/diamond.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    {(findEnergyPurchase?.data?.pricing.price /
                      gemEexchangeValue) *
                      (max_amount - remaining_amount)}
                  </Typography>
                )}
              </Button>
            );
          }
        }

        if (filterShopPurchasables)
          filterShopPurchasables.map((item) => {
            purchasItems.push(
              <Button
                onClick={openProductBottomSheet}
                sx={{
                  backgroundColor: "white.flexible",
                  boxShadow: "0px 1px 1px #00000029",
                }}
                className="purchase-item"
                key={item.id}
              >
                <div className="description">
                  <Icon icon="infinity" width={20} />
                  <Typography sx={{ color: "gray.1" }}>
                    {energyPurchase?.data.title} بی نهایت{" "}
                  </Typography>
                </div>
                <Typography sx={{ color: "gray.1" }}>
                  {item.data.title}
                </Typography>
              </Button>
            );
          });

        return (
          <>
            <div className="fa-body">
              <Typography className="fa-tag" sx={{ color: "gray.2" }}>
                با استفاده از روش های زیر میتونی
              </Typography>
              <Typography className="fa-tag" sx={{ color: "success.main" }}>
                {energyPurchase?.data.title}
              </Typography>
              <Typography className="fa-tag" sx={{ color: "gray.2" }}>
                بگیری
              </Typography>
            </div>
            {purchasItems}
          </>
        );
      }
    }
  }, [cachedUserCurrentCourseId]);

  return <div>{purchasItemsToGetMoreEnergy}</div>;
}

export default PurchaseItemsToGetMoreEnergy;
