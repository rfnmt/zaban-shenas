import React from "react";
import { Box } from "@mui/material";

import ImageProvider from "@/components/imageProvider";
import Icon from "@/components/icon";

function LockSession({ coverPath }: { coverPath: string }) {
  return (
    <Box className="img-wrapper">
      {coverPath && <ImageProvider width={72} height={72} src={coverPath} />}
      <Box className="session-state">
        <Box className="locked-session-cover-filter" />
        <Icon icon="lock" size={24} className="locked-icon" />
      </Box>
    </Box>
  );
}

export default LockSession;
