import React from "react";
import { Box, Button, Dialog, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { clearCache } from "@/modules/helper";
import { signOut } from "@/providers/Redux/user/userSlice";

type BackModalToSignupData = {
  visibleDialog: boolean;
  setvisibleDialog: (x: boolean) => void;
};

function BackModalToSignup({
  visibleDialog,
  setvisibleDialog,
}: BackModalToSignupData) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const router = useRouter();
  const closeModal = () => {
    setvisibleDialog(false);
  };

  async function logoutUser() {
    clearCache();
    dispatch(signOut());
    router.replace("/signup");
  }
  return (
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
          خروج از فرایند ثبت نام
        </Box>
        <Box
          sx={{
            color: `${theme.palette.gray["1"]} !important`,
          }}
          className="logout-question"
        >
          درصورت خروج، پاسخ‌های فعلی ذخیره نخواهند شد. از این اقدام اطمینان
          دارید؟
        </Box>
        <Box className="return-exit-botton">
          <Button
            onClick={logoutUser}
            className="exit"
            sx={{
              color: `${theme.palette.error.main} !important`,
            }}
          >
            خروج از ثبت نام
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

export default BackModalToSignup;
