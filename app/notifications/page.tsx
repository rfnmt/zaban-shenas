"use client";

import React, { useEffect, useMemo } from "react";
import { Typography } from "@mui/material";

import { useStudentFeed } from "./hook/useStudentFeed";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { StudentFeedRoot } from "@/models/studentFeed.interface";
import Item from "./components/item";

import * as zeroNotification from "@/public/lottie-files/zero-notification.json";
import Lottie from "react-lottie-player";

function NotificationsPage() {
  const studentFeedData = queryClient.getQueryData<StudentFeedRoot>([
    "student-feed",
  ]);

  const sortStudentFeed = useMemo(() => {
    if (studentFeedData?.feed.length) {
      return studentFeedData.feed.sort(
        (a, b) => new Date(b.data.updated_at) - new Date(a.data.updated_at)
      );
    }
    return [];
  }, [studentFeedData]);

  const { refetch: getStudentFeed } = useStudentFeed();

  useEffect(() => {
    if (!studentFeedData) getStudentFeed();

    return () => {};
  }, [studentFeedData]);

  return (
    <div className="container-without-padding inbox-list">
      {sortStudentFeed?.length ? (
        sortStudentFeed?.map((item) => {
          return <Item data={item} />;
        })
      ) : (
        <section className="zero-notification">
          <Lottie play loop={false} animationData={zeroNotification} />
          <Typography className="title" sx={{ color: "gray.1" }}>
            در حال حاضر اعلانی ندارید
          </Typography>
          <Typography className="subtitle" sx={{ color: "gray.3" }}>
            پیام از پشتیبانی، دنبال کننده، دنبال شونده و دستاوردهای خودتان و
            دوستانتان در این قسمت به شما نشان داده می‌شود.
          </Typography>
        </section>
      )}
    </div>
  );
}

export default NotificationsPage;
