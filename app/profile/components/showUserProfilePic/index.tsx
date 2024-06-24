import React, { MouseEventHandler } from "react";
import { Box, Button, Dialog, useTheme } from "@mui/material";
import Image from "next/image";
import Icon from "@/components/icon";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
interface ProfilePicData {
  openFullProfilePic: boolean;
  handleCloseFullProfilePicModal: MouseEventHandler;
  specificUserProfileInfo: any;
  showFullWidthImage?: string | null;
  handleOpenSelectPic?: () => void;
}

function ShowUserProfilePic({
  openFullProfilePic,
  handleCloseFullProfilePicModal,
  specificUserProfileInfo,
  showFullWidthImage,
  handleOpenSelectPic,
}: ProfilePicData) {
  const theme = useTheme() as any;

  const { id } = useSelector((state: RootReduxState) => state.user);

  return (
    <Dialog
      open={openFullProfilePic}
      onClose={handleCloseFullProfilePicModal}
      className="user-fullScreen-pic"
      sx={{
        "& .MuiDialog-paperWidthSm": {
          backgroundColor: "black.fix",
        },
        "& .MuiDialog-container": {
          backgroundColor: "black.fix",
        },
      }}
      // onClick={handleCloseFullProfilePicModal}
    >
      <div className="options">
        {id !== specificUserProfileInfo?.myId ? (
          <></>
        ) : (
          <Button
            className="edit-button"
            sx={{
              color: "white.fix",
            }}
            onClick={handleOpenSelectPic}
          >
            ویرایش
          </Button>
        )}

        <Button
          sx={{
            color: "white.fix",
            "& svg": {
              "& path": {
                fill: `${theme.palette.white.fix} !important`,
              },
            },
          }}
          className="cancel"
          onClick={handleCloseFullProfilePicModal}
        >
          <Icon icon="close" />
        </Button>
      </div>

      {showFullWidthImage ? (
        <Box className="fullScreenPic">
          <Image
            src={
              showFullWidthImage instanceof Blob
                ? URL.createObjectURL(showFullWidthImage)
                : showFullWidthImage
            }
            alt="my profile pic"
            width={375}
            height={375}
            layout="fixed"
          />
        </Box>
      ) : (
        <></>
      )}
    </Dialog>
  );
}

export default ShowUserProfilePic;
