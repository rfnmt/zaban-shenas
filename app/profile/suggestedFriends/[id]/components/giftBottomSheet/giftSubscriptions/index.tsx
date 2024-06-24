import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import ActivationElementsHeader from "@/components/activationElementsHeader";
import Cookie from "js-cookie";
import Image from "next/image";
import {
  handleGiftSwiperValue,
  setGiftName,
} from "@/providers/Redux/general/generalSlice";
import { useDispatch } from "react-redux";
import "./style.scss";

type GiftSubscription = {
  data: any;
  gemExchangeValue: number;
  setTypeOfComponent: (data: any) => void;
  setVariationTitle: (x: string) => void;
};

function GiftSubscription({
  data,
  gemExchangeValue,
  setTypeOfComponent,
  setVariationTitle,
}: GiftSubscription) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();
  function handleActiveSubscription(
    slug: string,
    title: string,
    variationTitle: string,
    finalPrice: number,
    product_id: number,
    parent_id: number
  ) {
    dispatch(handleGiftSwiperValue(1));
    dispatch(setGiftName("gold"));
    Cookie.remove("productID");
    Cookie.remove("parentID");
    Cookie.set("productID", product_id);
    Cookie.set("parentID", parent_id);
    setTypeOfComponent((prev: any) => ({
      ...prev,
      slug: slug,
      title: title,
      price: finalPrice,
      productID: product_id,
      parentID: parent_id,
    }));
    setVariationTitle(variationTitle);
    localStorage.setItem("stableGiftVariationTitle", variationTitle);
  }

  return (
    <Box
      className="gift-bottomsheet-elements"
      style={{
        background: `linear-gradient(90deg,${
          mode === "light"
            ? data?.theming?.background_gradiant_primary_light
            : data?.theming?.background_gradiant_primary_dark
        }, ${
          mode === "light"
            ? data?.theming?.background_gradiant_secondary_light
            : data?.theming?.background_gradiant_secondary_dark
        })`,
      }}
    >
      <ActivationElementsHeader
        lightThemeing={data.theming?.text_color_light}
        darkThemeing={data.theming?.text_color_dark}
        title={data?.title}
        description={data?.description}
        thumbnail={data?.images?.thumbnail}
        customTheme={theme.palette.white.fix}
      />

      {data?.pricing?.variations.map((item: any) => {
        return (
          <Button
            onClick={() =>
              handleActiveSubscription(
                data?.slug,
                data.title,
                item.title,
                (item?.price * item?.duration) / gemExchangeValue,
                item?.id,
                data?.id
              )
            }
            key={item.id}
            className="subscription-variations"
            sx={{
              backgroundColor: theme.palette.blackTransparent["1"],
              "&:hover": {
                backgroundColor: theme.palette.blackTransparent["1"],
              },
            }}
          >
            <Typography sx={{ color: theme.palette.white.fix }}>
              {item?.title}
            </Typography>
            <Typography sx={{ color: theme.palette.white.fix }}>
              {new Intl.NumberFormat("en-US").format(
                (item?.price * item?.duration) / gemExchangeValue
              )}
            </Typography>
            <Image
              width={24}
              height={24}
              src="/svg/diamond.svg"
              alt=""
              className="diamond"
            />
          </Button>
        );
      })}
    </Box>
  );
}

export default GiftSubscription;
