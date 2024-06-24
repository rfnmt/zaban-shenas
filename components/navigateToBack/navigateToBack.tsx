import React from "react";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import { textIsFarsi } from "@/modules/helper";

import LeftWithCloseAndTipIcon from "./leftSide/withCloseAndTipIcon";
import LeftWithCloseButton from "./leftSide/withCloseButton";
import LeftTheNumberOfGems from "./leftSide/theNumberOfGems";
import LeftWithOptionsAndClose from "./leftSide/withOptionsAndClose";
import LeftWithBackAndSave from "./leftSide/withBackAndSave";
import LeftWithBackButton from "./leftSide/withBackButton";
import LeftWithBackAndMoreIcon from "./leftSide/withBackAndMoreIcon";

import RightWithCloseAndTipIcon from "./rightSide/withCloseAndTipIcon";
import RightWithCloseButton from "./rightSide/withCloseButton";
import RightTheNumberOfGems from "./rightSide/theNumberOfGems";
import RightWithOptionsAndClose from "./rightSide/withOptionsAndClose";
import RightWithBackAndSave from "./rightSide/withBackAndSave";
import RightWithBackButton from "./rightSide/withBackButton";
import RightWithBackAndMoreIcon from "./rightSide/withBackAndMoreIcon";

const leftSide = {
  withCloseAndTipIcon: () => <LeftWithCloseAndTipIcon />,
  withBackAndMoreIcon: () => <LeftWithBackAndMoreIcon />,
  withCloseButton: () => <LeftWithCloseButton />,
  theNumberOfGems: () => <LeftTheNumberOfGems />,
  withOptionsAndClose: () => <LeftWithOptionsAndClose />,
  withBackAndSave: () => <LeftWithBackAndSave />,
  withBackButton: () => <LeftWithBackButton />,
  default: () => <div></div>,
};

const rightSide = {
  withCloseAndTipIcon: () => <RightWithCloseAndTipIcon />,
  withCloseButton: () => <RightWithCloseButton />,
  theNumberOfGems: () => <RightTheNumberOfGems />,
  withOptionsAndClose: () => <RightWithOptionsAndClose />,
  withBackAndSave: () => <RightWithBackAndSave />,
  withBackButton: () => <RightWithBackButton />,
  withBackAndMoreIcon: () => <RightWithBackAndMoreIcon />,
  default: () => <div></div>,
};

type Props = {
  title?: string;
  type?: string;
};

import "./navigateToBack.scss";

function NavigateToBack({ title = "", type = "default" }: Props) {
  const theme = useTheme() as any;

  const LeftSideAction = leftSide[type];
  const RightSideAction = rightSide[type];

  return (
    <>
      <AppBar
        component="nav"
        className="navigate-to-back"
        sx={{
          boxShadow: "unset",
          color: `${theme.palette.gray["1"]} !important`,
          backgroundColor: "white.flexible",
          borderBottom: `1px solid ${theme.palette.border.main} !important`,
        }}
      >
        <Toolbar className="navigator-content container">
          <LeftSideAction />
          <Typography
            sx={{ color: theme.palette.gray["1"] }}
            className={`page-title ${textIsFarsi(title) ? "fa" : "en"}`}
          >
            {title}
          </Typography>
          <RightSideAction />
        </Toolbar>
      </AppBar>
      <Toolbar className="before-progress-space" sx={{ height: "65px" }} />
    </>
  );
}

export default NavigateToBack;
