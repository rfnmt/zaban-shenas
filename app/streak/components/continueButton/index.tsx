import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useDailyChallenges } from "@/components/spalashScreen/hook/useDailyChallenges";
import { updateMostShowStreakPage } from "@/providers/Redux/streak/streakSlice";
import { nextPageAfterCurrentPage } from "@/modules/navigationToNextPageAfterCompleteSession";
import Z3DButton from "@/components/Z3DButton";

import "./style.scss";
import { IStudentData } from "@/models/studentData.interfaces";

function ContinueButton() {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    return () => {};
  }, [router]);

  const cachedDailyChallengeData = queryClient.getQueryData(["user-challenge"]);

  useEffect(() => {
    if (!cachedDailyChallengeData) getDailyChallenges();
    return () => {};
  }, []);

  const { mutate: getDailyChallenges } = useDailyChallenges();

  function navigationToNextPage() {
    dispatch(updateMostShowStreakPage(false));

    nextPageAfterCurrentPage("streak").then(function (nextPage) {
      router.push(nextPage);
    });
  }

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/daily-challenge");
    router.prefetch("/streak/what-is-streak");
    return () => {};
  }, [router]);

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const studentCurrentStreak =
    studentData?.attributes?.data?.find(
      (item) => item?.name === "current_streak"
    )?.value || 0;

  const studentlongestStreak =
    studentData?.attributes?.data?.find(
      (item) => item?.name === "longest_streak"
    )?.value || 0;

  return (
    <Box className="streak-button-wrapper">
      <Box className="what-is-chain">
        {Number(studentCurrentStreak) <= 1 &&
        Number(studentlongestStreak) <= 1 ? (
          <>
            <Z3DButton onClick={() => router.push("/streak/what-is-streak")}>
              زنجیره چیه؟
            </Z3DButton>
            <Button
              className="continue"
              onClick={navigationToNextPage}
              sx={{ color: theme.palette.system.blue }}
            >
              ادامه
            </Button>
          </>
        ) : (
          <Button
            className="continue"
            onClick={navigationToNextPage}
            sx={{
              width: "100% !important",
              height: "48px",
              color: "#FFF",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.main" },
              "&:focus": { backgroundColor: "primary.dark" },
            }}
          >
            ادامه
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ContinueButton;
