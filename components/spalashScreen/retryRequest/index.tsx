import { Button } from "@mui/material";
import React from "react";

function RequestToTryRequset({ callback }) {
  return (
    <Button onClick={callback} color="error" variant="contained">
      تلاش دوباره
    </Button>
  );
}

export default RequestToTryRequset;
