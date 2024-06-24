"use client";

import React, { Key, useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import TipItem from "./components/tipItem";

import "./styles.scss";

function Tip() {
  const dispatch = useDispatch();

  const pathname = usePathname().split("/");
  const cachedSessionData = queryClient.getQueryData([
    "session",
    Number(pathname[2]),
  ]) as any;

  useEffect(() => {
    dispatch(triggerViewType("continueAsTip"));
  }, []);

  const contentBody = cachedSessionData?.tips[0]?.data?.content_body;

  return (
    <Box display="flex" bgcolor="background.main" className="tips-wrapper">
      <div className="container-without-padding">
        <div id="tip-contents">
          <div className="tip-items" id="main-pages-screenshot">
            {contentBody?.map((item: Contentbody, key: Key) => {
              return <TipItem data={item} key={key} />;
            })}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Tip;
