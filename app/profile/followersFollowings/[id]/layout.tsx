"use client";
import React, { useEffect } from "react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { Box } from "@mui/material";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Content from "./page";
import { usePathname } from "next/navigation";
import { useSpecificStudentsAPI } from "../../hook";
import "./style.scss";
import { SuggestFreindRootData } from "../../suggestedFriends/interfaces";

function FollowersFollowingLayout() {
  const pathName = usePathname();
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    Number(pathName.split("/")[3]),
  ]);
  const { mutate: getSpecificStudentData } = useSpecificStudentsAPI();

  useEffect(() => {
    if (!getSingleStudentData && Number(pathName.split("/")[3])) {
      getSpecificStudentData(Number(pathName.split("/")[3]));
    }
  }, [getSingleStudentData, Number(pathName.split("/")[3])]);

  return (
    <Box
      bgcolor="background.main"
      className="followersFollowingLayout container"
    >
      <NavigateToBack
        title={
          getSingleStudentData?.profile_data?.data?.name
            ? `دوستان ${getSingleStudentData?.profile_data?.data?.name}`
            : "دوستان کاربر"
        }
        type="withBackButton"
      />
      <Box component="main">
        <Content />
      </Box>
    </Box>
  );
}

export default FollowersFollowingLayout;
