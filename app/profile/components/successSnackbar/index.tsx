import React from "react";
import { Alert, Snackbar, Typography } from "@mui/material";
import Icon from "@/components/icon";

type CommonSuccessSnackBarData = {
  openSuccessSnackbar: boolean;
  closeSnackBar: () => void;
  getUserName?: string;
  type: string;
};

function CommonSuccessSnackBar({
  openSuccessSnackbar,
  closeSnackBar,
  getUserName,
  type,
}: CommonSuccessSnackBarData) {
  return (
    <Snackbar
      open={openSuccessSnackbar}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      className="main-application-snackbar"
      sx={{ backgroundColor: "success.main", zIndex: 21000 }}
    >
      <Alert
        variant="filled"
        onClose={closeSnackBar}
        severity="success"
        sx={{ width: "100%", color: "white.fix" }}
      >
        {type === "success-follow" ? (
          <>
            <Typography variant="caption">{getUserName}</Typography>
            &nbsp;
            <Typography variant="caption">با موفقیت دنبال شد</Typography>
          </>
        ) : (
          <></>
        )}
        {type === "introduceToFriends" ? (
          <>
            {/* <Icon icon="file_copy" size={24} /> */}
            <Typography variant="caption">لینک با موفقیت کپی شد</Typography>
          </>
        ) : (
          <></>
        )}
        {type === "success-buying-from-store" ? (
          <Typography variant="caption">پرداخت با موفقیت انجام شد !</Typography>
        ) : (
          <></>
        )}
        {type === "success-report" ? (
          <>
            <Typography variant="caption">
              گزارش شما با موفقیت ثبت شد
            </Typography>
          </>
        ) : (
          <></>
        )}
        {type === "success-profile-pic" ? (
          <>
            <Typography variant="caption">
              عکس شما با موفقیت آپلود شد
            </Typography>
          </>
        ) : (
          <></>
        )}
        {type === "energy" ? (
          <>
            <Typography variant="caption">انرژی با موفقیت اضافه شد</Typography>
          </>
        ) : (
          <></>
        )}
      </Alert>
    </Snackbar>
  );
}

export default CommonSuccessSnackBar;
