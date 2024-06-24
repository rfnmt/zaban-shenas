"use client";
import React, { useEffect, useState } from "react";
import UserInfoSummary from "../../components/userInfoSummary";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import Icon from "@/components/icon";
import ProfileChainScoreInfo from "../../components/profileChainScoreInfo";
import LottieLoading from "@/components/lottieLoading";
import { putMethodRelationShip } from "../../api";
import { useSpecificStudentsAPI } from "../../hook";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import CommonSuccessSnackBar from "../../components/successSnackbar";
import CommonErrorSnackBar from "../../components/errorSnackBar";
import ShowUserProfilePic from "../../components/showUserProfilePic";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOpenGiftBottomSheet,
  setSuggestedFriendID,
} from "@/providers/Redux/general/generalSlice";
import { SuggestFreindRootData } from "../interfaces";
import { usePathname, useSearchParams } from "next/navigation";
import { removeURLParam } from "@/modules/helper";
import { InitialData } from "@/app/setting/initialData.interfaces";
import Achievements from "@/components/achievements";
import "./style.scss";

function SingleSuggestedFriendsPage() {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const searchParams = useSearchParams();
  const { suggestedFriendID } = useSelector((state: any) => state.general);
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    suggestedFriendID === null
      ? Number(pathName.split("/")[3])
      : suggestedFriendID,
  ]);
  const filterUserFriendsCount = getSingleStudentData?.attributes?.data.filter(
    (item: any) =>
      item.name === "follow_count" || item.name === "followed_by_count"
  );
  const singleUserScoreAndChain = getSingleStudentData?.attributes?.data.filter(
    (item: any) => item.name === "current_streak" || item.name === "total_xp"
  );

  useEffect(() => {
    if (getSingleStudentData?.relationship_status?.data?.followed_by_viewer) {
      setFollowedUsers((prev) => [
        ...prev,
        getSingleStudentData?.relationship_status?.data?.id,
      ]);
    } else {
      return;
    }
  }, [suggestedFriendID, Number(pathName.split("/")[3])]);

  useEffect(() => {
    //this code only works when user refreshes the single page
    // and in that situation we will lose "suggestedFriendID"
    if (suggestedFriendID === null) {
      dispatch(setSuggestedFriendID(Number(pathName.split("/")[3])));
    }
  }, []);

  const [getUserName, setGetUserName] = useState<string>("");
  const [openFollowSuccess, setOpenFollowSuccess] = useState(false);
  const [openUnfollowError, setOpenUnfollowError] = useState<boolean>(false);
  const [openPaymentError, setOpenPaymentError] = useState<boolean>(false);
  const [openPaymentSuccess, setOpenPaymentSuccess] = useState<boolean>(false);
  const [loadingForFollowing, setLoadingForFollowing] = useState<Array<number>>(
    []
  );
  const { mutate: getSpecificStudentData } = useSpecificStudentsAPI();
  const [followedUsers, setFollowedUsers] = useState<Array<number>>([]);
  const [errorForFollowedUsers, setErrorForFollowedUsers] = useState<
    Array<number>
  >([]);
  const [unfollowedUsers, setUnfollowedUsers] = useState<Array<number>>([]);
  const [errorForUnfollowedUsers, setErrorForUnfollowedUsers] = useState<
    Array<number>
  >([]);
  const [unfollowLoading, setUnfollowLoading] = useState<Array<number>>([]);

  function handleAddingFriend(id: number, name: string) {
    if (followedUsers.includes(id)) {
      setUnfollowLoading((prev) => [...prev, id]);
      putMethodRelationShip({ uid: id, type: "unfollowed" })
        .then((res) => {
          setUnfollowedUsers((prev) => [...prev, id]);
          getSpecificStudentData(id);
        })
        .catch((err) => {
          setErrorForUnfollowedUsers((prev) => [...prev, id]);
          setOpenUnfollowError(true);
          // console.log("آن فالو انجام نشد");
        });
    } else {
      setLoadingForFollowing((prev) => [...prev, id]);
      putMethodRelationShip({ uid: id, type: "followed" })
        .then((res) => {
          setGetUserName(name);
          setOpenFollowSuccess(true);
          setFollowedUsers((prev) => [...prev, id]);
          getSpecificStudentData(id);
        })
        .catch((err) => {
          setErrorForFollowedUsers((prev) => [...prev, id]);
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (errorForUnfollowedUsers.length > 0) {
      for (let i = 0; i < errorForUnfollowedUsers.length; i++) {
        const maintainCommingID = unfollowLoading.filter(
          (item) => item !== errorForUnfollowedUsers[i]
        );
        setErrorForUnfollowedUsers((prev) => []);
        setUnfollowLoading((prev) => [...maintainCommingID]);
      }
    }
  }, [errorForUnfollowedUsers]);

  useEffect(() => {
    if (unfollowedUsers.length > 0) {
      for (let i = 0; i < unfollowedUsers.length; i++) {
        const maintainCommingID = unfollowLoading.filter((item) => {
          return item !== unfollowedUsers[i];
        });
        const holdFollowedUsers = followedUsers.filter((item) => {
          return item !== unfollowedUsers[i];
        });
        setUnfollowLoading((prev) => [...maintainCommingID]);
        setFollowedUsers((prev) => [...holdFollowedUsers]);
        setUnfollowedUsers((prev) => []);
      }
    }
  }, [unfollowedUsers]);

  useEffect(() => {
    if (followedUsers.length > 0) {
      for (let i = 0; i < followedUsers.length; i++) {
        const maintainCommingID = loadingForFollowing.filter(
          (item) => item !== followedUsers[i]
        );
        setLoadingForFollowing((prev) => [...maintainCommingID]);
      }
    }
  }, [followedUsers]);

  useEffect(() => {
    if (errorForFollowedUsers.length > 0) {
      for (let i = 0; i < errorForFollowedUsers.length; i++) {
        const maintainCommingID = loadingForFollowing.filter(
          (item) => item !== errorForFollowedUsers[i]
        );
        setErrorForFollowedUsers((prev) => []);
        setLoadingForFollowing((prev) => [...maintainCommingID]);
      }
    }
  }, [errorForFollowedUsers]);

  const closeSnackBar = () => {
    setOpenUnfollowError(false);
    setOpenPaymentError(false);
    setOpenFollowSuccess(false);
  };

  const [openFullProfilePic, setOpenFullProfilePic] = useState<boolean>(false);
  const handleOpenFullProfilePicModal = () => {
    setOpenFullProfilePic(true);
  };

  const handleCloseFullProfilePicModal = () => {
    setOpenFullProfilePic(false);
  };
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setOpenPaymentSuccess(true);
    } else if (searchParams.get("success") === "false") {
      setOpenPaymentError(true);
    }
    window.history.pushState(
      "",
      document.title,
      removeURLParam(window.location.href, "success")
    );
  }, []);

  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);
  const [userAchievements, setUserAchievements] = useState<Array<any>>([]);
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

  // console.log(getSingleStudentData);

  return (
    <>
      <Box className="single-user-profile-info" id="main-pages-screenshot">
        <UserInfoSummary
          profile_data={getSingleStudentData?.profile_data}
          followers={filterUserFriendsCount && filterUserFriendsCount[0]?.value}
          followings={
            filterUserFriendsCount && filterUserFriendsCount[1]?.value
          }
          handleOpenFullProfilePicModal={handleOpenFullProfilePicModal}
        />
        <Box className="gift-follow">
          <Button
            sx={{
              backgroundColor: theme.palette.white.flexible,
            }}
            onClick={() => {
              localStorage.removeItem("needingOneGem");
              dispatch(handleOpenGiftBottomSheet(true));
            }}
          >
            <Icon icon="gift" size={24} />
          </Button>
          <FormGroup className="checkbox-wrapper-follow-unfollow">
            {loadingForFollowing.includes(
              getSingleStudentData?.relationship_status?.id
            ) ||
            unfollowLoading.includes(
              getSingleStudentData?.relationship_status?.id
            ) ? (
              <Box className="preventing-click" />
            ) : (
              <></>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  value={getSingleStudentData?.relationship_status?.id}
                  checked={
                    getSingleStudentData?.relationship_status?.data
                      ?.followed_by_viewer
                  }
                  onChange={() => {
                    handleAddingFriend(
                      getSingleStudentData?.profile_data?.data?.id,
                      getSingleStudentData?.profile_data?.data?.name
                    );
                  }}
                />
              }
              label={
                <Box
                  className="follow-specific-friends"
                  sx={
                    getSingleStudentData?.relationship_status?.data
                      ?.followed_by_viewer
                      ? {
                          backgroundColor: theme.palette.white.flexible,
                          border: `2px solid ${theme.palette.primary.main}`,
                        }
                      : {
                          backgroundColor: theme.palette.primary.main,
                          border: "2px solid transparent",
                        }
                  }
                >
                  <LottieLoading
                    open_lottie={
                      (loadingForFollowing.includes(
                        getSingleStudentData?.relationship_status?.id
                      ) ||
                        unfollowLoading.includes(
                          getSingleStudentData?.relationship_status?.id
                        )) &&
                      true
                    }
                    customLoading={false}
                    lottie_className="following-loading"
                    width={44}
                    height={44}
                  />
                  {getSingleStudentData?.relationship_status?.data
                    ?.followed_by_viewer ? (
                    <>
                      <Box
                        className="follow-unfollow-caption"
                        sx={{ color: theme.palette.primary.main }}
                      >
                        دنبال می‌کنید
                      </Box>
                      <Icon icon="person_added" size={24} />
                    </>
                  ) : (
                    <>
                      <Box
                        className="follow-unfollow-caption"
                        sx={{ color: theme.palette.white.fix }}
                      >
                        دنبال کردن متقابل
                      </Box>
                      <Icon icon="person_add" size={24} />
                    </>
                  )}
                </Box>
              }
            />
          </FormGroup>
        </Box>
        <Box className="learning-statistics">
          <Typography sx={{ color: theme.palette.gray["1"] }}>
            آمار یادگیری
          </Typography>

          <ProfileChainScoreInfo
            current_streak={
              singleUserScoreAndChain && singleUserScoreAndChain[0]?.value
            }
            total_xp={
              singleUserScoreAndChain && singleUserScoreAndChain[1]?.value
            }
          />
        </Box>
        <Achievements
          userAchievements={userAchievements}
          showSeeAllAchievements={true}
          countOfItems={5}
        />
      </Box>
      <CommonSuccessSnackBar
        openSuccessSnackbar={openFollowSuccess}
        closeSnackBar={closeSnackBar}
        getUserName={getUserName}
        type="success-follow"
      />
      <CommonSuccessSnackBar
        openSuccessSnackbar={openPaymentSuccess}
        closeSnackBar={closeSnackBar}
        getUserName={getUserName}
        type="success-buying-from-store"
      />

      <CommonErrorSnackBar
        openErrorSnackbar={openPaymentError}
        closeSnackBar={closeSnackBar}
        text="پرداخت ناموفق بود"
      />
      <CommonErrorSnackBar
        openErrorSnackbar={openUnfollowError}
        closeSnackBar={closeSnackBar}
        text="مشکلی در لغو دنبال کردن پیش آمد! مجددا تلاش کنید"
      />
      <ShowUserProfilePic
        openFullProfilePic={openFullProfilePic}
        handleCloseFullProfilePicModal={handleCloseFullProfilePicModal}
        specificUserProfileInfo={getSingleStudentData?.profile_data}
        showFullWidthImage={
          getSingleStudentData?.profile_data?.data?.profile_pic
        }
      />
    </>
  );
}

export default SingleSuggestedFriendsPage;
