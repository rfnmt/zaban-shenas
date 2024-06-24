import React from "react";
import { TableBody, TableCell, TableRow, useTheme } from "@mui/material";

type TableBodyData = {
  tableRows: any;
};

function PopoverTableBody({ tableRows }: TableBodyData) {
  const theme = useTheme() as any;
  return (
    <TableBody>
      {tableRows?.map((item: any, index: number) => {
        return (
          <TableRow
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${item.length}, 1fr)`,
            }}
            key={index}
            sx={{
              "& .MuiTableCell-root": {
                borderBottom: "unset !important",
                padding: "8px",
              },
            }}
            className="table-popover-body-row"
          >
            {item.map((secItem: any, secIndex: number) => {
              return (
                <TableCell
                  className="table-popover-body-cells"
                  sx={{
                    color: "gray.1",
                    borderTop: `1px solid ${theme.palette.border.main}`,
                    borderRightColor: `${theme.palette.border.main} !important`,
                  }}
                  key={secIndex}
                  align="center"
                >
                  {secItem?.hint}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default PopoverTableBody;
