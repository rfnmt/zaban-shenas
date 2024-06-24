import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import React from "react";
import Z3DButton from "../Z3DButton";
import Image from "next/image";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import {
  achievementsCalculateProgressValue,
  achievementsMergingValueAndTierCount,
} from "@/modules/achievementsHelper";
import AchievementsDescription from "../achievementsDescription";
import {
  updateActivityType,
  updateClaimRewardID,
  updateClaimRewardSlug,
} from "@/providers/Redux/claimRewards/claimRewardsSlice";

type AchievementsButtonOrProgressBarData = {
  value: number;
  tierCounts: Array<number>;
  description: any;
  slug: string;
};
function AchievementsButtonOrProgressBar({
  value,
  tierCounts,
  description,
  slug,
}: AchievementsButtonOrProgressBarData) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

  function showingButtonOrProgressBar(
    value: number,
    tierCounts: Array<number>,
    description: any,
    slug: string
  ) {
    const completedAchievementRewards = studentData?.achievement_rewards.filter(
      (item) => item.data.achievement_slug === slug
    );
    if (
      completedAchievementRewards[0]?.data?.achievement_slug === slug &&
      pathName.split("/")[2] !== "suggestedFriends"
    ) {
      return (
        <Z3DButton
          className="getting-the-gems"
          onClick={() => {
            typeof window !== undefined
              ? localStorage.setItem(
                  "back-from-claim-reward",
                  `/${pathName.split("/").slice(1).join("/")}`
                )
              : null;

            dispatch(updateClaimRewardSlug(slug));
            dispatch(updateActivityType("achievement"));
            dispatch(
              updateClaimRewardID(completedAchievementRewards[0]?.data?.id)
            );

            router.push("/claim-reward");
          }}
        >
          <Image src="/svg/diamond.svg" width={26} height={26} alt="" />
          دریافت جایزه
        </Z3DButton>
      );
    } else {
      return (
        <>
          <AchievementsDescription
            description={description}
            tierCounts={tierCounts}
            value={value}
          />
          {tierCounts[tierCounts?.length - 1] <= value ? (
            <></>
          ) : (
            <Box className="progress-and-level-counter">
              <LinearProgress
                sx={{
                  backgroundColor: theme.palette.border.main,
                  borderRadius: "20px",
                  height: "8px",
                  "& span": {
                    backgroundColor: theme.palette.success.main,
                    borderRadius: "10px",
                  },
                  transform: "rotate3d(0, 0, 1, 180deg)",
                }}
                variant="determinate"
                value={achievementsCalculateProgressValue(value, tierCounts)}
              />
              <Typography
                className="level-counter"
                sx={{ color: theme.palette.gray["2"] }}
              >
                {achievementsMergingValueAndTierCount(value, tierCounts)}
              </Typography>
            </Box>
          )}
        </>
      );
    }
  }

  return (
    <>{showingButtonOrProgressBar(value, tierCounts, description, slug)}</>
  );
}

export default AchievementsButtonOrProgressBar;
