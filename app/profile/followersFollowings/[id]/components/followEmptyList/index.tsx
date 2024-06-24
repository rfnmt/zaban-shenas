import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import Lottie from "react-lottie-player";
import { useSelector } from "react-redux";
import * as emptyList from "@/public/lottie-files/follow.json";
import { usePathname, useRouter } from "next/navigation";
import "./style.scss";
function FollowEmptyList() {
  const router = useRouter();
  const theme = useTheme() as any;
  const pathID = usePathname().split("/")[3];
  const { id } = useSelector((state: RootReduxState) => state.user);
  const { followersOrFollowing } = useSelector(
    (state: RootReduxState) => state.general
  );
  return (
    <Box className="list-wrapper">
      <Lottie
        className="followList-animation"
        play={true}
        loop={true}
        animationData={emptyList}
      />
      {followersOrFollowing === "followers" ? (
        <>
          <Typography
            sx={{ color: theme.palette.gray["1"] }}
            className="bold-follow-title"
          >
            کسی شما رو دنبال نمیکنه
          </Typography>
          <Typography
            sx={{ color: theme.palette.gray["3"] }}
            className="medium-follow-title"
          >
            در حال حاضر دنبال کننده ای نداری
          </Typography>
        </>
      ) : (
        <>
          <Typography
            sx={{ color: theme.palette.gray["1"] }}
            className="bold-follow-title"
          >
            کسی رو دنبال نمی‌کنید
          </Typography>
          <Typography
            sx={{ color: theme.palette.gray["3"] }}
            className="medium-follow-title"
          >
            وقتی با دیگران در ارتباطی با تفریح و سرگرمی و موثرتر درسو یاد
            می‌گیری
          </Typography>
          {+pathID === id ? (
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
        </>
      )}
    </Box>
  );
}

export default FollowEmptyList;
