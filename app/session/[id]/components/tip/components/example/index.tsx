import React from "react";
import { useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import AudioPlayer from "../audioPlayer";
import { RootReduxState } from "@/providers/Redux/store";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import "./style.scss";

function Index({ data }) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);

  let exampleParentBgColor = "";
  let exampleChildBgColor = "";
  let exampleChildBorderColor = "";

  let _mode = "";
  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  if (data?.background?.color === "red") {
    exampleChildBorderColor = theme.palette.accent2.main;

    if (_mode === "light") {
      exampleParentBgColor = theme.palette.tip_red.background;
      exampleChildBgColor = theme.palette.white.transparent;
    } else {
      exampleParentBgColor = theme.palette.table_red.background;
      exampleChildBgColor = theme.palette.blackTransparent["1"];
    }
  } else if (data?.background?.color === "green") {
    exampleChildBorderColor = theme.palette.secondary.main;

    if (_mode === "light") {
      exampleParentBgColor = theme.palette.tip_green.background;
      exampleChildBgColor = theme.palette.white.transparent;
    } else {
      exampleParentBgColor = `#053B1C`;
      exampleChildBgColor = theme.palette.blackTransparent["1"];
    }
  } else if (data?.background?.color === "blue") {
    exampleChildBorderColor = theme.palette.primary.light;
    exampleParentBgColor = theme.palette.primary.min;

    if (_mode === "light") {
      exampleChildBgColor = `${theme.palette.white.transparent} !important`;
    } else {
      exampleChildBgColor = theme.palette.blackTransparent["1"];
    }
  } else {
    exampleParentBgColor = theme.palette.background.main;
    exampleChildBorderColor = theme.palette.border.main;
    if (_mode === "light") {
      exampleChildBgColor = `${theme.palette.white.transparent} !important`;
    } else {
      exampleChildBgColor = theme.palette.blackTransparent["1"];
    }
  }

  return (
    <div
      className="wrapper-tip-example"
      style={{
        background: exampleParentBgColor,
        padding: data.image ? "16px" : "0",
      }}
    >
      <Box
        sx={{
          border: data.image ? `1px solid ${exampleChildBorderColor}` : "",
          background: data.image ? exampleChildBgColor : "",
        }}
        className={`content ${
          data.image ? "content-with-image" : "content-without-image"
        }`}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <AudioPlayer data={data} jsonBgColor={data?.background?.color} />
          <SimpleProcessingText data={data?.text} />
        </div>

        {/* <div className="wrapper-sentences"> */}
        {/* </div> */}

        {data.image ? (
          <div className="image">
            <Image src={data.image} width={96} height={96} alt="" />
          </div>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
}

export default Index;
