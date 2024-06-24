import React from "react";
import { Button, useTheme } from "@mui/material";

import { doIHaveThisProduct } from "@/modules/helper";
import { renderButtonTitle } from "../helpers";

type Props = {
  purchaseID: number;
  callback: () => void;
  studyPercent: number | undefined;
};

function PreviewBeforePurchase({ purchaseID, callback, studyPercent }: Props) {
  const theme = useTheme() as any;

  if (!doIHaveThisProduct(purchaseID))
    return (
      <Button
        variant="contained"
        onClick={callback}
        className="preview-before-purchase"
        sx={{
          boxShadow: "0 1px 1px rgba(0,0,0,.16)",
          color: theme.palette.white.fix,
          background: theme.palette.secondary.main,
          "&:hover": {
            background: theme.palette.secondary.main,
          },
        }}
      >
        شروع
      </Button>
    );
  else
    return (
      <Button
        variant="contained"
        onClick={callback}
        className="preview-before-purchase"
        sx={{
          boxShadow: "0 1px 1px rgba(0,0,0,.16)",
          color: theme.palette.white.fix,
          background: theme.palette.secondary.main,
          "&:hover": {
            background: theme.palette.secondary.main,
          },
        }}
      >
        {renderButtonTitle(studyPercent)}
      </Button>
    );
}

export default PreviewBeforePurchase;
