import React, { useMemo } from "react";
import Image from "next/image";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Box, IconButton, Typography } from "@mui/material";

import { Feeds, StudentFeedRoot } from "@/models/studentFeed.interface";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import {
  APP_VERSION,
  NEXT_PUBLIC_CRISP_URL,
  NEXT_PUBLIC_CRISP_WEBSITE_ID,
} from "@/env";
import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";
import { remainingFullDate } from "@/modules/helper";

function Item({ data }: { data: Feeds }) {
  dayjs.extend(duration);

  const studentFeedData = queryClient.getQueryData<StudentFeedRoot>([
    "student-feed",
  ]);

  const findInboxData = studentFeedData?.inbox.find(
    (item) => item.data.id === data.data.activity_id
  );

  const avatarData = useMemo(() => {
    if (studentFeedData) {
      return studentFeedData.students.find(
        (item) => item.id === findInboxData?.data.contact_id
      );
    }
  }, [findInboxData]);

  const date = remainingFullDate(data.data.updated_at);

  const { email, phone, id } = useSelector(
    (state: RootReduxState) => state.user
  );

  function goToChat() {
    if (findInboxData?.data.type === "consult") {
      let url = `https://api-academy.s1.zabanshenas.com/api/resources/viewMessageFrontend/?inbox_id=${findInboxData?.data.id}&student_id=${id}&app_version=${APP_VERSION}&platform=pwa&app_name=zabanamooz`;
      window.open(url);
    } else {
      let url = `${NEXT_PUBLIC_CRISP_URL}?website_id=${NEXT_PUBLIC_CRISP_WEBSITE_ID}&app_version=${APP_VERSION}&platform=pwa&app_name=zabanamooz&crisp_sid=${findInboxData?.data.source_id}`;
      if (email) url += `&email=${email}`;
      if (phone) url += `&phone=${phone}`;
      window.open(url);
    }
  }

  return (
    <Box
      onClick={goToChat}
      sx={{
        backgroundColor:
          findInboxData?.data.unread === 1 ? "primary.min" : "transparent",
        "&.inbox-item": {
          borderBottomColor: (theme) =>
            `${theme.palette.border.main} !important`,
        },
      }}
      className={`inbox-item ${
        findInboxData?.data.unread === 1 ? "unread" : ""
      } `}
      key={data.id}
    >
      <div className="avatar">
        <Image
          src={avatarData?.data.profile_pic || ""}
          width={48}
          height={48}
          alt={avatarData?.data.name || ""}
        />
      </div>
      <div className="detail">
        <Typography className="name" sx={{ color: "gray.1" }}>
          {findInboxData?.data.type === "support"
            ? "ادمین از پشتیبانی"
            : avatarData?.data.name}{" "}
          :
        </Typography>{" "}
        <Typography className="summary" sx={{ color: "gray.2" }}>
          {findInboxData?.data.summary}
        </Typography>
        <Typography className="date" sx={{ color: "gray.2" }}>
          {date} پیش
        </Typography>
      </div>
      <IconButton onClick={goToChat}>
        <Icon icon="chevron-left" size={40} />
      </IconButton>
    </Box>
  );
}

export default Item;
