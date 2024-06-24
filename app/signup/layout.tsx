"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Content from "./page";
import { signOut } from "@/providers/Redux/user/userSlice";
import { clearCache } from "@/modules/helper";
import { closeSyncDatabase } from "@/providers/Dexie";
import LottieLoading from "@/components/lottieLoading";
import { RootReduxState } from "@/providers/Redux/store";

import "./styles.scss";

function SignUpLayout() {
  const dispatch = useDispatch();
  const [intialLoading, setintialLoading] = useState(true);

  useEffect(() => {
    clearCache();

    dispatch(signOut());
    closeSyncDatabase().then(function () {
      setintialLoading(false);
    });

    return () => {};
  }, []);

  return (
    <Box bgcolor="primary.main" className="auth-signup-wrapper">
      {intialLoading ? (
        <div className="signup-intial-loading">
          <LottieLoading open_lottie={true} />
        </div>
      ) : (
        <Content />
      )}
    </Box>
  );
}

export default SignUpLayout;
