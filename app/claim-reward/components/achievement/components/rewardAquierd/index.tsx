import { useDispatch } from "react-redux";
import React from "react";
import Z3DButton from "@/components/Z3DButton";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Lottie from "react-lottie-player";
import { useRouter } from "next/navigation";
import * as successMessage from "@/public/lottie-files/successMessage.json";
import { updateActivityType } from "@/providers/Redux/claimRewards/claimRewardsSlice";

function RewardAquierd() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme() as any;
  return (
    <>
      <Box className="get-rewards">
        <Box className="gemImage-totalGem" sx={{ marginBottom: "auto" }}>
          <Image src="/svg/diamond.svg" width={22.73} height={20.21} alt="" />
          <Typography
            className="aquired-gems"
            sx={{
              color: theme.palette.system.blue,
            }}
          >
            0
          </Typography>
        </Box>
        <Box className="success-message">
          <Lottie
            loop={false}
            animationData={successMessage}
            play
            style={{ width: 192, height: 192 }}
          />
          <Typography sx={{ color: "success.main", marginTop: "24px" }}>
            ! این جایزه رو قبلا گرفتی
          </Typography>
          <Typography
            sx={{ color: theme.palette.gray["3"], marginTop: "16px" }}
          >
            جای نگرانی نیست, همه چی مرتبه
          </Typography>
        </Box>
      </Box>
      <Z3DButton
        onClick={() => {
          dispatch(updateActivityType("daily-quest"));
          router.push(localStorage.getItem("back-from-claim-reward"));
        }}
      >
        ادامه
      </Z3DButton>
    </>
  );
}

export default RewardAquierd;
