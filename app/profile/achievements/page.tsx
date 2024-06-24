"user client";
import React from "react";
import Achievements from "@/components/achievements";

function AchievementsPage({ userAchievements }: any) {
  return (
    <Achievements
      userAchievements={userAchievements}
      showSeeAllAchievements={false}
      countOfItems={userAchievements.length}
    />
  );
}

export default AchievementsPage;
