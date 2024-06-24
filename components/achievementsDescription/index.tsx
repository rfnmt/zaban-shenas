import React, { useMemo } from "react";
import { Typography, useTheme } from "@mui/material";

type AchievementsDescriptionData = {
  description: any;
  tierCounts: Array<number>;
  value: number;
};
function AchievementsDescription({
  description,
  tierCounts,
  value,
}: AchievementsDescriptionData) {
  const theme = useTheme() as any;

  const ongoing = useMemo(() => {
    const removeMinimumNumberOfArray = tierCounts.filter(
      (item) => item > value
    );

    if (String(Math.min(...removeMinimumNumberOfArray))) {
      const splittedDescription = description?.ongoing?.split(" ");
      const index = splittedDescription.indexOf("٪");
      const min = String(Math.min(...removeMinimumNumberOfArray));

      if (index > -1) {
        if (splittedDescription?.length) {
          splittedDescription?.splice(index, 1, min);
          return splittedDescription.join(" ");
        }
      }
    }
  }, []);

  function descriptionLogic(
    description: any,
    tierCounts: Array<number>,
    value: number
  ) {
    const removeMinimumNumberOfArray = tierCounts.filter(
      (item) => item > value
    );
    if (tierCounts[tierCounts.length - 1] <= value) {
      if (description?.completed?.split(" ").indexOf("٪") === -1) {
        return (
          <Typography
            className="description"
            sx={{ color: theme.palette.gray["1"] }}
          >
            {description?.completed}
          </Typography>
        );
      } else {
        return (
          <Typography
            className="description"
            sx={{ color: theme.palette.gray["1"] }}
          >
            {description?.completed

              ?.split(" ")
              .with(
                description?.completed?.split(" ").indexOf("٪"),
                String(tierCounts?.[tierCounts?.length - 1])
              )
              .join(" ")}
          </Typography>
        );
      }
    }
    if (Math.min(...removeMinimumNumberOfArray) > value) {
      if (description?.ongoing?.split(" ").indexOf("٪") === -1) {
        return (
          <Typography
            className="description"
            sx={{ color: theme.palette.gray["1"] }}
          >
            {description?.ongoing}
          </Typography>
        );
      } else {
        return (
          <Typography
            className="description"
            sx={{ color: theme.palette.gray["1"] }}
          >
            {ongoing}
          </Typography>
        );
      }
    }
  }
  return <>{descriptionLogic(description, tierCounts, value)}</>;
}

export default AchievementsDescription;
