"use client";

import React, { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import Cookie from "js-cookie";
import Lottie from "react-lottie-player";

import { useTheme } from "@emotion/react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import {
  setOpenCheckoutBottomSheet,
  setOpenProductBottomSheet,
} from "@/providers/Redux/general/generalSlice";
import "./style.scss";
import Icon from "../icon";
import SubscriptionsDetailedDescriptionList from "../subscriptionsDetailedDescriptionList";
import SubscriptionsPrice from "../subscriptionsPrice";

function ProductBottomSheet() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectMaximumDiscount, setSelectMaximumDiscount] = useState<number>(0);
  const { openProductBottomSheet, mode } = useSelector(
    (state: any) => state.general
  );

  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;

  const goldData = shopData?.purchasables?.find(
    (item: any, index: number) => item?.data?.slug === "gold"
  );
  const globalDiscount = shopData?.discounts?.find(
    (item) => item.id === goldData?.id
  );

  useEffect(() => {
    setSelectMaximumDiscount(
      Math.max(
        goldData?.data?.discount?.discount_percentage || 0,
        globalDiscount?.data?.discount_percentage || 0
      )
    );
  }, [globalDiscount, goldData]);

  function closeBottomSheet() {
    dispatch(setOpenProductBottomSheet(false));
    router.replace(`${pathname}`);
  }

  function handleVariations(parentID: number, variationID: number) {
    Cookie.remove("productID");
    Cookie.remove("parentID");
    Cookie.set("productID", variationID);
    Cookie.set("parentID", parentID);
    dispatch(setOpenCheckoutBottomSheet(true));
  }

  //

  return (
    <>
      <Sheet
        className="product-bottom-sheet-wrapper"
        detent="full-height"
        isOpen={
          openProductBottomSheet || searchParams.get("product") === "true"
        }
        onClose={closeBottomSheet}
        disableDrag={true}
      >
        <Sheet.Container
          style={{
            background: `linear-gradient(328deg,${
              mode === "light"
                ? goldData?.data?.theming?.background_gradiant_primary_light
                : goldData?.data?.theming?.background_gradiant_primary_dark
            }, ${
              mode === "light"
                ? goldData?.data?.theming?.background_gradiant_secondary_light
                : goldData?.data?.theming?.background_gradiant_secondary_dark
            })`,
          }}
        >
          <Sheet.Content>
            <Button
              className="close-product-bottom-sheet"
              onClick={closeBottomSheet}
              sx={{
                "& svg": {
                  fill: `${theme.palette.white.fix} !important`,
                },
              }}
            >
              <Icon icon="white_close" size="48" />
            </Button>
            <Box className="animation">
              {goldData?.data?.images?.animation && (
                <Lottie
                  loop={false}
                  path={goldData?.data?.images?.animation}
                  play
                  style={{ width: 144, height: 144 }}
                />
              )}
            </Box>
            <Typography
              className="main-title"
              sx={{ color: theme.palette.white.fix }}
            >
              {goldData?.data?.slogan}
            </Typography>

            <SubscriptionsDetailedDescriptionList
              goldData={goldData?.data?.detailed_description_list}
              goldLightTheme={goldData?.data?.theming?.text_color_light}
              goldDarkTheme={goldData?.data?.theming?.text_color_dark}
            />

            <SubscriptionsPrice
              variations={goldData?.data?.pricing?.variations}
              goldLightTheme={goldData?.data?.theming?.text_color_light}
              goldDarkTheme={goldData?.data?.theming?.text_color_dark}
              selectMaximumDiscount={selectMaximumDiscount}
              handleVariations={handleVariations}
              productionID={goldData?.data?.id}
            />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}

export default ProductBottomSheet;
