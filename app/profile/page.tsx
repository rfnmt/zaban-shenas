"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Z3DButton from "@/components/Z3DButton";
import Icon from "@/components/icon";
import { useRouter } from "next/navigation";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import UserInfoSummary from "./components/userInfoSummary";
import FriendsListSwiper from "./components/friendsListSwiper";
import BadgesSnapshot from "./components/badgesSnapShot";
import InvitingFriends from "./components/invitingFriends";
import { IStudentData } from "../../models/studentData.interfaces";
import { InitialData } from "../setting/initialData.interfaces";
import { IBadgeData } from "./badges/badge.interface";
import Achievements from "@/components/achievements";
import UserLearningStatistics from "./components/userLearningStatistics";
import "./style.scss";

function UserProfileInfo() {
  const router = useRouter();
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const getUserBadge = queryClient.getQueryData<IBadgeData>(["user-badge"]);
  const filterUserFriendsCount = studentData?.attributes?.data.filter(
    (item: any) =>
      item.name === "follow_count" || item.name === "followed_by_count"
  );

  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);

  const [userAchievements, setUserAchievements] = useState<Array<any>>([]);
  useEffect(() => {
    if (studentData) {
      setUserAchievements([]);
      for (const userGainedAchievements of userInitialData?.achievements
        ?.data) {
        for (const allExistedAchievements of studentData?.attributes?.data) {
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
  }, [studentData]);

  return (
    <Box className="user-profile-info">
      <UserInfoSummary
        profile_data={studentData?.profile_data}
        followers={filterUserFriendsCount && filterUserFriendsCount[0]?.value}
        followings={filterUserFriendsCount && filterUserFriendsCount[1]?.value}
      />
      <Z3DButton
        className="add-new-friends"
        onClick={() => router.push("/profile/suggestedFriends")}
      >
        <Typography>اضافه کردن دوستان جدید</Typography>
        <Icon icon="person_add" size={24} />
      </Z3DButton>
      <UserLearningStatistics />
      {/* <Typography>Calendar</Typography> */}
      <FriendsListSwiper />
      {getUserBadge?.badges && getUserBadge?.badges?.length > 0 ? (
        <BadgesSnapshot badgesData={getUserBadge?.badges} />
      ) : (
        <></>
      )}
      <Achievements
        userAchievements={userAchievements}
        showSeeAllAchievements={true}
        countOfItems={4}
      />
      <InvitingFriends />
    </Box>
  );
}

export default UserProfileInfo;
