import React from "react";
import { Box } from "@mui/material";

import ImageProvider from "@/components/imageProvider";

function Default({ coverPath }: { coverPath: string }) {
  return (
    <Box className="img-wrapper">
      {coverPath && <ImageProvider width={72} height={72} src={coverPath} />}
    </Box>
  );
}

export default Default;
