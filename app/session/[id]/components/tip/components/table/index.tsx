import React from "react";
import { useSelector } from "react-redux";
import { TableContainer, Paper, useTheme } from "@mui/material";

import ProccessTable from "./proccessTable";
import { RootReduxState } from "@/providers/Redux/store";

import "./style.scss";

function TipsTable(data: Contentbody) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);

  let _mode = "";
  let tableContainerBgColor = "";

  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  if (data?.data?.background?.color === "red") {
    if (light === "light") {
      tableContainerBgColor = theme.palette.tip_red.background;
    } else {
      tableContainerBgColor = theme.palette.background.main;
    }
  } else if (data?.data?.background?.color === "green") {
    if (_mode === "light") {
      tableContainerBgColor = theme.palette.tip_green.background;
    } else {
      tableContainerBgColor = `#053B1C !important`;
    }
  } else if (data?.data?.background?.color === "blue") {
    tableContainerBgColor = theme.palette.primary.min;
  } else {
    tableContainerBgColor = theme.palette.background.main;
  }

  return (
    <TableContainer
      component={Paper}
      className="tip-table-wrapper"
      sx={{ backgroundColor: tableContainerBgColor }}
    >
      <ProccessTable data={data?.data} />
    </TableContainer>
  );
}

export default TipsTable;
