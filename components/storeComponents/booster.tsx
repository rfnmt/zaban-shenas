import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Z3DButton from "../Z3DButton";
import Icon from "../icon";
import {
  calcDiffMinuteWithNow,
  calcDiffSecondsWithNow,
  calcNeededGEM,
  remainingDates,
} from "@/modules/helper";
import { setOpenActivationBottomSheet } from "@/providers/Redux/general/generalSlice";
import { useTheme } from "@emotion/react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import {
  setwholeStudentRemaindGems,
  updateBoosterExpiryDate,
} from "@/providers/Redux/setting/shop/shopSlice";
import { RootReduxState } from "@/providers/Redux/store";
import ActivationElementsHeader from "../activationElementsHeader";
import StoreElementsSelectMaxDiscount from "../storeElementsSelectMaxDiscount";
import StoreExpiryDate from "../storeExpiryDate";
import { IStudentData } from "@/models/studentData.interfaces";

type Props = {
  data: any;
  exchangeValue: number;
};

let time: number | NodeJS.Timeout = 0;

function Booster({ data, exchangeValue }: Props) {
  //

  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const [selectMaximumDiscount, setSelectMaximumDiscount] = useState<number>(0);
  const { mode } = useSelector((state: any) => state.general);
  const [discountsRemaningTime, setDiscountsRemaningTime] = useState<any>();

  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

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

  const [expiryDate, setExpiryDate] = useState<any>();
  const { boosterExpiryDate } = useSelector(
    (state: RootReduxState) => state.shop
  );

  useEffect(() => {
    if (calcDiffSecondsWithNow(boosterExpiryDate) > 0) {
      time = setInterval(() => {
        //
        setExpiryDate(calcDiffSecondsWithNow(boosterExpiryDate));

        if (calcDiffSecondsWithNow(boosterExpiryDate) > 0) {
        }
      }, 1000);
    } else {
      setExpiryDate(-1);
      clearInterval(time);
    }

    return () => {
      clearInterval(time);
    };
  }, [boosterExpiryDate, expiryDate]);

  useEffect(() => {
    if (globalPurchaseProduct?.data?.expiry_date) {
      const { expiry_date }: any = globalPurchaseProduct?.data;

      if (calcDiffSecondsWithNow(expiry_date) > 0)
        dispatch(updateBoosterExpiryDate(expiry_date));
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const studentTotalGem = studentData?.attributes?.data?.find(
      (item: any) => item.name === "gem"
    )?.value;

    //

    dispatch(setwholeStudentRemaindGems(studentTotalGem));

    return () => {};
  }, [studentData]);

  return (
    <Box
      className="store-elements-container"
      sx={{
        background: `linear-gradient(270deg,${
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
      <StoreExpiryDate
        expiryDate={expiryDate}
        handleActivationProductData={handleActivationProductData}
        neededGem={neededGem}
        purchase_label={button?.purchase_label}
      />
    </Box>
  );
}

export default Booster;
