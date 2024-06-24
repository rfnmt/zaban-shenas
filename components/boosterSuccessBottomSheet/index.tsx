import React from "react";
import Sheet from "react-modal-sheet";
import Lottie from "react-lottie-player";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import Z3DButton from "../Z3DButton";
import { setBoosterSuccessBottomSheet } from "@/providers/Redux/general/generalSlice";

import "./style.scss";

function BoosterSuccessBottomSheet() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { boosterSuccessBottomSheet, sendProductDataToSuccessBottomSheet } =
    useSelector((state: any) => state.general);
  function closeTransientSuccesBottomSheet() {
    dispatch(setBoosterSuccessBottomSheet(false));
  }

  return (
    <Sheet
      detent="content-height"
      isOpen={boosterSuccessBottomSheet}
      onClose={closeTransientSuccesBottomSheet}
      className="booster-success-bottom-sheet"
    >
      <Sheet.Container>
        <Sheet.Content>
          <Box
            bgcolor="background.main"
            className="booster-success-main-wrapper"
          >
            <Box className="booster-success-pic">
              {sendProductDataToSuccessBottomSheet?.images?.animation && (
                <Lottie
                  loop={true}
                  path={sendProductDataToSuccessBottomSheet?.images?.animation}
                  play
                  style={{ width: 144, height: 144 }}
                />
              )}
            </Box>
            <Typography
              className="booster-success-title"
              sx={{ color: theme.palette.gray["1"] }}
            >
              تقویت کننده فعال شد!
            </Typography>
            <Typography
              className="booster-success-subtitle"
              sx={{ color: theme.palette.gray["3"] }}
            >
              امتیازی که از خوندن هر درس بدست میاری دو برابر میشه فعال تا{" "}
              <Typography
                variant="caption"
                sx={{ color: theme.palette.success.main }}
              >
                {sendProductDataToSuccessBottomSheet?.pricing?.lifespan_minutes}
              </Typography>{" "}
              دقیقه دیگه
            </Typography>
            <Z3DButton
              className="activation"
              onClick={closeTransientSuccesBottomSheet}
            >
              ادامه
            </Z3DButton>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={closeTransientSuccesBottomSheet} />
    </Sheet>
  );
}

export default BoosterSuccessBottomSheet;
