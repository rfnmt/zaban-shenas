import { IconButton, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

import Icon from "@/components/icon";

function WithBackButton() {
  const theme = useTheme() as any;
  let path: string | string[] = usePathname();

  if (path?.split("/")[2] === "vocab-examination") {
    path = "/onboarding";
  } else if (path.startsWith("/profile/followersFollowings")) {
    path = "/profile";
  } else {
    path = path.split("/").slice(0, -1).join("/") || "/";
  }

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
        <Icon icon="arrow_back" size="48" />
      </IconButton>
    </Link>
  );
}

export default WithBackButton;
