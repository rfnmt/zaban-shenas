import { Box, Button, Dialog, IconButton, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Icon from "@/components/icon";

import "./styles.scss";

function WithCloseAndTipIcon() {
  const router = useRouter();
  const theme = useTheme() as any;

  const closeModal = () => {
    setvisbibleDialog(false);
  };

  function logoutUser() {
    router.push("/");
  }

  useEffect(() => {
    router.prefetch("/");
    return () => {};
  }, [router]);

  const [visbibleDialog, setvisbibleDialog] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => {
          process.env.NODE_ENV !== "development"
            ? setvisbibleDialog(true)
            : router.push("/");
        }}
        sx={{
          marginLeft: "auto",
          "& svg": {
            "& path": {
              fill: `${theme.palette.icon["2"]} !important`,
            },
          },
        }}
      >
        <Icon icon="close" size="48" />
      </IconButton>
      <Dialog
        onClose={closeModal}
        className="logout-question-modal"
        open={visbibleDialog}
      >
        <Box
          className="logout-question-modal-content-parent"
          sx={{
            backgroundColor: "white.flexible",
          }}
        >
          <Box
            sx={{
              color: `${theme.palette.gray["1"]} !important`,
            }}
            className="logout-title"
          >
            خروج از آزمون{" "}
          </Box>
          <Box
            sx={{
              color: `${theme.palette.gray["1"]} !important`,
            }}
            className="logout-question"
          >
            در صورت خروج امتیازی از این آزمون نمیگیری.
          </Box>
          <Box className="return-exit-botton">
            <Button
              onClick={logoutUser}
              className="exit"
              sx={{
                color: `${theme.palette.error.main} !important`,
              }}
            >
              خروج از آزمون
            </Button>
            <Button
              className="return"
              onClick={closeModal}
              sx={{
                color: `${theme.palette.system.blue} !important`,
              }}
            >
              بازگشت
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default WithCloseAndTipIcon;
