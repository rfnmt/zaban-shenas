import React, { MouseEventHandler } from "react";
import { Box, Button, Checkbox, useTheme } from "@mui/material";

interface AllCommingData {
  handleOnClickFunction?: MouseEventHandler;
  rightTextContent: string;
  state1?: boolean;
}

function SettingChildsComponentNotificationTypes({
  handleOnClickFunction,
  rightTextContent,
  state1,
}: AllCommingData) {
  const theme = useTheme() as any;
  return (
    <Button
      className="same-size-boxes"
      onClick={handleOnClickFunction}
      sx={{
        "&::before": {
          backgroundColor: `${theme.palette.border.main} !important`,
        },
        borderColor: `${theme.palette.border.main} !important`,
      }}
    >
      <Box
        className="right-content"
        sx={{ color: `${theme.palette.gray["1"]} !important` }}
      >
        {rightTextContent}
      </Box>
      <Box
        className="left-content"
        sx={{ color: `${theme.palette.gray["2"]} !important` }}
      >
        <Checkbox
          checked={state1}
          inputProps={{ "aria-label": "controlled" }}
          className="custom-checkbox"
          sx={{
            color: state1
              ? `${theme.palette.system.blue} !important`
              : `${theme.palette.border.main} !important`,
          }}
        />
      </Box>
    </Button>
  );
}

export default SettingChildsComponentNotificationTypes;
