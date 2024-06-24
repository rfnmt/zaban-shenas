import { useSelector } from "react-redux";
import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import Image from "next/image";

import { isNumber } from "@/modules/helper";
import { RootReduxState } from "@/providers/Redux/store";
import { usePathname } from "next/navigation";

function WithCloseButton() {
  const theme = useTheme() as any;
  const { wholeStudentRemaindGems } = useSelector(
    (state: RootReduxState) => state.shop
  );
  const pathname = usePathname();
  return pathname.split("/")[1] === "session" ? (
    <Box />
  ) : (
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

export default WithCloseButton;
