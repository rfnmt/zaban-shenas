import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, IconButton, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import { useRouter } from "next/navigation";

function WithCloseButton() {
  const theme = useTheme() as any;
  const router = useRouter();
  const [visibleDialog, setvisibleDialog] = useState(false);

  const closeModal = () => {
    setvisibleDialog(false);
  };
  function logoutUser() {
    router.push("/");
  }

  useEffect(() => {
    router.prefetch("/");
    return () => {};
  }, [router]);

  return (
    <>
      <IconButton
        onClick={() => {
          // process.env.NODE_ENV !== "development"
          //   ? setvisibleDialog(true)
          //   : router.push("/");
          setvisibleDialog(true);
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
        open={visibleDialog}
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
            خروج از داستان{" "}
          </Box>
          <Box
            sx={{
              color: `${theme.palette.gray["1"]} !important`,
            }}
            className="logout-question"
          >
            در صورت خروج امتیازی از این داستان نمیگیری.
          </Box>
          <Box className="return-exit-botton">
            <Button
              onClick={logoutUser}
              className="exit"
              sx={{
                color: `${theme.palette.error.main} !important`,
              }}
            >
              خروج از داستان
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

export default WithCloseButton;
