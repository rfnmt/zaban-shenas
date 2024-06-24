import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { friendSuggestionsApi, putMethodRelationShip } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useSpecificStudentsAPI } from "../../hook";
import FollowUnfollowCheckbox from "../followUnfollowCheckbox";
import { setSuggestedFriendID } from "@/providers/Redux/general/generalSlice";
import { useDispatch } from "react-redux";
import "./style.scss";

function FriendsListSwiper() {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme() as any;
  const { data: friendsData } = useQuery({
    queryKey: ["friend-sugesstions", 1, 5],
    queryFn: () => friendSuggestionsApi(1, 5),
  });

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

  return friendsData?.data?.students.length > 0 ? (
    <>
      <Box className="swiper-suggested-list-title">
        <Typography
          onClick={() => router.push("/profile/suggestedFriends")}
          sx={{
            color: theme.palette.system.blue,
            "& svg": {
              "& path": {
                fill: `${theme.palette.system.blue} !important`,
              },
            },
          }}
        >
          <Icon icon="chevron-left" size={18} />
          دیدن همه
        </Typography>
        <Typography sx={{ color: theme.palette.gray["1"] }}>
          دوستان پیشنهادی
        </Typography>
      </Box>
      <Swiper className="profile-swiper-wrapper" slidesPerView={"auto"}>
        {friendsData?.data?.students.map((item: any, index: number) => {
          return (
            <SwiperSlide key={item.id}>
              <Box
                className="info-swiperSlide"
                sx={{ backgroundColor: theme.palette.white.flexible }}
              >
                <Icon icon="close" size={32} className="delete-friend" />
                <Box
                  className="wrap-pic-name-reason"
                  onClick={() => {
                    dispatch(setSuggestedFriendID(item.id));
                    router.push(`/profile/suggestedFriends/${item.id}`);
                  }}
                >
                  {item?.profile_pic ? (
                    <Image
                      src={item?.profile_pic}
                      width={48}
                      height={48}
                      alt={item.name}
                    />
                  ) : (
                    <Icon icon="without-pic" size={48} />
                  )}

                  <Typography
                    className="friend-name"
                    sx={{ color: theme.palette.gray["1"] }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    className="friend-reason"
                    sx={{ color: theme.palette.gray["2"] }}
                  >
                    {item.reason}
                  </Typography>
                </Box>
                <FollowUnfollowCheckbox
                  loadingForFollowing={loadingForFollowing}
                  unfollowLoading={unfollowLoading}
                  followedUsers={followedUsers}
                  handleAddingFriend={handleAddingFriend}
                  id={item.id}
                  name={item.name}
                  followCaption={true}
                  unfollowCaption={true}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  ) : (
    <></>
  );
}

export default FriendsListSwiper;
