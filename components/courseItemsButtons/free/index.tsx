import { Button, useTheme } from "@mui/material";
import React from "react";

import { renderButtonTitle } from "../helpers";

type Props = {
  studyPercent: number | undefined;
  callback: () => void;
};

function Free({ studyPercent, callback }: Props) {
  const theme = useTheme() as any;

  return (
    <Button
      variant="contained"
      onClick={callback}
      className="free"
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

export default Free;
