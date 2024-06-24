import React, { useMemo } from "react";
import { Box, IconButton, Popover, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@/components/icon";
import {
  setOpenReportBottomSheet,
  updateGetElementIdForReportScreenShot,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";
import ReportBottomSheet from "@/components/reportBottomsheet";
import { usePathname } from "next/navigation";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { SessionRoot } from "@/app/session/[id]/sessions.interfaces";

function WithBackAndMoreIcon() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const pathname = usePathname();

  function handleOpenPopover(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const sessionID = Number(usePathname().split("/")[2]);
  const sessionData = queryClient.getQueryData<SessionRoot>([
    "session",
    sessionID,
  ]);

  const sessionType = useMemo(() => {
    return sessionData?.sessions[0]?.data?.type || "default";
  }, []);

  function handleOpenReportBottomSheet() {
    dispatch(setOpenReportBottomSheet(true));
    if (sessionType === "tip") {
      const tipID = sessionData?.tips ? sessionData?.tips[0]?.id : null;

      if (tipID) dispatch(updateGetSpecialIdForReport(tipID));
    } else {
      const qustionHasTip =
        allQuestion[currentQuestionIndex]?.data?.related_tip;
      dispatch(updateGetSpecialIdForReport(qustionHasTip));
    }

    dispatch(updateGetElementIdForReportScreenShot("main-pages-screenshot"));
    handleClose();
  }

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          marginRight: "auto",
          "& svg": {
            "& path": {
              fill: `${theme.palette.icon["2"]} !important`,
            },
          },
        }}
      >
        <Icon icon="vertical-dots" size="48" />
      </IconButton>

      <Popover
        disableScrollLock
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className="navigate-to-back-popover"
        sx={{
          "& .MuiPaper-root": {
            borderColor: `${theme.palette.border.main} !important`,
            backgroundColor: "white.flexible",
          },
        }}
      >
        <Box
          className="text-icon-wrapper"
          onClick={handleOpenReportBottomSheet}
        >
          <Typography sx={{ color: theme.palette.gray["1"] }}>
            {pathname.split("/")[2] === "suggestedFriends"
              ? "گزارش کاربر"
              : "گزارش"}
          </Typography>
          <Icon icon="flag" color={"red"} />
        </Box>
      </Popover>

      {/* <ReportBottomSheet /> */}
    </>
  );
}

export default WithBackAndMoreIcon;
