import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Z3DButton from "../Z3DButton";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../icon";
import {
  calcDiffMinuteWithNow,
  calcNeededGEM,
  remainingDates,
} from "@/modules/helper";
import { useTheme } from "@emotion/react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import { setOpenActivationBottomSheet } from "@/providers/Redux/general/generalSlice";
import Image from "next/image";
import ActivationElementsHeader from "../activationElementsHeader";
import StoreElementsSelectMaxDiscount from "../storeElementsSelectMaxDiscount";

type Props = {
  data: any;
  exchangeValue: number;
};
function OnTimeTest({ data, exchangeValue }: Props) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const [selectMaximumDiscount, setSelectMaximumDiscount] = useState<number>(0);
  const { mode } = useSelector((state: any) => state.general);
  const [discountsRemaningTime, setDiscountsRemaningTime] = useState<any>();

  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;

  const globalDiscount = shopData?.discounts.find(
    (item) => item.id === data.id
  );

  // in one-times there are not any amounts like max_amount and remaining_amount
  const globalPurchaseProduct = shopData?.purchased_products.find(
    (item) => item.id === data.id
  );

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

  function handleActivationProductData() {
    localStorage.removeItem("needingOneGem");
    localStorage.setItem("activationID", data.id);
    dispatch(setOpenActivationBottomSheet(true));
  }

  const neededGem = calcNeededGEM({
    price: pricing?.price,
    maxAmount: pricing?.max_amount,
    gemExchangeValue: exchangeValue,
    type: "one-time",
  });

  return (
    <Box
      className="store-elements-container"
      style={{
        background: `linear-gradient(90deg,${
          mode === "light"
            ? theming?.background_gradiant_secondary_light
            : theming?.background_gradiant_secondary_dark
        }, ${
          mode === "light"
            ? theming?.background_gradiant_primary_light
            : theming?.background_gradiant_primary_dark
        })`,
      }}
    >
      <ActivationElementsHeader
        title={title}
        description={description}
        thumbnail={images?.thumbnail}
        customTheme={theme.palette.gray["1"]}
      />
      {selectMaximumDiscount ? (
        <StoreElementsSelectMaxDiscount
          selectMaximumDiscount={selectMaximumDiscount}
          discountsRemaningTime={discountsRemaningTime}
        />
      ) : (
        <></>
      )}
      {Boolean(globalPurchaseProduct) ? (
        <Typography
          sx={{ color: "success.main" }}
          className="one-time-activate-time"
        >
          فعال
        </Typography>
      ) : (
        <Z3DButton onClick={handleActivationProductData}>
          {button?.purchase_label}&nbsp;
          {new Intl.NumberFormat("en-US").format(neededGem)}
          &nbsp;
          <Image src="/svg/diamond.svg" fill alt="" className="diamond" />
        </Z3DButton>
      )}
    </Box>
  );
}

export default OnTimeTest;
