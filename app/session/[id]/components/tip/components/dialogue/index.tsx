import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import AudioPlayer from "../audioPlayer";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import { RootReduxState } from "@/providers/Redux/store";

import "./style.scss";

function Dialogue({ data }) {
  //
  const { mode } = useSelector((state: RootReduxState) => state.general);
  const theme = useTheme() as any;
  const { dialogue_line } = data;

  let dialogParentBgColor = "";
  let dialogChildBgColor = "";
  let beforeAfterColors = "";

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
      dialogParentBgColor = theme.palette.tip_red.background;
      dialogChildBgColor = theme.palette.white.transparent;
      beforeAfterColors = "#fff2f3";
    } else {
      dialogParentBgColor = theme.palette.table_red.background;
      dialogChildBgColor = theme.palette.blackTransparent["1"];
      beforeAfterColors = "#600c00";
    }
  } else if (data?.background?.color === "green") {
    exampleChildBorderColor = theme.palette.secondary.main;

    if (_mode === "light") {
      dialogParentBgColor = theme.palette.tip_green.background;
      dialogChildBgColor = theme.palette.white.transparent;
      beforeAfterColors = "#f0fff6";
    } else {
      dialogParentBgColor = "#053B1C";
      dialogChildBgColor = theme.palette.blackTransparent["1"];
      beforeAfterColors = "#032813";
    }
  } else if (data?.background?.color === "blue") {
    exampleChildBorderColor = theme.palette.primary.light;
    dialogParentBgColor = theme.palette.primary.min;

    if (_mode === "light") {
      dialogChildBgColor = `${theme.palette.white.transparent} !important`;
      beforeAfterColors = "#f1f8ff";
    } else {
      dialogChildBgColor = `${theme.palette.blackTransparent["1"]} !important`;
      beforeAfterColors = "#191d21";
    }
  } else {
    dialogParentBgColor = theme.palette.background.main;
    dialogChildBgColor = theme.palette.background.main;
    exampleChildBorderColor = theme.palette.border.main;
    beforeAfterColors = theme.palette.background.main;
  }

  const allDialogs = [];

  for (let i = 0; i < dialogue_line.length; i++) {
    allDialogs.push(
      <Box
        key={i}
        className="dialogue-wrapper"
        sx={{
          borderColor: `${exampleChildBorderColor} !important`,
          backgroundColor: dialogChildBgColor,
          margin: dialogue_line[i]?.character?.thumbnail
            ? i % 2 === 0
              ? "0 auto 0 65px !important"
              : "0 65px 0 auto !important"
            : i % 2 === 0
            ? "0 auto 0 16px !important"
            : "0 16px 0 auto !important",
          "&:not(:first-of-type)": {
            marginTop: "16px !important",
          },
        }}
      >
        {dialogue_line[i]?.character?.thumbnail ? (
          <Image
            src={dialogue_line[i]?.character?.thumbnail}
            alt={dialogue_line[i]?.character?.name}
            width={40}
            height={40}
            className={i % 2 === 0 ? "dialogue-right-img" : "dialogue-left-img"}
          />
        ) : (
          <></>
        )}

        <Box className="audio-text-wrapper">
          {dialogue_line[i]?.audio ? (
            <AudioPlayer
              data={{ audio: dialogue_line[i].audio }}
              jsonBgColor={data?.background?.color}
            />
          ) : (
            <></>
          )}
          <Box>
            <SimpleProcessingText data={dialogue_line[i].text} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className="main-dialogue-wrapper"
      sx={{
        "& :before": {
          backgroundColor: beforeAfterColors,
          borderColor: `${exampleChildBorderColor} !important`,
        },
        "& :after": {
          backgroundColor: beforeAfterColors,
          borderColor: `${exampleChildBorderColor} !important`,
        },
        backgroundColor: dialogParentBgColor,
      }}
    >
      {allDialogs}
    </Box>
  );
}

export default Dialogue;
