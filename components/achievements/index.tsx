import { achievementsDeterminingLevelTitle } from "@/modules/achievementsHelper";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import AchievementsLevelAndImage from "../achievementsLevelAndImage";
import AchievementsButtonOrProgressBar from "../achievementsButtonOrProgressBar";
import Icon from "../icon";
import { usePathname, useRouter } from "next/navigation";
import "./style.scss";

type UserAchievementsData = {
  userAchievements: any;
  showSeeAllAchievements: boolean;
  countOfItems: number;
};
function Achievements({
  userAchievements,
  showSeeAllAchievements,
  countOfItems,
}: UserAchievementsData) {
  const theme = useTheme() as any;
  const router = useRouter();
  const pathName = usePathname();
  return (
    <>
      <Typography
        sx={{
          textAlign: "right",
          marginBottom: "8px",
          marginTop: "8px",
          color: theme.palette.gray["1"],
        }}
      >
        دستاوردها
      </Typography>
      <Box
        className="achievements-warpper"
        sx={{
          background: theme.palette.white.flexible,
          boxShadow: "0px 1px 0px #00000029",
        }}
      >
        <Box
          sx={{
            padding: "8px 16px",
          }}
        >
          {userAchievements?.slice(0, countOfItems).map((item: any) => {
            const {
              description,
              id,
              parameter,
              slug,
              thumbnail,
              tier_counts,
              title,
            } = item?.userGainedAchievements;
            const { value: progressValue } = item?.allExistedAchievements;

            return (
              <Box key={id} className="show-achievements">
                <Typography
                  className="level-data"
                  sx={{ color: theme.palette.white.fix }}
                >
                  سطح{" "}
                  {achievementsDeterminingLevelTitle(
                    progressValue,
                    tier_counts
                  )}
                </Typography>
                <AchievementsLevelAndImage
                  thumbnail={thumbnail}
                  tierCounts={tier_counts}
                  value={progressValue}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography
                    className="title"
                    sx={{ color: theme.palette.gray["1"] }}
                  >
                    {title}
                  </Typography>
                  <AchievementsButtonOrProgressBar
                    value={progressValue}
                    tierCounts={tier_counts}
                    description={description}
                    slug={slug}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        {showSeeAllAchievements ? (
          <Button
            className="see-all-achievements"
            onClick={() =>
              router.push(
                pathName.split("/").includes("suggestedFriends")
                  ? `/profile/suggestedFriends/${
                      pathName.split("/")[3]
                    }/friendAchievements`
                  : "/profile/achievements"
              )
            }
            sx={{ borderTop: `1px solid ${theme.palette.border.main}` }}
          >
            <Icon icon="chevron-left" size={24} />
            <Typography sx={{ color: theme.palette.gray["1"] }}>
              دیدن همه
            </Typography>
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default Achievements;
