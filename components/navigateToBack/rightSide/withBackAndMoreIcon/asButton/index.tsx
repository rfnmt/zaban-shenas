import { IconButton, useTheme } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import Icon from "@/components/icon";
import { updateVisibleTipBottomSheet } from "@/providers/Redux/general/generalSlice";

function AsButton() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(updateVisibleTipBottomSheet(false))}
      sx={{
        marginLeft: "auto",
        "& svg": {
          "& path": {
            fill: `${theme.palette.icon["2"]} !important`,
          },
        },
      }}
    >
      <Icon icon={"close"} size="48" />
    </IconButton>
  );
}

export default AsButton;
