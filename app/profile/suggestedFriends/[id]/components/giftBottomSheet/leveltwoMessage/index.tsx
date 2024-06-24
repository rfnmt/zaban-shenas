import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";

type LeveltwoMessageData = {
  giftMessage: string;
  title: string;
};

function LeveltwoMessage({ giftMessage, title }: LeveltwoMessageData) {
  const theme = useTheme() as any;
  function message(type: string) {
    switch (type) {
      case "booster":
      case "placebo2":
      case "streak_freeze":
      case "one-time-test":
      case "placebo1":
        return ` ${title} `;
      case "gold":
        return (
          <Typography className="caption">
            درصورتی که دوستت اشتراک فعالی داشته باشه, این هدیت به مجموع زمانش
            اضافه میشه
          </Typography>
        );
    }
  }
  return (
    <Box
      className="level-two-message-captions"
      sx={{ color: theme.palette.primary.main }}
    >
      {giftMessage === "gold" ? (
        message(giftMessage)
      ) : (
        <Typography className="caption">
          درصورتی که دوستت حداکثر تعداد قابل نگه‌داری {message(giftMessage)}
          رو داشته باشه, چیزی بهش اضافه نمیشه
        </Typography>
      )}
    </Box>
  );
}

export default LeveltwoMessage;
