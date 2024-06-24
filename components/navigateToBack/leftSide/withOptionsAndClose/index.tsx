import { IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

import Icon from "@/components/icon";

function WithOptionsAndClose() {
  // let path: string | string[] = usePathname();
  // path = path.split("/").slice(0, -1).join("/") || "/";

  return (
    <Link href={"/setting"}>
      <IconButton sx={{ marginRight: "auto" }}>
        <Icon icon="settingsIcon" size={32} />
      </IconButton>
    </Link>
  );
}

export default WithOptionsAndClose;
