import React, { ChangeEvent } from "react";
import { Box, TextareaAutosize, Typography, useTheme } from "@mui/material";
import "./reportTextArea.scss";
type Data = {
  comment: string;
  fillMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function ReportTextArea({ fillMessage, comment }: Data) {
  const theme = useTheme() as any;
  return (
    <Box
      className="report-text-area-parent"
      sx={{
        "& .text-area": {
          backgroundColor: "white.flexible",
          borderColor: `${theme.palette.border.main} !important`,
          color: `${theme.palette.gray["1"]} !important`,
        },
      }}
    >
      <Typography
        className="description"
        sx={{
          color: `${theme.palette.gray["1"]} !important`,
        }}
      >
        اگر توضیحات بیشتری دارید اینجا بنویسید
      </Typography>
      <TextareaAutosize
        className="text-area"
        placeholder="... توضیحات بیشتر"
        onChange={fillMessage}
        defaultValue={comment}
        minRows={4}
        maxRows={5}
      />
    </Box>
  );
}

export default ReportTextArea;
