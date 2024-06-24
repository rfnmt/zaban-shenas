import { TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import React from "react";

import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";

type Props = {
  tableHead: Array<any>;
  background: any;
};

function TableHeader({ tableHead, background }: Props) {
  const theme = useTheme() as any;

  let tableHeaderBgColor = "";
  let tableHeaderBorderColor = "";

  if (background?.color === "red") {
    tableHeaderBgColor = theme.palette.table_red.background;
    tableHeaderBorderColor = theme.palette.accent2.main;
  } else if (background?.color === "green") {
    tableHeaderBgColor = theme.palette.table_green.background;
    tableHeaderBorderColor = theme.palette.secondary.main;
  } else if (background?.color === "blue") {
    tableHeaderBgColor = theme.palette.select.notifications;
    tableHeaderBorderColor = theme.palette.primary.light;
  } else {
    tableHeaderBgColor = theme.palette.accent3.main;
    tableHeaderBorderColor = theme.palette.border.main;
  }

  return (
    <TableHead>
      {tableHead.map((item: any, index: number) => {
        return (
          <TableRow
            key={index}
            sx={{
              backgroundColor: tableHeaderBgColor,
              display: "grid",
              gridTemplateColumns: `repeat(${item.length},1fr)`,
            }}
          >
            {item.map((_item: any, _index: number) => {
              return (
                <TableCell
                  key={_index}
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.gray["1"],
                    border: `1px solid ${tableHeaderBorderColor}`,
                  }}
                >
                  <SimpleProcessingText data={_item} />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableHead>
  );
}

export default TableHeader;
