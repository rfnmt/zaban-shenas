import React from "react";
import { TableCell, TableHead, TableRow, useTheme } from "@mui/material";

type TableHeaderData = {
  tableHeader: any;
};

function PopoverTableHeader({ tableHeader }: TableHeaderData) {
  const theme = useTheme() as any;
  return (
    <TableHead>
      <TableRow
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tableHeader?.length}, 1fr)`,
        }}
        sx={{
          "& .MuiTableCell-root": {
            // borderBottom: "unset !important",
            padding: "8px",
            borderBottom: `1px solid ${theme.palette.border.main}`,
          },
        }}
      >
        {tableHeader?.map((item: any, index: number) => (
          <TableCell
            sx={{
              borderRightColor: `${theme.palette.border.main} !important`,
              color: "gray.1",
            }}
            className="table-popover-header-cells"
            key={index}
            align="center"
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default PopoverTableHeader;
