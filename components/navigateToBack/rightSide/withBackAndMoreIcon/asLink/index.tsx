import React from "react";
import { usePathname } from "next/navigation";
import { IconButton, useTheme } from "@mui/material";
import Link from "next/link";

import Icon from "@/components/icon";

function AsLink() {
  const theme = useTheme() as any;

  let path: string | string[] = usePathname();

  if (path.startsWith("/session")) {
    path = "/";
  } else if (
    path.startsWith(`/profile/suggestedFriends/${Number(path.split("/")[3])}`)
  ) {
    path = "/profile/suggestedFriends";
  } else if (path.startsWith("/profile/suggestedFriends")) {
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
        <Icon icon={"arrow_back"} size="48" />
      </IconButton>
    </Link>
  );
}

export default AsLink;
