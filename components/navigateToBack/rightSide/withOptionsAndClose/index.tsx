import { IconButton, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

import Icon from "@/components/icon";

function WithOptionsAndClose() {
  const theme = useTheme() as any;

  let path: string | string[] = usePathname();
  path = path.split("/").slice(0, -1).join("/") || "/";

  return (
    <Link href={path}>
      <IconButton
        sx={{
          marginLeft: "auto",
          "& svg": {
            "& path": {
              fill: `${theme.palette.icon["2"]} !important`,
            },
          },
        }}
      >
        <Icon icon="close" size="48" />
      </IconButton>
    </Link>
  );
}

export default WithOptionsAndClose;
