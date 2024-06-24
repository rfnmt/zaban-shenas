import { Box, useTheme } from "@mui/material";
import React from "react";

import { characterStyles } from "@/components/textProcessing/helpers/characterStyling";

function InvisibleItem({ element }) {
  const theme = useTheme() as any;

  return (
    <Box
      component="span"
      className="slice blank"
      sx={{
        // height: "50px",
        display: "inline-block",
        borderBottom: (theme) => `1px solid ${theme.palette.border.main}`,
        minWidth: `calc(${element.string.length + 3} * 7px) !important`,
        ...characterStyles(element?.style?.attributes),
        "& span": {
          border: `1px solid ${theme.palette.border.main}`,
        },
      }}
    />
  );
}

export default InvisibleItem;
