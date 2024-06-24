import React from "react";
import Lottie from "react-lottie-player";
import * as streakFireAnimation from "@/public/lottie-files/streakFire.json";
import { Typography, useTheme } from "@mui/material";
import "./style.scss";

function SecondStreakMessage() {
  const theme = useTheme() as any;
  return (
    <>
      <Lottie
        loop={true}
        animationData={streakFireAnimation}
        play={true}
        className="whatIsStreak-flame"
      />
      <Typography
        className="-whatIsStreak-mainChain-caption"
        sx={{
          color: theme.palette.gray["1"],
          marginTop: "60px",
          textAlign: "center",
        }}
      >
        زنجیره‌اتو هر روز حفظ کن
      </Typography>
      <Typography
        className="whatIsStreak-subChain-caption"
        sx={{
          color: theme.palette.gray["3"],
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        اگه هر روز درس بخونی زودتر انگلیسی رو یاد می‌گیری{" "}
      </Typography>
    </>
  );
}

export default SecondStreakMessage;
