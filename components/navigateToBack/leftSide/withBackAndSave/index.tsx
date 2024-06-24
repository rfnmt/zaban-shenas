import React from "react";
import { Button, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateSendUserProfileDataToServer } from "@/providers/Redux/user/userSlice";

function WithBackAndSave() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  function sendProfileData() {
    dispatch(updateSendUserProfileDataToServer(true));
  }
  return (
    <Button sx={{ color: theme.palette.system.blue }} onClick={sendProfileData}>
      ذخیره
    </Button>
  );
}

export default WithBackAndSave;
