import React from "react";
import { useSelector } from "react-redux";
import { TableBody, TableCell, TableRow, useTheme } from "@mui/material";

import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import { RootReduxState } from "@/providers/Redux/store";

type Props = {
  tableBody: Array<any>;
  background: any;
  hasShadedHeader: boolean;
};

function TableMainBody({ tableBody, background, hasShadedHeader }: Props) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);

  let tableBodyBgColor = "";
  let tableBodyBorderColor = "";

  let _mode = "";
  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  if (background?.color === "red") {
    tableBodyBorderColor = theme.palette.accent2.main;
    if (_mode === "light") {
      tableBodyBgColor = `${theme.palette.white.transparent} !important`;
    } else {
      tableBodyBgColor = `${theme.palette.blackTransparent["1"]} !important`;
    }
  } else if (background?.color === "green") {
    tableBodyBorderColor = theme.palette.secondary.main;
    if (_mode === "light") {
      tableBodyBgColor = `${theme.palette.white.transparent} !important`;
    } else {
      tableBodyBgColor = `${theme.palette.blackTransparent["1"]} !important`;
    }
  } else if (background?.color === "blue") {
    tableBodyBorderColor = theme.palette.primary.light;
    if (_mode === "light") {
      tableBodyBgColor = `${theme.palette.white.transparent} !important`;
    } else {
      tableBodyBgColor = `${theme.palette.blackTransparent["1"]} !important`;
    }
  } else {
    tableBodyBorderColor = theme.palette.border.main;
    if (_mode === "light") {
      tableBodyBgColor = `${theme.palette.white.flexible} !important`;
    } else {
      tableBodyBgColor = `${theme.palette.blackTransparent["1"]} !important`;
    }
  }

  return (
    <TableBody
      style={{ direction: "ltr" }}
      className={`${
        !hasShadedHeader
          ? "handle-Tr-First-child-Td-Last-child handle-Tr-First-child-Td-First-child"
          : ""
      }`}
    >
      {tableBody.map((item, index) => {
        return (
          <TableRow
            key={index}
            sx={{
              backgroundColor: tableBodyBgColor,
              display: "grid",
              gridTemplateColumns: `repeat(${item.length},1fr)`,
            }}
          >
            {item.map((_item: any, _index: number) => {
              return (
                <TableCell
                  key={_index}
                  style={{
                    border: `1px solid ${tableBodyBorderColor}`,
                  }}
                >
                  <SimpleProcessingText data={_item} />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default TableMainBody;
