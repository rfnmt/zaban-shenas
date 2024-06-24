import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Z3DButton from "../Z3DButton";
import Icon from "../icon";
import { calcNeededGEM, remainingDates } from "@/modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import { setOpenActivationBottomSheet } from "@/providers/Redux/general/generalSlice";
import ActivationElementsHeader from "../activationElementsHeader";
import StoreElementsSelectMaxDiscount from "../storeElementsSelectMaxDiscount";
import StoreChainRemainingAmount from "../storeChainRemainingAmount";

type Props = {
  data: any;
  exchangeValue: number;
};

function Placebo1({ data, exchangeValue }: Props) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const [selectMaximumDiscount, setSelectMaximumDiscount] = useState<number>(0);
  const { mode } = useSelector((state: any) => state.general);
  const [discountsRemaningTime, setDiscountsRemaningTime] = useState<any>();

  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;

  const globalDiscount = shopData?.discounts.find(
    (item) => item.id === data.id
  );

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
    maxAmount:
      pricing?.max_amount -
      (globalPurchaseProduct?.data?.remaining_amount || 0),
    gemExchangeValue: exchangeValue,
    type: "",
  });

  return (
    <Box
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
        />
      ) : (
        <></>
      )}

      {globalPurchaseProduct?.data?.remaining_amount === undefined ? (
        <></>
      ) : (
        <StoreChainRemainingAmount
          max_amount={pricing?.max_amount}
          remaining_amount={globalPurchaseProduct?.data?.remaining_amount}
        />
      )}
      {globalPurchaseProduct?.data?.remaining_amount === pricing?.max_amount ? (
        <></>
      ) : (
        <Z3DButton onClick={handleActivationProductData}>
          {globalPurchaseProduct?.data?.remaining_amount === undefined ||
          globalPurchaseProduct?.data?.remaining_amount === 0
            ? button?.repurchase_label
            : button?.purchase_label}
          &nbsp;
          {new Intl.NumberFormat("en-US").format(neededGem)}
          &nbsp;
          <Image src="/svg/diamond.svg" fill alt="" className="diamond" />
        </Z3DButton>
      )}
    </Box>
  );
}

export default Placebo1;
