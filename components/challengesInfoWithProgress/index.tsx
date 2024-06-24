import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  circularProgressClasses,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { DailyChallengeTypes } from "@/models/dailyChallenge.interface";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

import "./style.scss";

function ChallengesInfoWithProgress() {
  const theme = useTheme() as any;

  const existChallengesDataInLocalStorage = JSON?.parse(
    localStorage.getItem("challenges") || ""
  );

  const cachedDailyChallengeData =
    queryClient.getQueryData<DailyChallengeTypes>(["user-challenge"]);

  const [dailyChallengeData, setDailyChallengeData] = useState(
    existChallengesDataInLocalStorage?.daily_quests
  );

  useEffect(() => {
    setTimeout(() => {
      setDailyChallengeData(cachedDailyChallengeData?.daily_quests);

      localStorage.setItem(
        "challenges",
        JSON.stringify(cachedDailyChallengeData)
      );
    }, 2000);

    return () => {};
  }, []);

  return (
    <Box
      className="challenges-info-with-progress"
      bgcolor="white.flexible"
      sx={{ boxShadow: "0 1px 1px #00000029" }}
    >
      {dailyChallengeData?.map((item) => {
        return (
          <Box
            key={item?.id}
            className="challenge-item"
            sx={{
              borderBottomColor: `${theme.palette.border.main} !important`,
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                "& img": {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -57%)",
                },
              }}
            >
              {item?.data?.collected_points ===
              item?.data?.quest_item?.required_points ? (
                <Image
                  src="/svg/open_chest.svg"
                  width={28}
                  height={28}
                  alt=""
                />
              ) : (
                <Image
                  src="/svg/close_chest.svg"
                  width={28}
                  height={28}
                  alt=""
                />
              )}
              <CircularProgress
                variant="determinate"
                sx={{
                  color: theme.palette.border.main,
                }}
                size={48}
                thickness={4}
                value={100}
              />
              <CircularProgress
                variant="determinate"
                sx={{
                  color: "#FF9600",
                  position: "absolute",
                  left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: "round",
                  },
                }}
                size={48}
                thickness={4}
                value={
                  (item?.data?.collected_points * 100) /
                  item?.data?.quest_item?.required_points
                }
              />
            </Box>
            <Box className="challenge-item-title">
              <Typography
                sx={{
                  color: `${theme.palette.gray["1"]} !important`,
                }}
              >
                {item?.data?.quest_item?.title}
              </Typography>
              <Typography
                sx={{
                  color: `${theme.palette.gray["2"]} !important`,
                }}
              >{`${item?.data?.quest_item?.required_points} / ${item?.data?.collected_points}`}</Typography>
            </Box>
            <Image
              src={item?.data?.quest_item?.thumbnail}
              width={40}
              height={40}
              alt=""
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default ChallengesInfoWithProgress;
