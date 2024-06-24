"use client";
import React, { useEffect, useState } from "react";
import Achievements from "@/components/achievements";
import { useSelector } from "react-redux";
import { SuggestFreindRootData } from "../../interfaces";
import { usePathname } from "next/navigation";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { InitialData } from "@/app/setting/initialData.interfaces";

function FriendAchievementsPage() {
  const pathName = usePathname();
  const { suggestedFriendID } = useSelector((state: any) => state.general);
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    suggestedFriendID === null
      ? Number(pathName.split("/")[3])
      : suggestedFriendID,
  ]);
  const [userAchievements, setUserAchievements] = useState<Array<any>>([]);
  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);
  useEffect(() => {
    if (getSingleStudentData) {
      setUserAchievements([]);
      for (const userGainedAchievements of userInitialData?.achievements
        ?.data) {
        for (const allExistedAchievements of getSingleStudentData?.attributes
          ?.data) {
          if (
            userGainedAchievements.parameter === allExistedAchievements.name
          ) {
            setUserAchievements((prev) => [
              ...prev,
              {
                userGainedAchievements,
                allExistedAchievements,
              },
            ]);
          }
        }
      }
    }
  }, [getSingleStudentData]);
  return (
    <Achievements
      userAchievements={userAchievements}
      showSeeAllAchievements={false}
      countOfItems={userAchievements?.length}
    />
  );
}

export default FriendAchievementsPage;
