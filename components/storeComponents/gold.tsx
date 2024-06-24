import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Z3DButton from "../Z3DButton";
import { setOpenProductBottomSheet } from "@/providers/Redux/general/generalSlice";
import { remainingDates } from "@/modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IPurchasables, IShop } from "@/app/setting/store/store.interfaces";
import ActivationElementsHeader from "../activationElementsHeader";
import StoreElementsSelectMaxDiscount from "../storeElementsSelectMaxDiscount";

type Props = {
  data: IPurchasables;
};

function Gold({ data }: Props) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const [selectMaximumDiscount, setSelectMaximumDiscount] = useState<number>(0);
  const { mode } = useSelector((state: any) => state.general);
  const [discountsRemaningTime, setDiscountsRemaningTime] = useState<any>();

  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;

  const globalDiscount = shopData?.discounts.find(
    (item) => item.id === data.id
  );

  //

  const getSubscriptionData: any = shopData?.purchased_products.find(
    (item, index) => {
      return item.id === data?.data?.id;
    }
  )?.data?.expiry_date;

  const {
    theming,
    discount: localDiscount,
    button,
    pricing,
    title,
    description,
    images,
  } = data?.data;

  useEffect(() => {
    setSelectMaximumDiscount(
      Math.max(
        localDiscount?.discount_percentage || 0,
        globalDiscount?.data?.discount_percentage || 0
      )
    );

    if (globalDiscount?.data?.expiry_date)
      setDiscountsRemaningTime(
        remainingDates(globalDiscount?.data?.expiry_date)
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openProduct() {
    dispatch(setOpenProductBottomSheet(true));
  }

  return (
    <Box
      key={data?.id}
      className="store-elements-container"
      style={{
        background: `linear-gradient(90deg,${
          mode === "light"
            ? theming?.background_gradiant_primary_light
            : theming?.background_gradiant_primary_dark
        }, ${
          mode === "light"
            ? theming?.background_gradiant_secondary_light
            : theming?.background_gradiant_secondary_dark
        })`,
      }}
    >
      <ActivationElementsHeader
        title={title}
        description={description}
        thumbnail={images?.thumbnail}
        customTheme={theme.palette.white.fix}
      />
      {selectMaximumDiscount ? (
        <StoreElementsSelectMaxDiscount
          selectMaximumDiscount={selectMaximumDiscount}
          discountsRemaningTime={discountsRemaningTime}
          discountCustomColor="error.main"
        />
      ) : (
        <></>
      )}

      <Box
        className={
          Boolean(remainingDates(getSubscriptionData))
            ? "subscription-button-expiry-data"
            : "subscription-button-without-expiry-data"
        }
      >
        {Boolean(remainingDates(getSubscriptionData)) ? (
          <Typography sx={{ color: "white.fix" }}>
            فعال تا{"  "}
            {remainingDates(getSubscriptionData)}
          </Typography>
        ) : (
          <></>
        )}

        <Z3DButton
          background={`${
            mode === "light"
              ? button?.background_color_light
              : button?.background_color_dark
          }`}
          color={`${
            mode === "light"
              ? button?.text_color_light
              : button?.text_color_dark
          }`}
          onClick={openProduct}
        >
          {Boolean(remainingDates(getSubscriptionData))
            ? button?.repurchase_label
            : button?.purchase_label}
        </Z3DButton>
      </Box>
    </Box>
  );
}

export default Gold;
