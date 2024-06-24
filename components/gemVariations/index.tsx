import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import LottieLoading from "../lottieLoading";
import Image from "next/image";
import "./style.scss";

type Props = {
  gemVariations: any;
  productionID: number;
  handleGemVariations: (x: number, y: number) => void;
  loading: boolean;
  specificVariationID: number | undefined;
};

function GemVariations({
  gemVariations,
  productionID,
  handleGemVariations,
  loading,
  specificVariationID,
}: Props) {
  const theme = useTheme() as any;

  return (
    <Box className="gem-variations-wrapper">
      {gemVariations?.map((item: any, index: number) => {
        return (
          <Button
            key={item?.id}
            className="gem-variation"
            onClick={() => handleGemVariations(productionID, item.id)}
            disabled={loading}
          >
            <LottieLoading
              open_lottie={specificVariationID === item.id && loading}
              lottie_className="buyingGemLoading"
            />
            <Typography
              className="gem-amount"
              sx={{
                color: theme.palette.white.fix,
              }}
            >
              {new Intl.NumberFormat("en-US").format(item?.amount)}
            </Typography>
            <Typography
              className="gem-price"
              sx={{
                color: theme.palette.white.fix,
              }}
            >
              {new Intl.NumberFormat("en-US").format(item?.price)} تومان
            </Typography>
            <Image fill src={item?.thumbnail} alt="" />
          </Button>
        );
      })}
    </Box>
  );
}

export default GemVariations;
