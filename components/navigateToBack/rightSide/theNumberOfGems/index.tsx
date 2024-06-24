import { IconButton, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

import Icon from "@/components/icon";

function TheNumberOfGems() {
  const theme = useTheme() as any;

  return (
    <Link href="/setting">
      <IconButton
        sx={{
          "& svg": {
            "& path": {
              fill: `${theme.palette.icon["2"]} !important`,
            },
          },
        }}
      >
        <Icon icon="arrow_back" size="48" />
      </IconButton>
    </Link>
  );
}

export default TheNumberOfGems;
