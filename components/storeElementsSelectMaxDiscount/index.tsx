import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";

type Props = {
  selectMaximumDiscount: number;
  discountsRemaningTime: string | undefined;
  discountCustomColor?: string;
};

function StoreElementsSelectMaxDiscount({
  selectMaximumDiscount,
  discountsRemaningTime,
  discountCustomColor,
}: Props) {
  const theme = useTheme() as any;
  return (
    <Box
      className="discount"
      sx={{
        backgroundColor: theme.palette.blackTransparent["1"],
        color: discountCustomColor || theme.palette.white.fix,
      }}
    >
      <Typography>%{selectMaximumDiscount}</Typography>
      <Typography> تخفیف </Typography>
      {Boolean(discountsRemaningTime) && (
        <>
          <Typography>تا</Typography>
          <Typography>{discountsRemaningTime} روز دیگر</Typography>
        </>
      )}
    </Box>
  );
}

export default StoreElementsSelectMaxDiscount;
