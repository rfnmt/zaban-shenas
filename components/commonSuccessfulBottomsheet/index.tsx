import React from "react";
import Sheet from "react-modal-sheet";
import Image from "next/image";
import Lottie from "react-lottie-player";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as successMessage from "@/public/lottie-files/successMessage.json";
import Z3DButton from "../Z3DButton";
import { set_common_successful_bottomsheet } from "@/providers/Redux/general/generalSlice";
import CommonBottomSheetHeader from "../commonBottomSheetHeader";

import "./style.scss";

function CommonSuccessfulBottomsheet() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const {
    common_successful_bottomsheet,
    sendProductDataToSuccessBottomSheet,
    activationProductCheckoutData,
    mode,
  } = useSelector((state: any) => state.general);

  const { images, title, theming } = sendProductDataToSuccessBottomSheet;

  const closeAndGoHome = () => {
    dispatch(set_common_successful_bottomsheet(false));
  };

  return (
    <Sheet
      isOpen={common_successful_bottomsheet}
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
                  path={sendProductDataToSuccessBottomSheet?.images?.animation}
                  // animationData={successMessage}
                  play
                  style={{ width: 144, height: 144 }}
                />
              </Box>

              <Typography
                sx={{ color: "success.main" }}
                className="success-title"
              >
                خرید شما با موفقیت انجام شد
              </Typography>
            </Box>
            <Box
              className="success-info"
              sx={{
                background: `linear-gradient(270deg,${
                  mode === "light"
                    ? theming?.background_gradiant_secondary_light
                    : theming?.background_gradiant_secondary_dark
                }, ${
                  mode === "light"
                    ? theming?.background_gradiant_primary_light
                    : theming?.background_gradiant_primary_dark
                })`,
              }}
            >
              <Box className="subscription-icon">
                <Image fill src={images?.thumbnail} alt="pic" />
              </Box>
              <Box
                className="subscription-title-and-subtitle-wrapper"
                sx={{
                  "& div": {
                    color: theme.palette.white.fix,
                  },
                }}
              >
                <div>{title}</div>
                <div>{activationProductCheckoutData}</div>
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

export default CommonSuccessfulBottomsheet;
