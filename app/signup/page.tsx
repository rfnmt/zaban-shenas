"use client";

import { Box, Typography, useTheme } from "@mui/material";
import _dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { mobileModel, osName } from "react-device-detect";

import GoogleButton from "./components/google";
import { signupByOTP, verifyOTP } from "@/app/signup/api";
import { useGoogleSignup } from "./hook";
import { updateUserData } from "../../providers/Redux/user/userSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createCookie } from "@/modules/helper";

//.export const dynamic = "force-dynamic";
import SignupForm from "./components/form";
import VerifyCode from "./components/verifyCode";
import SeperatorLine from "@/components/seperatorLine";
import LottieLoading from "@/components/lottieLoading";
import { setFetchSyncRequestStatus } from "@/providers/Redux/general/generalSlice";
import { updateProccessingSessionStates } from "@/providers/Redux/home/homeSlice";
import { GOOGLE_AUTH_PROVIDER_CLIENT_ID } from "@/env";

interface InterState {
  step: number;
  loading: boolean;
  phone: string;
  remaining_sec: number;
  disabled: boolean;
  codeError: string;
}

function SignUp() {
  const theme = useTheme() as any;
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState<InterState>({
    step: 1,
    loading: false,
    phone: "",
    remaining_sec: 0,
    disabled: true,
    codeError: "",
  });

  function goStepOne() {
    // here codeError will erease the codeError for verifyOTP component
    setState((prev: any) => ({ ...prev, step: 1, codeError: "" }));
  }

  function sendOTP(userNumber: string) {
    setState((prev: any) => ({
      ...prev,
      loading: true,
    }));

    signupByOTP({
      uid: userNumber,
    })
      .then(function (response) {
        setState((prev: any) => ({
          ...prev,
          phone: userNumber,
          loading: false,
          step: 2,
          remaining_sec: response.data.remaining_seconds,
        }));
      })
      .catch((err) => {
        setState((prev: any) => ({
          ...prev,
          loading: false,
          codeError: "مشکلی پیش امده است. دوباره تلاش کنید",
        }));
      });
  }

  const {
    mutate: signupGoogle,
    isPending,
    data: googleResponseData,
  } = useGoogleSignup();

  const signupWithGoogle = (response: any) => {
    signupGoogle({
      data: { token: response.credential },
      headers: {
        fcm_token: "",
        huawei_token: "",
        manufacturer: "",
        model: mobileModel === "none" ? "" : mobileModel,
        carrier: "",
        operating_system: osName,
      },
    });
  };

  useEffect(() => {
    if (googleResponseData) {
      userMostBeLogin(googleResponseData);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleResponseData]);

  function userMostBeLogin(data: any) {
    const userData = data.data.profile_data;
    const needOnboarding = data.data.need_onboarding;

    if (userData.data) {
      const { username, phone, name, email, id } = userData.data;
      if (username) localStorage.setItem("username", username);
      if (id) localStorage.setItem("id", id);
      if (email) localStorage.setItem("email", email);
      if (phone) localStorage.setItem("phone", phone);
      if (name) localStorage.setItem("name", name);

      localStorage.setItem("needOnboarding", needOnboarding);

      if (data?.data?.token) {
        createCookie("token", data?.data?.token || "", 10000);
        localStorage.setItem("token", data?.data?.token || "");
      }

      dispatch(
        updateUserData({
          email,
          name,
          username,
          id,
          phone,
          token: data.data.token,
          needOnboarding,
        })
      );
      setState((prev: any) => ({ ...prev, loading: false }));
    }

    axios.defaults.headers.common["Authorization"] = data.data.token;
    dispatch(setFetchSyncRequestStatus("waiting"));
    dispatch(updateProccessingSessionStates("waiting"));
    if (data.data.need_onboarding) router.push("/onboarding");
    else router.push("/");
  }

  function handleSendOTPCode(code: string) {
    setState((prev: any) => ({ ...prev, loading: true }));
    verifyOTP({
      huawei_token: "xxxxxxxx",
      fcm_token: "xxxxxxxx",
      otp: code,
      uid: state.phone,
    })
      .then(function (resp) {
        userMostBeLogin(resp);
      })
      .catch((err) => {
        setState((prev: any) => ({ ...prev, loading: false, codeError: err }));
      });
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_PROVIDER_CLIENT_ID}>
      <div style={{ height: "100dvh", position: "relative" }}>
        <LottieLoading open_lottie={isPending || state.loading} />
      </div>
      <Box className="signup-content-view container" bgcolor="background.main">
        {state.step === 1 && (
          <Box bgcolor="background.main" className="signup-content">
            <Typography
              sx={{ color: `${theme.palette.gray["1"]} !important` }}
              className="sign-up-title"
            >
              خوش آمدید
            </Typography>
            <Typography
              className="mobile-title"
              sx={{ color: `${theme.palette.gray["1"]} !important` }}
            >
              لطفا شماره موبایل خود را وارد کنید
            </Typography>

            <SignupForm
              sendOTP={sendOTP}
              phone={state.phone}
              err={state.codeError}
            />

            <SeperatorLine />
            <GoogleButton googleResponse={signupWithGoogle} />
            <Typography
              sx={{ color: `${theme.palette.gray["2"]} !important` }}
              className="agreement"
            >
              با ساختن حساب کاربری قوانین و شرایط استفاده از اپلیکیشن زبان آموز
              را می‌پذیرید
            </Typography>
          </Box>
        )}

        {state.step === 2 && (
          <VerifyCode
            verifyLoading={state.loading}
            length={4}
            goStepOne={goStepOne}
            setCodeError={setState}
            codeError={state.codeError}
            enteredData={state.phone}
            onComplete={(code: string) => handleSendOTPCode(code)}
            remaining_time={state.remaining_sec}
            stateStep={state.step}
          />
        )}
      </Box>
    </GoogleOAuthProvider>
  );
}

export default SignUp;
