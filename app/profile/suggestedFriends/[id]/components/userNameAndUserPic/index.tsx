import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import Image from "next/image";
import "./style.scss";

type UserNameAndUserPicData = {
  studentData: any;
};
function UserNameAndUserPic({ studentData }: UserNameAndUserPicData) {
  const theme = useTheme() as any;
  return (
    <Box className="user-pic-name">
      {studentData?.profile_data?.data?.profile_pic ? (
        <Image
          src={studentData?.profile_data?.data?.profile_pic}
          width={48}
          height={48}
          alt="user"
        />
      ) : (
        <Icon icon="without-pic" size={48} className="user-profile-pic" />
      )}
      <Typography sx={{ color: theme.palette.gray["1"] }} className="user-name">
        {studentData?.profile_data?.data?.name}
      </Typography>
    </Box>
  );
}

export default UserNameAndUserPic;
