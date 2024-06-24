import React from "react";
import { Table } from "@mui/material";

import TableHeader from "../tableHeader";
import TableMainBody from "../tableMainBody";

function ProccessTable({ data }) {
  let allObj = data?.cells.reduce(
    (accumulator, currentValue) => [...accumulator, currentValue],
    []
  );

  let tableHead;
  let tableBody;
  if (data?.hasShadedHeader) {
    const tHead = allObj.splice(0, 1);
    tableHead = tHead;
    tableBody = allObj;
  } else {
    tableBody = allObj;
  }

  return (
    <Table style={{ direction: "ltr" }}>
      {data?.hasShadedHeader && (
        <TableHeader tableHead={tableHead} background={data?.background} />
      )}

      <TableMainBody
        tableBody={tableBody}
        background={data?.background}
        hasShadedHeader={data?.hasShadedHeader}
      />
    </Table>
  );
}

export default ProccessTable;
