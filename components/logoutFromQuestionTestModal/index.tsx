import React from "react";
import { Box, Button, Dialog, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import "./style.scss";

function LogoutFromQuestionTestModal() {
  const router = useRouter();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeModal = () => {
    router.push(pathname);
  };

  function logoutUser() {
    router.replace("/");
  }

  return (
    <Dialog
      onClose={closeModal}
      className="logout-question-modal"
      open={searchParams.get("logout-question-modal") === "true"}
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
  );
}

export default LogoutFromQuestionTestModal;
