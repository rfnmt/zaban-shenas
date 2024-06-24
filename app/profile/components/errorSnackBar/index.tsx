import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";

type CommonErrorSnackBarData = {
  openErrorSnackbar: boolean;
  closeSnackBar: () => void;
  text: string;
};

function CommonErrorSnackBar({
  openErrorSnackbar,
  closeSnackBar,
  text,
}: CommonErrorSnackBarData) {
  return (
    <Snackbar
      open={openErrorSnackbar}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      className="main-application-snackbar"
      sx={{ backgroundColor: "error.main", zIndex: 21000 }}
    >
      <Alert
        variant="filled"
        onClose={closeSnackBar}
        severity="error"
        sx={{ width: "100%", color: "white.fix" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default CommonErrorSnackBar;
