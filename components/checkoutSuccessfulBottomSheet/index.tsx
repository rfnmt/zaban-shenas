import React from "react";
import Sheet from "react-modal-sheet";
import { Box, Typography, useTheme } from "@mui/material";
import Lottie from "react-lottie-player";
import Image from "next/image";

import Z3DButton from "../Z3DButton";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutSuccessfulBottomSheet } from "@/providers/Redux/general/generalSlice";
import CommonBottomSheetHeader from "../commonBottomSheetHeader";
import * as successMessage from "@/public/lottie-files/successMessage.json";

function CheckoutSuccessfulBottomSheet() {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const { checkoutSuccessfulBottomSheet, checkoutSuccessfulBottomSheetData } =
    useSelector((state: any) => state.general);
  const closeAndGoHome = () => {
    dispatch(setCheckoutSuccessfulBottomSheet(false));
  };

  const { title, pic, purchaseTag } = checkoutSuccessfulBottomSheetData;

  return (
    <Sheet
      isOpen={checkoutSuccessfulBottomSheet}
      onClose={closeAndGoHome}
      className="common-successful-bottom-sheet"
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header>
          <CommonBottomSheetHeader title="صورتحساب" />
        </Sheet.Header>
        <Sheet.Content>
          <Box
            className="successful-bottomSheet-body"
            sx={{ backgroundColor: "white.flexible" }}
          >
            <Box className="success-message">
              <Box className="success-icon">
                <Lottie
                  loop={false}
                  animationData={successMessage}
                  play
                  style={{ width: 104, height: 104 }}
                />
              </Box>

              <Typography
                sx={{ color: "success.main" }}
                className="success-title"
              >
                خرید شما با موفقیت انجام شد
              </Typography>
            </Box>
            <Box className="success-info">
              <Box className="subscription-icon">
                <Image fill src={pic} alt="" />
              </Box>
              <Box className="subscription-title-and-subtitle-wrapper">
                <Typography sx={{ color: theme.palette.white.fix }}>
                  {title}
                </Typography>
                <Typography sx={{ color: theme.palette.white.fix }}>
                  {purchaseTag}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: "white.flexible",
            }}
            className="payment-button"
          >
            <Z3DButton onClick={closeAndGoHome}>ادامه </Z3DButton>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={closeAndGoHome} />
    </Sheet>
  );
}

export default CheckoutSuccessfulBottomSheet;
