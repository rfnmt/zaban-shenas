import React from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  Typography,
  useTheme,
} from "@mui/material";
import { convertToPersianNumber } from "../../../../../modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { INotification } from "@/app/setting/notifications.interfaces";

function DailyGoalComponent({ data }: { data: any }) {
  const theme = useTheme() as any;
  const preStoredData = queryClient.getQueryData<INotification>([
    "setting-daily-goal",
  ]);
  const dailyGoalXp: string | undefined =
    preStoredData?.settings?.data?.daily_goal_xp;
  return (
    <FormControlLabel
      key={data.slug}
      value={data.slug}
      control={<Radio />}
      className="label-item"
      sx={{
        borderColor:
          dailyGoalXp === data.slug
            ? `${theme.palette.system.blue} !important`
            : `${theme.palette.border.main} !important`,
        borderTopColor: data.border
          ? `${theme.palette.system.blue} !important`
          : "",

        borderLeft:
          dailyGoalXp === data.slug
            ? `1px solid ${theme.palette.system.blue}!important`
            : `1px solid transparent !important`,
        borderRight:
          dailyGoalXp === data.slug
            ? `1px solid ${theme.palette.system.blue}!important`
            : `1px solid transparent !important`,

        // borderTop:
        //   dailyGoalXp === data.slug
        //     ? `1px solid ${theme.palette.system.blue}!important`
        //     : `unset`,

        "&:first-child": {
          borderTop:
            dailyGoalXp === data.slug
              ? `1px solid ${theme.palette.system.blue}!important`
              : `1px solid transparent !important`,
        },
      }}
      label={
        <div className="daily-study-times">
          <Typography
            className="left-description"
            sx={{
              color:
                dailyGoalXp === data.slug
                  ? `${theme.palette.system.blue} !important`
                  : `${theme.palette.gray["2"]} !important`,
            }}
          >
            {data.title}
          </Typography>
          <Box
            className="right-description"
            sx={{
              color:
                dailyGoalXp === data.slug
                  ? `${theme.palette.system.blue} !important`
                  : `${theme.palette.gray["1"]} !important`,
            }}
          >
            {convertToPersianNumber(data.daily_goal_xp)}
            <span>&nbsp; امتیاز در روز</span>
          </Box>
        </div>
      }
    />
  );
}

export default DailyGoalComponent;
