import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
} from "@mui/material";
import LottieLoading from "@/components/lottieLoading";
import Icon from "@/components/icon";
import "./style.scss";

type FollowUnfollowCheckboxDataType = {
  loadingForFollowing: Array<number>;
  unfollowLoading: Array<number>;
  followedUsers: Array<number>;
  handleAddingFriend: (id: number, name: string) => void;
  id: number;
  name: string;
  followCaption?: boolean;
  unfollowCaption?: boolean;
};

function FollowUnfollowCheckbox({
  loadingForFollowing,
  unfollowLoading,
  followedUsers,
  handleAddingFriend,
  id,
  name,
  followCaption,
  unfollowCaption,
}: FollowUnfollowCheckboxDataType) {
  const theme = useTheme() as any;
  return (
    <FormGroup className="checkbox-wrapper-follow-unfollow">
      {loadingForFollowing.includes(id) || unfollowLoading.includes(id) ? (
        <Box className="preventing-click" />
      ) : (
        <></>
      )}
      <FormControlLabel
        control={
          <Checkbox
            value={id}
            checked={followedUsers.includes(id)}
            onChange={() => {
              handleAddingFriend(id, name);
            }}
          />
        }
        label={
          <Box
            className="follow-specific-friends"
            sx={
              followedUsers.includes(id)
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
                (loadingForFollowing.includes(id) ||
                  unfollowLoading.includes(id)) &&
                true
              }
              customLoading={false}
              lottie_className="following-loading"
              width={44}
              height={44}
            />
            {followedUsers.includes(id) ? (
              <>
                {followCaption ? (
                  <Box
                    className="follow-unfollow-caption"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    دنبال می‌کنید
                  </Box>
                ) : (
                  <></>
                )}

                <Icon icon="person_added" size={24} />
              </>
            ) : (
              <>
                {unfollowCaption ? (
                  <Box
                    className="follow-unfollow-caption"
                    sx={{ color: theme.palette.white.fix }}
                  >
                    دنبال کردن
                  </Box>
                ) : (
                  <></>
                )}

                <Icon icon="person_add" size={24} />
              </>
            )}
          </Box>
        }
      />
    </FormGroup>
  );
}

export default FollowUnfollowCheckbox;
