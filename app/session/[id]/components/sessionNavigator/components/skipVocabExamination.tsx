import React, { useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { skipQuestion } from "../helpers/skippQuestion";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import {
  setOpenReportBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";
import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";

function SkipVocabExamination() {
  const dispatch = useDispatch();

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const theme = useTheme() as any;
  const dark = theme.palette.accent1.dark;
  const accent = theme.palette.accent1.main;

  return (
    <>
      <div className="feedback">
        <Box
          className="feedback-title"
          sx={{ "& .flag-icon path": { fill: dark } }}
        >
          <Icon
            width={24}
            height={24}
            icon="flag"
            className="flag-icon"
            onClick={() => {
              dispatch(setOpenReportBottomSheet(true));
              dispatch(updateFlagIconWhichOpensReportBottomSheet(true));
              dispatch(
                updateGetSpecialIdForReport(
                  allQuestion[currentQuestionIndex]?.data.id
                )
              );
            }}
          />
          <Typography sx={{ color: dark }}>
            جواب ندادی، بیا بریم بعدی
          </Typography>
          <Icon width={24} height={24} icon="warning" />
        </Box>
        <div className="feedback-description">
          {allQuestion[currentQuestionIndex]?.data?.explanation && (
            <>
              <Typography sx={{ color: "gray.3" }}>:معنی</Typography>
              <SimpleProcessingText
                data={allQuestion[currentQuestionIndex]?.data?.explanation}
              />
            </>
          )}
        </div>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          skipQuestion("vocabExamination");
          // agh commented
          // dispatch(triggerViewType("verifyNow"));
        }}
        className="user-action"
        sx={{
          backgroundColor: accent,
          "&:hover": { backgroundColor: accent },
        }}
      >
        ادامه
      </Button>
    </>
  );
}

export default SkipVocabExamination;
