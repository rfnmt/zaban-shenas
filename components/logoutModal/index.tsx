import React from "react";
import { Box, Button, Dialog, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { signOut } from "@/providers/Redux/user/userSlice";
import { clearCache } from "@/modules/helper";

import "./style.scss";

function LogoutModal() {
  const router = useRouter();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeModal = () => {
    router.push(pathname);
  };

  function logoutUser() {
    clearCache();
    dispatch(signOut());
    router.replace("/signup");
  }

  return (
    <Dialog
      onClose={closeModal}
      className="logout-modal"
      open={searchParams.get("logout-modal") === "true"}
    >
      <Box
        className="logout-modal-content-parent"
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
          خروج از حساب کاربری
        </Box>
        <Box
          sx={{
            color: `${theme.palette.gray["1"]} !important`,
          }}
          className="logout-question"
        >
          آیا از این اقدام اطمینان دارید؟
        </Box>
        <Box className="return-exit-botton">
          <Button
            onClick={logoutUser}
            className="exit"
            sx={{
              color: `${theme.palette.error.main} !important`,
            }}
          >
            بله, خروج
          </Button>
          <Button
            className="return"
            onClick={closeModal}
            sx={{
              color: `${theme.palette.system.blue} !important`,
            }}
          >
            خیر, بازگشت
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default LogoutModal;
