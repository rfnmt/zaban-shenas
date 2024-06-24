"use client";

import React from "react";
import { Backdrop } from "@mui/material";
import Lottie from "react-lottie-player";
import * as loading from "@/public/lottie-files/loading.json";
import "./style.scss";

type Props = {
  open_lottie?: boolean;
  lottie_className?: string;
  customLoading?: boolean;
  width?: number;
  height?: number;
};

function LottieLoading({
  open_lottie = true,
  lottie_className,
  customLoading,
  width = 218,
  height = 218,
}: Props) {
  return (
    <Backdrop
      sx={{
        zIndex: 200000,
        height: "100%",
        width: "100%",
        backgroundColor: customLoading === true ? "" : "background.main",
      }}
      open={open_lottie}
      className={lottie_className || ""}
    >
      <Lottie
        loop={true}
        animationData={loading}
        play
        style={{ width: width, height: height, position: "relative" }}
      />
    </Backdrop>
  );
}

export default LottieLoading;
