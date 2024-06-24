"use client";

import { usePathname } from "next/navigation";

import HomePage from "../../app/page";
import SelectGradeLayout from "../../app/select-grade/layout";
import SettingLayout from "../../app/setting/layout";
import AboutLayout from "../../app/setting/about-us/layout";
import AppearanceLayout from "../../app/setting/appearance/layout";
import StoreLayout from "../../app/setting/store/layout";
import EditDailyGoalLayout from "../../app/setting/edit-daily-goal/layout";
import NotificationLayout from "../../app/setting/notifications/layout";
import SignUpLayout from "../../app/signup/layout";
import SessionLayout from "../../app/session/[id]/layout";
import IntroduceToFriendsLayout from "../../app/setting/introduce-to-friends/layout";
import InvitedFriendsListLayout from "../../app/setting/introduce-to-friends/invited-friends-list/layout";
import ReportLayout from "../../app/setting/report/layout";
import SubCourseLayout from "../../app/select-grade/[id]/layout";
import ProfileLayout from "../../app/profile/layout";
import SuggestedFriendsLayout from "../../app/profile/suggestedFriends/layout";
import SingleSuggestedFriendsLayout from "../../app/profile/suggestedFriends/[id]/layout";
import MyProfileLayout from "../../app/profile/myProfile/layout";
import FollowersFollowingLayout from "../../app/profile/followersFollowings/[id]/layout";
import BadgesLayout from "../../app/profile/badges/layout";
import ClaimRewardLayout from "../../app/claim-reward/layout";
import AchievementsLayout from "../../app/profile/achievements/layout";
import NotificationsLayout from "../../app/notifications/layout";
import FriendAchievementsLayout from "../../app/profile/suggestedFriends/[id]/friendAchievements/layout";
import OnboardingLayout from "../../app/onboarding/layout";
import StreakLayout from "../../app/streak/layout";
import DailyChallengeLayout from "../../app/daily-challenge/layout";
import WhatIsStreakLayout from "../../app/streak/what-is-streak/layout";
import SessionCompletedLayout from "../../app/session-completed/layout";

export default function DefineRoutes() {
  const pathname = usePathname();

  return [
    {
      key: "/",
      path: "/",
      component: <HomePage />,
    },
    {
      key: "/select-grade",
      path: "/select-grade",
      component: <SelectGradeLayout />,
    },
    {
      key: "/onboarding",
      path: "/onboarding",
      component: <OnboardingLayout />,
    },
    {
      key: "/setting",
      path: "/setting",
      component: <SettingLayout />,
    },
    {
      key: "/setting/about-us",
      path: "/setting/about-us",
      component: <AboutLayout />,
    },
    {
      key: "/setting/appearance",
      path: "/setting/appearance",
      component: <AppearanceLayout />,
    },
    {
      key: "/setting/store",
      path: "/setting/store",
      component: <StoreLayout />,
    },
    {
      key: "/setting/edit-daily-goal",
      path: "/setting/edit-daily-goal",
      component: <EditDailyGoalLayout />,
    },
    {
      key: "/setting/notifications",
      path: "/setting/notifications",
      component: <NotificationLayout />,
    },
    {
      key: "/setting/introduce-to-friends",
      path: "/setting/introduce-to-friends",
      component: <IntroduceToFriendsLayout />,
    },
    {
      key: "/setting/introduce-to-friends/invited-friends-list",
      path: "/setting/introduce-to-friends/invited-friends-list",
      component: <InvitedFriendsListLayout />,
    },
    {
      key: "/setting/report",
      path: "/setting/report",
      component: <ReportLayout />,
    },
    {
      key: "/signup",
      path: "/signup",
      component: <SignUpLayout />,
    },
    {
      key: `/session/${pathname.split("/")[2]}`,
      path: `/session/${pathname.split("/")[2]}`,
      component: <SessionLayout />,
    },
    {
      key: `/select-grade/${pathname.split("/")[2]}`,
      path: `/select-grade/${pathname.split("/")[2]}`,
      component: <SubCourseLayout />,
    },
    {
      key: "/profile",
      path: "/profile",
      component: <ProfileLayout />,
    },
    {
      key: "/profile/suggestedFriends",
      path: "/profile/suggestedFriends",
      component: <SuggestedFriendsLayout />,
    },
    {
      key: `/profile/suggestedFriends/${pathname.split("/")[3]}`,
      path: `/profile/suggestedFriends/${pathname.split("/")[3]}`,
      component: <SingleSuggestedFriendsLayout />,
    },
    {
      key: `/profile/myProfile`,
      path: `/profile/myProfile`,
      component: <MyProfileLayout />,
    },
    {
      key: `/profile/followersFollowings/${pathname.split("/")[3]}`,
      path: `/profile/followersFollowings/${pathname.split("/")[3]}`,
      component: <FollowersFollowingLayout />,
    },
    {
      key: `/profile/badges`,
      path: `/profile/badges`,
      component: <BadgesLayout />,
    },
    {
      key: `/claim-reward`,
      path: `/claim-reward`,
      component: <ClaimRewardLayout />,
    },
    {
      key: `/profile/achievements`,
      path: `/profile/achievements`,
      component: <AchievementsLayout />,
    },
    {
      key: `/notifications`,
      path: `/notifications`,
      component: <NotificationsLayout />,
    },
    {
      key: `/profile/suggestedFriends/${
        pathname.split("/")[3]
      }/friendAchievements`,
      path: `/profile/suggestedFriends/${
        pathname.split("/")[3]
      }/friendAchievements`,
      component: <FriendAchievementsLayout />,
    },
    {
      key: `/streak`,
      path: `/streak`,
      component: <StreakLayout />,
    },
    {
      key: `/streak/what-is-streak`,
      path: `/streak/what-is-streak`,
      component: <WhatIsStreakLayout />,
    },
    {
      key: `/daily-challenge`,
      path: `/daily-challenge`,
      component: <DailyChallengeLayout />,
    },
    {
      key: `/session-completed`,
      path: `/session-completed`,
      component: <SessionCompletedLayout />,
    },
  ];
}
