import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setOpenReportBottomSheet,
  handleGetReportCategoryTitle,
  handleOpentReportSpecialContentBottomSheet,
  updateGetElementIdForReportScreenShot,
  updateFlagIconWhichOpensReportBottomSheet,
  handleGetReportCategoryType,
} from "@/providers/Redux/general/generalSlice";
import Sheet from "react-modal-sheet";
import { Box, Typography, Button, useTheme } from "@mui/material";
import CommonBottomSheetHeader from "../commonBottomSheetHeader";
import Icon from "../icon";
import { usePathname } from "next/navigation";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { InitialData } from "@/app/setting/initialData.interfaces";
import "./style.scss";

function ReportBottomSheet() {
  const pathname = usePathname();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { openReportBottomSheet, flagIconWhichOpensReportBottomSheet } =
    useSelector((state: any) => state.general);
  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);

  let reportTitles: Array<string> = [];

  if (
    pathname.split("/")[1] === "session" &&
    flagIconWhichOpensReportBottomSheet === false &&
    openReportBottomSheet
  ) {
    for (
      let i = 0;
      i < userInitialData?.report_problem_data?.data?.length;
      i++
    ) {
      const element = userInitialData?.report_problem_data?.data[i];
      if (element?.type === "tip") {
        reportTitles.push(element.title);
        dispatch(handleGetReportCategoryType(element.type));
      }
    }
  } else if (pathname.split("/")[1] === "profile" && openReportBottomSheet) {
    for (
      let i = 0;
      i < userInitialData?.report_problem_data?.data?.length;
      i++
    ) {
      const element = userInitialData?.report_problem_data?.data[i];
      if (element?.type === "person") {
        reportTitles.push(element.title);
        dispatch(handleGetReportCategoryType(element.type));
      }
    }
  } else if (
    pathname.split("/")[1] === "session" &&
    flagIconWhichOpensReportBottomSheet === true &&
    openReportBottomSheet
  ) {
    for (
      let i = 0;
      i < userInitialData?.report_problem_data?.data?.length;
      i++
    ) {
      const element = userInitialData?.report_problem_data?.data[i];
      if (element?.type === "question") {
        reportTitles.push(element.title);
        dispatch(handleGetReportCategoryType(element.type));
      }
    }
  }

  function reportingTheInappropriateContent(reportTitle: string) {
    dispatch(setOpenReportBottomSheet(false));
    dispatch(handleOpentReportSpecialContentBottomSheet(true));
    dispatch(handleGetReportCategoryTitle(reportTitle));
    if (flagIconWhichOpensReportBottomSheet === false) {
      dispatch(updateGetElementIdForReportScreenShot("main-pages-screenshot"));
    } else {
      dispatch(
        updateGetElementIdForReportScreenShot("only-question-screenshot")
      );
    }
  }

  return (
    <Sheet
      onClose={() => {
        dispatch(updateFlagIconWhichOpensReportBottomSheet(false));
        dispatch(setOpenReportBottomSheet(false));
        dispatch(updateGetElementIdForReportScreenShot(""));
      }}
      isOpen={openReportBottomSheet}
      className="report-part-bottomsheet"
      detent="full-height"
    >
      <Sheet.Container>
        <Sheet.Header>
          <CommonBottomSheetHeader title="گزارش" />
        </Sheet.Header>
        <Sheet.Content>
          <Box sx={{ backgroundColor: "background.main", height: "100%" }}>
            <Typography
              className="main-title"
              sx={{
                color: `${theme.palette.gray["1"]} !important`,
                borderColor: `${theme.palette.border.main} !important`,
              }}
            >
              {pathname.split("/")[1] === "session"
                ? flagIconWhichOpensReportBottomSheet === true
                  ? " چرا می‌خواهید این سوال را گزارش دهید؟"
                  : " چرا می‌خواهید این قسمت را گزارش دهید؟"
                : " چرا می‌خواهید این کاربر را گزارش دهید؟"}
            </Typography>
            <Box className="report-buttons-wrapper">
              {reportTitles.map((reportTitle, index) => {
                return (
                  <Button
                    key={index}
                    sx={{
                      color: `${theme.palette.gray["1"]} !important`,
                      borderColor: `${theme.palette.border.main} !important`,
                      "& svg": {
                        "& path": {
                          fill: theme.palette.icon["2"],
                        },
                      },
                    }}
                    className="report-buttons"
                    onClick={() =>
                      reportingTheInappropriateContent(reportTitle)
                    }
                  >
                    <Icon icon="chevron-left" className="report-icon" />
                    {reportTitle}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => {
          dispatch(updateFlagIconWhichOpensReportBottomSheet(false));
          dispatch(setOpenReportBottomSheet(false));
          dispatch(updateGetElementIdForReportScreenShot(""));
        }}
      />
    </Sheet>
  );
}

export default ReportBottomSheet;
