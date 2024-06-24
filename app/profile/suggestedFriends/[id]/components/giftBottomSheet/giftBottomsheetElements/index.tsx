import React from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ActivationElementsHeader from "@/components/activationElementsHeader";
import { useTheme } from "@emotion/react";
import Z3DButton from "@/components/Z3DButton";
import Image from "next/image";
import {
  handleGiftSwiperValue,
  setGiftName,
} from "@/providers/Redux/general/generalSlice";
import "./style.scss";

type GiftBottomsheetElementData = {
  data: any;
  gemExchangeValue: number;
  setTypeOfComponent: (x: any) => void;
};

function GiftBottomsheetElement({
  data,
  gemExchangeValue,
  setTypeOfComponent,
}: GiftBottomsheetElementData) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();
  function handleActivationProductData(
    slug: string,
    title: string,
    finalPrice: number,
    product_id: number
  ) {
    dispatch(handleGiftSwiperValue(1));
    dispatch(setGiftName(""));
    setTypeOfComponent((prev: any) => ({
      ...prev,
      slug: slug,
      title: title,
      price: finalPrice,
      productID: product_id,
      parentID: null,
    }));
    localStorage.setItem("activationID", data.id);
  }

  return (
    <Box
      className="gift-bottomsheet-elements"
      sx={{
        background: `linear-gradient(270deg,${
          mode === "light"
            ? data?.theming?.background_gradiant_secondary_light
              ? data?.theming?.background_gradiant_secondary_light
              : "#6495ed"
            : data?.theming?.background_gradiant_secondary_dark
            ? data?.theming?.background_gradiant_secondary_dark
            : "#6495ed"
        }, ${
          mode === "light"
            ? data?.theming?.background_gradiant_primary_light
              ? data?.theming?.background_gradiant_primary_light
              : "#0000FF"
            : data?.theming?.background_gradiant_primary_dark
            ? data?.theming?.background_gradiant_primary_dark
            : "#0000FF"
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
      <Z3DButton
        background={
          mode === "light"
            ? data?.button.background_color_light
            : data?.button.background_color_dark
        }
        onClick={() =>
          handleActivationProductData(
            data?.slug,
            data?.title,
            (Math.round(data?.pricing?.price / 1000) * 1000) / gemExchangeValue,
            data?.id
          )
        }
      >
        {new Intl.NumberFormat("en-US").format(
          (Math.round(data?.pricing?.price / 1000) * 1000) / gemExchangeValue
        )}
        &nbsp;
        <Image src="/svg/diamond.svg" width={20} height={20} alt="" />
      </Z3DButton>
    </Box>
  );
}

export default GiftBottomsheetElement;
