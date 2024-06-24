import { Typography, useTheme } from "@mui/material";
import React, { Key } from "react";

import PurchaseableItem from "./purchaseableItem";

function Purchaseables(data: any) {
  const theme = useTheme() as any;

  return (
    <div>
      {data?.data?.title ? (
        <Typography
          className="store-products-head-title"
          sx={{ color: `${theme.palette.gray[1]}` }}
        >
          {data?.data?.title}
        </Typography>
      ) : (
        ""
      )}

      {data?.data?.purchasables?.map((item: any, key: Key) => (
        <PurchaseableItem purchaseId={item} key={key} />
      ))}
    </div>
  );
}

export default Purchaseables;
