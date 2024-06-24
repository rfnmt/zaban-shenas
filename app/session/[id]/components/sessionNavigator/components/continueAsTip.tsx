import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { useDetectScrolledToBottom } from "../../../hook/useDetectScrolledToBottom";
import { updateSessionTable } from "../helpers/updateSessionTable";
import { updateLessonTable } from "../helpers/updateLessonTable";
import { updateCourseTable } from "../helpers/updateCourseTable";
import { updateExperiences } from "../helpers/updateExperiences";

function ContinueAsTip() {
  const router = useRouter();
  const { buttonEnable } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  useDetectScrolledToBottom();

  return (
    <Button
      onClick={async () => {
        await updateSessionTable();
        await updateLessonTable();
        await updateCourseTable();
        await updateExperiences();

        router.push("/");
      }}
      variant="contained"
      className="user-action"
      disabled={!buttonEnable}
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

export default ContinueAsTip;
