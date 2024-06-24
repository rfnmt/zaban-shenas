import { Box, Skeleton, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { isNumber } from "@/modules/helper";

function TheNumberOfGems() {
  const theme = useTheme() as any;
  const { wholeStudentRemaindGems } = useSelector(
    (state: RootReduxState) => state.shop
  );

  return (
    <Box className="gem-amount">
      <Image
        src="/svg/diamond.svg"
        fill
        alt=""
        className="nav-to-back-diamond"
      />
      <Box sx={{ color: theme.palette.system.blue }}>
        {isNumber(wholeStudentRemaindGems) ? (
          new Intl.NumberFormat("en-US").format(wholeStudentRemaindGems)
        ) : (
          <Skeleton className="navigate-to-back-skeleton" />
        )}
      </Box>
    </Box>
  );
}

export default TheNumberOfGems;
