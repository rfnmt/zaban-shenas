import React from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Name from "./name";
import Suggestion from "./suggestion";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootOnboarding } from "../../onboarding.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import "./style.scss";

function CustomPage() {
  const { userOnboardingCurrentPage } = useSelector(
    (state: RootReduxState) => state.onboarding
  );

  const cachedOnboardingData = queryClient.getQueryData<RootOnboarding>([
    "onboarding",
  ]);

  const currentPageData =
    cachedOnboardingData?.data[Number(userOnboardingCurrentPage)];
  const pageSlug = currentPageData?.slug;

  function showSpecificChild() {
    switch (pageSlug) {
      case "name":
        return <Name data={currentPageData} />;
      case "suggestion":
        return <Suggestion data={currentPageData} />;

      default:
        break;
    }
  }

  return (
    <Box
      className="onboarding-customPage-part"
      sx={{
        paddingTop: currentPageData?.slug === "suggestion" ? 0 : "14px",
      }}
    >
      {showSpecificChild()}
    </Box>
  );
}

export default CustomPage;
