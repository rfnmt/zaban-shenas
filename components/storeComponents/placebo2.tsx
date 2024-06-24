import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Z3DButton from "../Z3DButton";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../icon";
import {
  calcDiffMinuteWithNow,
  calcDiffSecondsWithNow,
  calcNeededGEM,
  remainingDates,
} from "@/modules/helper";
import { setOpenActivationBottomSheet } from "@/providers/Redux/general/generalSlice";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import {
  setwholeStudentRemaindGems,
  updatePlacebo2ExpiryDate,
} from "@/providers/Redux/setting/shop/shopSlice";
import ActivationElementsHeader from "../activationElementsHeader";
import StoreElementsSelectMaxDiscount from "../storeElementsSelectMaxDiscount";
import StoreExpiryDate from "../storeExpiryDate";
import { IStudentData } from "@/models/studentData.interfaces";

type Props = {
  data: any;
  exchangeValue: number;
};
let time: number | NodeJS.Timeout = 0;

function PlaceBo2({ data, exchangeValue }: Props) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const [selectMaximumDiscount, setSelectMaximumDiscount] = useState<number>(0);
  const { mode } = useSelector((state: any) => state.general);
  const [discountsRemaningTime, setDiscountsRemaningTime] = useState<any>();

  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;
  const StudentData = queryClient.getQueryData<IStudentData>(["student-data"]);

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

    if (globalDiscount?.data?.expiry_date) {
      setDiscountsRemaningTime(
        remainingDates(globalDiscount?.data?.expiry_date)
      );
    }
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

  const [expiryDate, setExpiryDate] = useState<any>();
  const { placebo2ExpiryDate } = useSelector(
    (state: RootReduxState) => state.shop
  );

  useEffect(() => {
    if (calcDiffSecondsWithNow(placebo2ExpiryDate) > 0) {
      time = setInterval(() => {
        //
        setExpiryDate(calcDiffSecondsWithNow(placebo2ExpiryDate));

        if (calcDiffSecondsWithNow(placebo2ExpiryDate) > 0) {
        }
      }, 1000);
    } else {
      setExpiryDate(-1);
      clearInterval(time);
    }

    return () => {
      clearInterval(time);
    };
  }, [placebo2ExpiryDate, expiryDate]);

  useEffect(() => {
    if (globalPurchaseProduct?.data?.expiry_date) {
      const { expiry_date }: any = globalPurchaseProduct?.data;

      if (calcDiffSecondsWithNow(expiry_date) > 0)
        dispatch(updatePlacebo2ExpiryDate(expiry_date));
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const studentTotalGem = StudentData?.attributes?.data?.find(
      (item: any) => item.name === "gem"
    )?.value;

    //

    dispatch(setwholeStudentRemaindGems(studentTotalGem));

    return () => {};
  }, [StudentData]);

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
      sx={{
        background: theming === null && theme.palette.white.flexible,
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

      <StoreExpiryDate
        expiryDate={expiryDate}
        handleActivationProductData={handleActivationProductData}
        neededGem={neededGem}
        purchase_label={button?.purchase_label}
        serverBackground={
          mode === "light"
            ? button?.background_color_light
            : button?.background_color_dark
        }
        serverColor={
          mode === "light" ? button?.text_color_light : button?.text_color_dark
        }
      />
    </Box>
  );
}

export default PlaceBo2;
