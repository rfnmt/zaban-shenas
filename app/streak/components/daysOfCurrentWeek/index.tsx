import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";

import Icon from "@/components/icon";
import {
  WeeklyStreak,
  processUserCurrentWeekStreaks,
} from "../../helpers/userCurrentWeekStreak";

import "./style.scss";

function DaysOfCurrentWeek() {
  const theme = useTheme() as any;

  const [daysOfWeek, setDaysOfWeek] = useState<WeeklyStreak[]>();

  useEffect(() => {
    processUserCurrentWeekStreaks().then(function (days) {
      setDaysOfWeek(days);
    });
  }, []);

  return (
    <Box
      className="streak-weekdays"
      sx={{
        boxShadow: "0 1px 1px #00000029",
        backgroundColor: theme.palette.white.flexible,
      }}
    >
      {daysOfWeek &&
        daysOfWeek?.map((item, index) => {
          return (
            <Box key={index} className="user-study-chain">
              {item.passed ? (
                <Icon icon="streakTik" size={24} />
              ) : (
                <Box
                  sx={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.accent3.main,
                  }}
                />
              )}
              <Box
                className="day-names"
                sx={{ color: theme.palette.gray["1"] }}
              >
                {item.dayName}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}

export default DaysOfCurrentWeek;
