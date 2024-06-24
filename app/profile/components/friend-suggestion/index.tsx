"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import Icon from "@/components/icon";
import { putMethodRelationShip } from "../../api";
import { usePathname, useRouter } from "next/navigation";
import { useSpecificStudentsAPI } from "@/app/profile/hook";
import CommonSuccessSnackBar from "../successSnackbar";
import CommonErrorSnackBar from "../errorSnackBar";
import FollowUnfollowCheckbox from "../followUnfollowCheckbox";
import { RootReduxState } from "@/providers/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedFriendID } from "@/providers/Redux/general/generalSlice";
import { useStudentAPI } from "@/app/setting/store/hook";
import "./style.scss";

type FriendsData = {
  listOfFriends: Array<any>;
  handleRefuseFriend?: (x: number) => void;
  showDeleteButton?: boolean;
  pagination?: number;
  searchTotalPagination?: number;
};

function FriendsSuggestionList({
  listOfFriends,
  handleRefuseFriend,
  showDeleteButton,
  pagination,
  searchTotalPagination,
}: FriendsData) {
  const { followersOrFollowing } = useSelector(
    (state: RootReduxState) => state.general
  );
  const dispatch = useDispatch();
  const pathID = usePathname().split("/")[3];
  const { id: myID } = useSelector((state: RootReduxState) => state.user);
  const router = useRouter();
  const theme = useTheme() as any;
  const [getUserName, setGetUserName] = useState<string>("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
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
  const { mutate: getStudentData } = useStudentAPI();
  useEffect(() => {
    const sos = listOfFriends
      .map((item, index) => {
        if (item.followed_by_viewer === true) {
          return item.id;
        }
      })
      .filter((item) => item !== undefined);
    setFollowedUsers(sos);
  }, [listOfFriends]);

  function handleAddingFriend(id: number, name: string) {
    if (followedUsers.includes(id)) {
      setUnfollowLoading((prev) => [...prev, id]);
      putMethodRelationShip({ uid: id, type: "unfollowed" })
        .then((res) => {
          setUnfollowedUsers((prev) => [...prev, id]);
          getSpecificStudentData(id);

          // using getStudentData(myID) this will update count of user followers
          // or following immediately in profile
          // maybe in the future i remove getStudentData(myID)
          getStudentData(myID);
        })
        .catch((err) => {
          setErrorForUnfollowedUsers((prev) => [...prev, id]);
          setOpenErrorSnackbar(true);
          // console.log("آن فالو انجام نشد");
        });
    } else {
      setLoadingForFollowing((prev) => [...prev, id]);
      putMethodRelationShip({ uid: id, type: "followed" })
        .then((res) => {
          setGetUserName(name);
          setOpenSuccessSnackbar(true);
          setFollowedUsers((prev) => [...prev, id]);
          getSpecificStudentData(id);
          // using getStudentData(myID) this will update count of user followers
          // or following immediately in profile
          // maybe in the future i remove getStudentData(myID)
          getStudentData(myID);
        })
        .catch((err) => {
          setErrorForFollowedUsers((prev) => [...prev, id]);
          // console.log(err);
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
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  };

  return (
    <>
      <List
        className="students-items"
        sx={{
          backgroundColor: theme.palette.white.flexible,
        }}
      >
        {listOfFriends?.map((item: any, index: number) => {
          return (
            <ListItem
              key={item?.id}
              className="student-item"
              sx={{
                backgroundColor: theme.palette.white.flexible,
                borderBottomColor: `${theme.palette.border.main} !important`,
              }}
            >
              <Box
                className="student-img-name-wrapper"
                onClick={() => {
                  dispatch(setSuggestedFriendID(item.id));
                  router.push(`/profile/suggestedFriends/${item?.id}`);
                }}
              >
                {item?.profile_pic ? (
                  <Image
                    src={item?.profile_pic}
                    width={48}
                    height={48}
                    alt={item?.name}
                  />
                ) : (
                  <Icon
                    icon="without-pic"
                    size={48}
                    className="user-profile-pic"
                  />
                )}
                <Box className="name-reason-wrapper">
                  <Typography sx={{ color: theme.palette.gray["1"] }}>
                    {item?.name ? item.name : "کاربر"}
                  </Typography>
                  {item?.reason ? (
                    <Typography sx={{ color: theme.palette.gray["1"] }}>
                      {item.reason}
                    </Typography>
                  ) : item?.total_xp ? (
                    <Typography sx={{ color: theme.palette.gray["1"] }}>
                      {new Intl.NumberFormat("en-US").format(item?.total_xp)}
                      {"  "}
                      امتیاز
                    </Typography>
                  ) : item?.username ? (
                    <Typography sx={{ color: theme.palette.gray["1"] }}>
                      {item.username}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>

              <Box
                className={`follow-unfollow-delete-wrapper ${
                  showDeleteButton ? "showDeleteButton" : "hideDeleteButton"
                }`}
              >
                <FollowUnfollowCheckbox
                  loadingForFollowing={loadingForFollowing}
                  unfollowLoading={unfollowLoading}
                  followedUsers={followedUsers}
                  handleAddingFriend={handleAddingFriend}
                  id={item?.id}
                  name={item?.name}
                />
                {showDeleteButton ? (
                  <IconButton
                    onClick={() => handleRefuseFriend(item?.id)}
                    sx={{
                      "& svg": {
                        "& path": {
                          fill: `${theme.palette.icon["2"]} !important`,
                        },
                      },
                    }}
                  >
                    <Icon icon="close" width={48} height={40} />
                  </IconButton>
                ) : (
                  <></>
                )}
              </Box>
            </ListItem>
          );
        })}
        {+pathID === myID &&
        followersOrFollowing === "following" &&
        (listOfFriends.length === pagination ||
          listOfFriends.length === searchTotalPagination) ? (
          <Button
            onClick={() => router.push("/profile/suggestedFriends")}
            sx={{
              color: theme.palette.system.blue,
              "& svg": {
                "& path": {
                  fill: `${theme.palette.system.blue} !important`,
                },
              },
            }}
            className="adding-new-friends"
          >
            اضافه کردن دوست جدید
            <Icon icon="close" size={32} />
          </Button>
        ) : (
          <></>
        )}
      </List>

      <CommonSuccessSnackBar
        openSuccessSnackbar={openSuccessSnackbar}
        closeSnackBar={closeSnackBar}
        getUserName={getUserName}
        type="success-follow"
      />
      <CommonErrorSnackBar
        openErrorSnackbar={openErrorSnackbar}
        closeSnackBar={closeSnackBar}
        text="مشکلی در لغو دنبال کردن پیش آمد! مجددا تلاش کنید"
      />
    </>
  );
}

export default FriendsSuggestionList;
