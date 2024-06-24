"use client";
import React from "react";

import "./report.scss";
import { Box } from "@mui/material";
import SettingChildsHeader from "@/components/settingComponents/settingChildsHeader";
import SettingChildsComponentSimpleAndSwitch from "../../../components/settingComponents/settingChildsComponentSimpleAndSwitch";
import {
  handleOpentReportSpecialContentBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";
import { useDispatch } from "react-redux";

function ReportPage() {
  const dispatch = useDispatch();
  return (
    <Box className="wrap-report">
      <SettingChildsHeader title="مشکل را گزارش کنید" />
      <Box
        className="setting-childs-component-simple-and-switch-and-checkbox"
        sx={{
          backgroundColor: "white.flexible",
        }}
      >
        <SettingChildsComponentSimpleAndSwitch
          withSwitch={false}
          handleOnClickFunction={() => {
            dispatch(handleOpentReportSpecialContentBottomSheet(true));
            dispatch(updateGetSpecialIdForReport(null));
          }}
          rightTextContent="گزارش مشکل"
        />
      </Box>
    </Box>
  );
}

export default ReportPage;
