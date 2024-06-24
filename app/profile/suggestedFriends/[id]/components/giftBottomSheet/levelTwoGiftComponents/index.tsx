import React from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import ActivationElementsHeader from "@/components/activationElementsHeader";

type LeveltwoGiftComponentsData = {
  availableGifts: Array<any>;
  goldGifts: Array<any>;
  slug: string;
  variationTitle: string;
};

function LeveltwoGiftComponents({
  availableGifts,
  goldGifts,
  slug,
  variationTitle,
}: LeveltwoGiftComponentsData) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: any) => state.general);
  const availableGiftsData = availableGifts?.filter(
    (item) => item.slug === slug
  );
  const goldGiftsData = goldGifts?.filter((item) => item.slug === slug);
  return (
    <Box
      className="gift-bottomsheet-elements"
      sx={{
        background: `linear-gradient(270deg,${
          mode === "light"
            ? slug === "gold"
              ? goldGiftsData[0]?.theming?.background_gradiant_secondary_light
              : availableGiftsData[0]?.theming
                  ?.background_gradiant_secondary_light
            : slug === "gold"
            ? goldGiftsData[0]?.theming?.background_gradiant_secondary_dark
            : availableGiftsData[0]?.theming?.background_gradiant_secondary_dark
        }, ${
          mode === "light"
            ? slug === "gold"
              ? goldGiftsData[0]?.theming?.background_gradiant_primary_light
              : availableGiftsData[0]?.theming
                  ?.background_gradiant_primary_light
            : slug === "gold"
            ? goldGiftsData[0]?.theming?.background_gradiant_primary_dark
            : availableGiftsData[0]?.theming?.background_gradiant_primary_dark
        })`,
      }}
    >
      <ActivationElementsHeader
        lightThemeing={
          slug === "gold"
            ? goldGiftsData[0]?.theming?.text_color_light
            : availableGiftsData[0]?.theming?.text_color_light
        }
        darkThemeing={
          slug === "gold"
            ? goldGiftsData[0]?.theming?.text_color_dark
            : availableGiftsData[0]?.theming?.text_color_dark
        }
        title={
          slug === "gold"
            ? goldGiftsData[0]?.title
            : availableGiftsData[0]?.title
        }
        description={
          slug === "gold"
            ? variationTitle
              ? variationTitle
              : localStorage.getItem("stableGiftVariationTitle")
            : availableGiftsData[0]?.description
        }
        thumbnail={
          slug === "gold"
            ? goldGiftsData[0]?.images?.thumbnail
            : availableGiftsData[0]?.images?.thumbnail
        }
        customTheme={theme.palette.white.fix}
      />
    </Box>
  );
}

export default LeveltwoGiftComponents;
