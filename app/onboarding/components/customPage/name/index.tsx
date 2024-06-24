import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import {
  updateOnboardingButtonActivation,
  updateOnboardingInitUsername,
} from "@/providers/Redux/onboarding/onboardingSlice";
import { Data } from "@/app/onboarding/onboarding.interfaces";
import ProfileInputs from "@/app/profile/components/profileInputsInfo";

function Name({ data }: { data: Data | undefined }) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;

  const [userInputName, setUserInputName] = useState("");
  function handleChangeMyname(e: any) {
    const { value } = e.target;
    setUserInputName(value);
    if (value.length >= 3) {
      dispatch(updateOnboardingInitUsername(value));
      dispatch(updateOnboardingButtonActivation(!null));
    } else {
      dispatch(updateOnboardingButtonActivation(null));
    }
  }

  return (
    <Box className="container">
      <Typography className="title" sx={{ color: theme.palette.gray["1"] }}>
        {data?.title}
      </Typography>
      <Typography
        className="description"
        sx={{ color: theme.palette.gray["2"] }}
      >
        {data?.description}
      </Typography>

      <ProfileInputs
        title="نام"
        onChangeInput={handleChangeMyname}
        placeholderCaption="نام شما"
        inputValue={userInputName}
      />
    </Box>
  );
}

export default Name;
