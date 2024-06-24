import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Icon from "@/components/icon";
import "./style.scss";

type ProfileChainScoreData = {
  current_streak: string | number | null | undefined;
  total_xp: string | number | null | undefined;
};

function ProfileChainScoreInfo({
  current_streak,
  total_xp,
}: ProfileChainScoreData) {
  const theme = useTheme() as any;
  return (
    <Box className="profile-chain-score-wrapper">
      <Box
        className="score-wrapper"
        sx={{
          background: total_xp
            ? ""
            : `${theme.palette.disable.main} !important`,
        }}
      >
        {total_xp ? (
          <Image src="/svg/XpIcon.svg" width={27} height={27} alt="" />
        ) : (
          <Image src="/svg/grayStar.svg" width={24} height={24} alt="" />
        )}

        <Box>
          <Typography
            sx={{
              color: total_xp
                ? theme.palette.white.fix
                : theme.palette.gray["3"],
            }}
          >
            {new Intl.NumberFormat("en-US").format(total_xp)} امتیاز
          </Typography>
          <Typography
            sx={{
              color: total_xp
                ? theme.palette.white.fix
                : theme.palette.gray["3"],
            }}
          >
            کسب شده
          </Typography>
        </Box>
      </Box>
      <Box
        className="chain-wrapper"
        sx={{
          background: current_streak
            ? ""
            : `${theme.palette.disable.main} !important`,
        }}
      >
        {current_streak ? (
          <Image src="/svg/streak-icon.svg" width={24} height={24} alt="" />
        ) : (
          <Icon icon="disabled-fire" size={24} />
        )}

        <Box>
          <Typography
            sx={{
              color: current_streak
                ? theme.palette.white.fix
                : theme.palette.gray["3"],
            }}
          >
            {current_streak} روز
          </Typography>
          <Typography
            sx={{
              color: current_streak
                ? theme.palette.white.fix
                : theme.palette.gray["3"],
            }}
          >
            زنجیره مداوم
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileChainScoreInfo;
