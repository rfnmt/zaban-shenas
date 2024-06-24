import { Box, Button } from "@mui/material";
import React from "react";

import "./styles.scss";

type Props = {
  callback: () => void;
  title?: string | null | undefined;
};

function ReTryRequest({ callback, title = "خطا در ارتباط با سرور" }: Props) {
  return (
    <Box
      className="container retry-request"
      sx={{ backgroundColor: "background.main", color: "gray.1" }}
    >
      {title}
      <Button variant="contained" color="warning" onClick={callback}>
        تلاش دوباره
      </Button>
    </Box>
  );
}

export default ReTryRequest;
