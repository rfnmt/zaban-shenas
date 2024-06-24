import React, { MouseEventHandler } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../icon";
import {
  handleOpentReportSpecialContentBottomSheet,
  setOpenReportBottomSheet,
} from "@/providers/Redux/general/generalSlice";
import "./style.scss";
import { usePathname } from "next/navigation";

interface CommonBottomSheetHeaderData {
  title: string;
  submitReportBottomSheet?: MouseEventHandler<HTMLButtonElement>;
  setImages?: (x: any[]) => void;
}

function CommonBottomSheetHeader({
  title,
  submitReportBottomSheet,
  setImages,
}: CommonBottomSheetHeaderData) {
  const pathname = usePathname();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { opentReportSpecialContentBottomSheet } = useSelector(
    (state: any) => state.general
  );
  return (
    <Box
      className="common-header-for-bottom-sheets"
      sx={{ backgroundColor: "background.main" }}
    >
      <Box
        className="header-top-part"
        sx={{
          "&::before": {
            backgroundColor: `${theme.palette.border.main} !important`,
          },
        }}
      />
      <Box
        className="header-bottom-part"
        sx={{
          borderBottomColor: `${theme.palette.border.main} !important`,
        }}
      >
        {opentReportSpecialContentBottomSheet ? (
          <IconButton
            onClick={submitReportBottomSheet}
            className="report-special-content-button"
            sx={{
              marginRight: "auto",
              color: theme.palette.system.blue,
            }}
          >
            ارسال
          </IconButton>
        ) : (
          <></>
        )}

        <Box
          className="title"
          sx={{ color: `${theme.palette.gray["1"]} !important` }}
        >
          {title}
        </Box>
        {opentReportSpecialContentBottomSheet ? (
          <IconButton
            className="report-special-content-button"
            onClick={() => {
              dispatch(handleOpentReportSpecialContentBottomSheet(false));
              setImages?.([]);
              if (
                pathname.split("/")[2] === "report" ||
                pathname.split("/")[1] === ""
              ) {
                return;
              } else if (
                pathname.split("/")[1] === "session" ||
                pathname.split("/")[2] === "suggestedFriends"
              ) {
                dispatch(setOpenReportBottomSheet(true));
              }
            }}
            sx={{
              marginLeft: "auto",
              "& svg": {
                "& path": {
                  fill: `${theme.palette.icon["2"]} !important`,
                },
              },
            }}
          >
            <Icon icon="arrow_back" size="48" />
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default CommonBottomSheetHeader;
