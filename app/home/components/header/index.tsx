"use clinet";

import { AppBar, Toolbar, useTheme } from "@mui/material";
import React from "react";

import SelectGrade from "./components/selectGrade";
import UserBoard from "./components/userBoard";

import "./style.scss";

function Header() {
  const theme = useTheme() as any;

  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        className="home-header"
        sx={{
          borderBottom: `1px solid ${theme.palette.border.main}`,
          background: theme.palette.white.flexible,
          boxShadow: "unset",
        }}
      >
        <div className="container">
          <SelectGrade />
          <UserBoard />
        </div>
      </AppBar>
      <Toolbar
        sx={{ height: "64px !important", minHeight: "unset !important" }}
      />
    </>
  );
}

export default Header;
