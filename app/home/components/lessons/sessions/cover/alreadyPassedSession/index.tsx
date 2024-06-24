import React from "react";
import { Box } from "@mui/material";

import ImageProvider from "@/components/imageProvider";
import Icon from "@/components/icon";

function AlreadyPassedSession({ coverPath }: { coverPath: string }) {
  return (
    <Box className="img-wrapper">
      {coverPath && <ImageProvider width={72} height={72} src={coverPath} />}
      <Box className="session-state">
        <Box className="passed-session-gradient" />
        <Icon icon="check-circle" size={24} className="passed-icon" />
      </Box>
    </Box>
  );
}

export default AlreadyPassedSession;
