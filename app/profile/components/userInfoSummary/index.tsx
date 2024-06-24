import React, { MouseEventHandler } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Icon from "@/components/icon";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { useRouter } from "next/navigation";
import { setDataForFollowersOrFollowing } from "@/providers/Redux/general/generalSlice";
import { textIsFarsi } from "@/modules/helper";
import "./style.scss";

type UserInfoSummaryData = {
  profile_data: any;
  followers: string | number | null | undefined;
  followings: string | number | null | undefined;
  handleOpenFullProfilePicModal?:
    | MouseEventHandler<HTMLImageElement>
    | undefined;
};

function UserInfoSummary({
  profile_data,
  followers,
  followings,
  handleOpenFullProfilePicModal,
}: UserInfoSummaryData) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const { id } = useSelector((state: RootReduxState) => state.user);
  const router = useRouter();
  return (
    <Box
      className="user-info-summary"
      sx={{
        boxShadow: "0px 1px 1px #00000029",
        background: theme.palette.white.flexible,
      }}
    >
      <Box className="edit-profile">
        {profile_data?.data?.id === id ? (
          <Icon
            icon="edit"
            size={48}
            onClick={() => router.push("/profile/myProfile")}
          />
        ) : (
          <></>
        )}
      </Box>
      <Box className="user-profile-name">
        <Box sx={{ color: theme.palette.gray["1"] }}>
          {profile_data?.data?.name ? (
            <Typography
              className={`${
                textIsFarsi(profile_data?.data?.name) ? "fa-style" : "en-style"
              }`}
              sx={{ color: theme.palette.gray["1"] }}
            >
              {profile_data?.data?.name}
            </Typography>
          ) : (
            <Typography
              className="fa-style"
              sx={{ color: theme.palette.gray["1"] }}
            >
              شما نام کاربری ندارید
            </Typography>
          )}
        </Box>
        <Typography
          className="user-pseudonym-name"
          sx={{ color: theme.palette.gray["2"] }}
        >
          {profile_data?.data?.username}
        </Typography>
        <Box
          className="friends-wrapper"
          sx={{ color: theme.palette.system.blue }}
        >
          <Box
            onClick={() => {
              dispatch(setDataForFollowersOrFollowing("following"));
              router.push(
                `/profile/followersFollowings/${profile_data?.data?.id}`
              );
            }}
          >
            <Typography variant="caption"> {followers} </Typography>
            <Typography variant="caption"> دنبال شونده </Typography>
          </Box>
          <Box
            onClick={() => {
              dispatch(setDataForFollowersOrFollowing("followers"));
              router.push(
                `/profile/followersFollowings/${profile_data?.data?.id}`
              );
            }}
          >
            <Typography variant="caption"> {followings} </Typography>
            <Typography variant="caption">دنبال کننده</Typography>
          </Box>
        </Box>
      </Box>
      {profile_data?.data?.profile_pic ? (
        <Image
          src={profile_data?.data?.profile_pic}
          alt={profile_data?.data?.name}
          width={64}
          height={64}
          className="user-profile-pic"
          onClick={
            profile_data?.data?.id === id
              ? () => router.push("/profile/myProfile")
              : handleOpenFullProfilePicModal
          }
        />
      ) : (
        <Icon icon="without-pic" size={64} className="user-profile-pic" />
      )}
    </Box>
  );
}

export default UserInfoSummary;
