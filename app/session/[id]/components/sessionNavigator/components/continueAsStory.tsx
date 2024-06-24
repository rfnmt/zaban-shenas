import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { updateStoryCurrentQuestionIndex } from "@/providers/Redux/lesson/storySlice/storySlice";

function ContinueAsStory() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { storyButtonEnable } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  const { storyCurrentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.story
  );

  return (
    <Button
      onClick={() =>
        dispatch(updateStoryCurrentQuestionIndex(storyCurrentQuestionIndex + 1))
      }
      variant="contained"
      className="user-action"
      disabled={!storyButtonEnable}
      sx={{
        backgroundColor: "secondary.main",
        "&:focus": { backgroundColor: "secondary.main" },
        "&:hover": { backgroundColor: "secondary.main" },
        "&.Mui-disabled": {
          color: "gray.3",
          backgroundColor: "disable.main",
        },
      }}
    >
      ادامه
    </Button>
  );
}

export default ContinueAsStory;
