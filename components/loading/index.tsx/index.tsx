"use client";

import React from "react";
import { Backdrop, Typography } from "@mui/material";
import Lottie from "react-lottie-player";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

import "./style.scss";

function Loading() {
  const {
    visible,
    titleBeforeLottie,
    classes,
    lottieType,
    backgroundColor,
    title,
    subtitle,
    lottieHeight,
    lottieWidth,
  } = useSelector((state: RootReduxState) => state.loading.config);

  const lottieData = lottieType
    ? require("@/public/lottie-files/" + lottieType)
    : "";

  return (
    <Backdrop
      open={true}
      className={`wrap-loading ${classes}`}
      sx={{ backgroundColor: backgroundColor || "background.main" }}
    >
      {titleBeforeLottie && (
        <Typography sx={{ color: "gray.2" }} className="title-before-lottie">
          {titleBeforeLottie}
        </Typography>
      )}

      {lottieData && (
        <Lottie
          loop={true}
          animationData={lottieData}
          play
          style={{ width: lottieWidth, height: lottieHeight }}
        />
      )}

      {title && (
        <Typography sx={{ color: "gray.1" }} className="title">
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography sx={{ color: "gray.2" }} className="subtitle">
          {subtitle}
        </Typography>
      )}
    </Backdrop>
  );
}

export default Loading;
