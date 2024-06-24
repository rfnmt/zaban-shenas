import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { Box } from "@mui/material";
import Icon from "@/components/icon";
import Image from "next/image";

import "./style.scss";

type UserProfileAvaterData = {
  // upImg: boolean;
  handleOpenFullProfilePicModal: MouseEventHandler;
  openInput: MouseEventHandler;
  handleSelectImage: ChangeEventHandler;
  avatarPic: string | null;
  imageInputRef: any;
};

function UserProfileAvater({
  // upImg,
  handleOpenFullProfilePicModal,
  openInput,
  handleSelectImage,
  avatarPic,
  imageInputRef,
}: UserProfileAvaterData) {
  return (
    <Box className="profile-page-user-avatar">
      {avatarPic ? (
        <Image
          src={
            avatarPic instanceof Blob
              ? URL.createObjectURL(avatarPic)
              : avatarPic
          }
          width={128}
          height={128}
          alt="user profile pic"
          onClick={handleOpenFullProfilePicModal}
        />
      ) : (
        <Icon icon="without-pic" size={128} onClick={openInput} />
      )}

      <input
        id="selectImage"
        hidden
        type="file"
        onChange={avatarPic !== null ? null : handleSelectImage}
        ref={imageInputRef}
      />
    </Box>
  );
}

export default UserProfileAvater;
