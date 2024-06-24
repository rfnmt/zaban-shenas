import { Button } from "@mui/material";
import React from "react";

import Icon from "@/components/icon";

function DisableAndLocked() {
  return (
    <Button
      className="disable-and-locked"
      startIcon={<Icon icon="lock" size={18} />}
      sx={{
        color: "gray.3",
        "& svg": { stroke: "gray.3" },
        backgroundColor: "disable.main",
      }}
    >
      شروع
    </Button>
  );
}

export default DisableAndLocked;
