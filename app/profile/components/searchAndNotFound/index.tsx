import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Lottie from "react-lottie-player";
import "./style.scss";
import Icon from "@/components/icon";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

type SearchAndNotFoundData = {
  state: boolean;
  mainTitle: string;
  subTitle: string;
  animationData: any;
};

function SearchAndNotFound({
  state,
  mainTitle,
  subTitle,
  animationData,
}: SearchAndNotFoundData) {
  const theme = useTheme() as any;
  const pathID = usePathname().split("/")[3];
  const { id } = useSelector((state: RootReduxState) => state.user);
  const router = useRouter();
  const { followersOrFollowing } = useSelector(
    (state: RootReduxState) => state.general
  );
  return (
    <Box className="search-or-notFound">
      <Lottie
        className="search-animation"
        play={state ? true : false}
        loop={false}
        animationData={animationData}
        segments={[0, 150]}
      />
      <Typography sx={{ color: theme.palette.gray["1"] }}>
        {mainTitle}{" "}
      </Typography>
      <Typography sx={{ color: theme.palette.gray["3"] }}>
        {subTitle}{" "}
      </Typography>
      {+pathID === id && followersOrFollowing === "following" ? (
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
    </Box>
  );
}

export default SearchAndNotFound;
