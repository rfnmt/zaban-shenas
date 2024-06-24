import Image from "next/image";
import React from "react";

type AchievementsLevelAndImageData = {
  thumbnail: any;
  tierCounts: Array<number>;
  value: number;
};
function AchievementsLevelAndImage({
  thumbnail,
  tierCounts,
  value,
}: AchievementsLevelAndImageData) {
  function levelImageLogic(
    thumbnail: any,
    tierCounts: Array<number>,
    value: number
  ) {
    const removeMinimumNumberOfArray = tierCounts.filter(
      (item) => item > value
    );
    if (tierCounts[tierCounts.length - 1] <= value) {
      return (
        <Image src={thumbnail?.completed} width={64} height={85} alt="levels" />
      );
    }
    if (Math.min(...removeMinimumNumberOfArray) > value) {
      return (
        <Image src={thumbnail?.ongoing} width={64} height={85} alt="levels" />
      );
    }
  }
  return <>{levelImageLogic(thumbnail, tierCounts, value)}</>;
}

export default AchievementsLevelAndImage;
