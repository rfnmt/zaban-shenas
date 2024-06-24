import React from "react";
import { Box } from "@mui/material";
import "./extraMessage.scss";

interface ExtraMessageData {
  textContent: string;
  showLongText?: boolean;
  longText?: string;
}

function ExtraMessage({
  textContent,
  showLongText,
  longText,
}: ExtraMessageData) {
  return (
    <>
      {showLongText && (
        <Box
          className="notif-reminder-long-text"
          sx={{ color: (theme) => `${theme.palette.gray["2"]} !important` }}
        >
          {longText}
        </Box>
      )}

      {textContent && (
        <Box
          className="extra-message-text"
          sx={{ color: (theme) => `${theme.palette.gray["2"]} !important` }}
        >
          <div>{textContent}</div>
        </Box>
      )}
    </>
  );
}

export default ExtraMessage;
