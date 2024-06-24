import React from "react";
import { Button, useTheme } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { Level } from "@/app/onboarding/onboarding.interfaces";
import {
  updateGoVocabExaminationId,
  updatePlacementSessionOfCourseId,
  updateOnboardingButtonActivation,
} from "@/providers/Redux/onboarding/onboardingSlice";
import { RootReduxState } from "@/providers/Redux/store";

function Levels({ data }: { data: Level }) {
  const dispatch = useDispatch();
  const theme = useTheme() as any;

  const { onboardingButtonActivation } = useSelector(
    (state: RootReduxState) => state.onboarding
  );

  function selectLevel() {
    if (data?.course) {
      dispatch(updateOnboardingButtonActivation(data.id));
      dispatch(updatePlacementSessionOfCourseId(data.course));
      dispatch(updateGoVocabExaminationId(null));
    } else {
      dispatch(updatePlacementSessionOfCourseId(null));
      dispatch(updateGoVocabExaminationId(data.self_evaluation));
      dispatch(updateOnboardingButtonActivation(data.id));
    }
  }

  return (
    <Button
      key={data.id}
      onClick={selectLevel}
      sx={{
        color: theme.palette.gray["1"],
        backgroundColor: theme.palette.white.flexible,
        "&:hover": {
          backgroundColor: theme.palette.white.flexible,
        },

        border:
          onboardingButtonActivation === data.id
            ? `2px solid ${theme.palette.system.blue}`
            : "2px solid transparent !important",
      }}
    >
      {data?.image && <Image src={data?.image} width={50} height={50} alt="" />}
      {data?.title}
    </Button>
  );
}

export default Levels;
