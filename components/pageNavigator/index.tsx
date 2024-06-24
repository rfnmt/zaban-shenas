import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";

import Icon from "../icon";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { StudentFeedRoot } from "@/models/studentFeed.interface";

import "./styles.scss";

function PageNavigator() {
  const pathname = usePathname();

  const theme = useTheme() as any;

  const isActiveItem = useCallback(
    (route: string) => {
      if (pathname === route) {
        return true;
      }
      return false;
    },
    [pathname]
  );

  const studentFeedData = queryClient.getQueryData<StudentFeedRoot>([
    "student-feed",
  ]);

  const userHasUnreadMessage = useMemo(() => {
    if (studentFeedData) {
      return Boolean(
        studentFeedData?.inbox?.find((item) => item.data.unread === 1)
      );
    }
  }, [studentFeedData]);

  return (
    <>
      <Toolbar
        sx={{
          height: "calc(env(safe-area-inset-bottom) + 64px) !important",
          minHeight: "unset !important",
        }}
      />
      <AppBar
        position="fixed"
        component="nav"
        className="wrap-page-navigator"
        sx={{
          top: "unset",
          bottom: 0,
          borderBottom: `1px solid ${theme.palette.border.main}`,
          background: theme.palette.white.flexible,
          backgroundColor: "white.flexible",
          borderTop: `1px solid ${theme.palette.border.main} !important`,
          ".active": {
            ".MuiTypography-root": {
              color: theme.palette.system.blue,
            },
            path: {
              fill: theme.palette.system.blue,
            },
          },
          ".MuiTypography-root": {
            color: theme.palette.gray[2],
          },
          path: {
            fill: theme.palette.gray[2],
          },
        }}
      >
        <div className="container-without-padding">
          <Link
            className={`item ${isActiveItem("/") ? "active" : ""}`}
            href={"/"}
          >
            <Icon icon="home" width={20} height={20} />
            <Typography>خانه</Typography>
          </Link>
          {/* <Link
            className={`item ${isActiveItem("/profile") ? "active" : ""}`}
            href={"/profile"}
          >
            <Icon icon="challenge" width={20} height={20} />
            <Typography>چالش‌ها</Typography>
          </Link>
          <Link
            className={`item ${isActiveItem("/profile") ? "active" : ""}`}
            href={"/profile"}
          >
            <Icon icon="leaderboard" width={20} height={20} />
            <Typography>لیگ</Typography>
          </Link>
          <Link
            className={`item ${isActiveItem("/profile") ? "active" : ""}`}
            href={"/profile"}
          >
            <Icon icon="notifications" width={20} height={20} />
            <Typography>اعلانات</Typography>
          </Link> */}
          <Link
            className={`item ${isActiveItem("/profile") ? "active" : ""}`}
            href={"/profile"}
          >
            <Icon icon="user" width={20} height={20} />
            <Typography>پروفایل</Typography>
          </Link>
          <Link
            className={`item ${isActiveItem("/notifications") ? "active" : ""}`}
            href={"/notifications"}
          >
            <Icon icon="notifications" width={24} height={24} />
            <Typography>
              {userHasUnreadMessage ? <span className="red-bullet" /> : ""}
              اعلانات
            </Typography>
          </Link>
          {/* <Link
            className={`item ${isActiveItem("/setting") ? "active" : ""}`}
            href={"/setting"}
          >
            <Icon icon="settingsIcon" width={24} height={24} />
            <Typography>تنظیمات</Typography>
          </Link> */}
        </div>
      </AppBar>
    </>
  );
}

export default PageNavigator;
