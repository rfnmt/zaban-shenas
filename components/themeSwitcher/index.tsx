"use client";

import React, { memo } from "react";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../icon";
import { changeThemeMode } from "@/providers/Redux/general/generalSlice";
import { RootReduxState } from "@/providers/Redux/store";

function ThemeSwitcher() {
  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootReduxState) => state.general);
  function appTheme() {
    localStorage.setItem("mode", mode === "dark" ? "light" : "dark");
    dispatch(changeThemeMode(mode === "dark" ? "light" : "dark"));
  }

  return process.env.NODE_ENV === "development" ? (
    <IconButton
      onClick={() => appTheme()}
      sx={{
        position: "fixed",
        width: 56,
        height: 56,
        bottom: "65px",
        right: "5px",
        margin: "auto",
        zIndex: 999999999999999,
      }}
    >
      <Icon icon="appearance" size={40} />
    </IconButton>
  ) : (
    <></>
  );
}

export default memo(ThemeSwitcher);
