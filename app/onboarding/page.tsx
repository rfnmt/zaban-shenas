"use client";
import React, { useRef, Key, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { APP_NODE_ENV } from "@/env";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { Data, RootOnboarding } from "./onboarding.interfaces";
import Question from "./components/question";
import Placement from "./components/placement";
import CustomPage from "./components/customPage";
import {
  updateOnboardingInitUsername,
  updateOnboardingMainAndChoiceSlug,
  updateOnboardingButtonActivation,
  updateUserOnboardingCurrentPage,
} from "@/providers/Redux/onboarding/onboardingSlice";
import { RootReduxState } from "@/providers/Redux/store";
import {
  AppBar,
  Box,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Icon from "@/components/icon";
import BackModalToSignup from "./components/backModalToSignup";
import Z3DButton from "@/components/Z3DButton";
import { onboardingSendAnswer } from "./api";
import Lottie from "react-lottie-player";
import * as threeDotslottieAnimation from "@/public/lottie-files/3Dots.json";
import { useRouter } from "next/navigation";
import { getMyProfileDataApi } from "../profile/api";
import { mutateVocabExamination } from "./components/placement/hook/mutateSelfEvaluationToVocabExamination";
import {
  resetLoading,
  updateLoadingStates,
} from "@/providers/Redux/loading/loadingSlice";

import { goToFirstSessionBelongCourseID } from "./helpers";
import {
  updateSessionBelongVocabExamination,
  updateUserCanSeeSession,
} from "@/providers/Redux/lesson/session/sessionSlice";
import { updateNeedOnboarding } from "@/providers/Redux/user/userSlice";

type ProgressbarFunction = () => number | undefined;
function OnboardingPage() {
  const router = useRouter();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const swiperRef = useRef() as any;
  const {
    userOnboardingCurrentPage,
    onboardingButtonActivation,
    onboardingMainAndChoiceSlug,
    placementSessionOfCourseId,
    goVocabExaminationId,
    onboardingInitUsername,
  } = useSelector((state: RootReduxState) => state.onboarding);
  const cachedOnboardingData = queryClient.getQueryData<RootOnboarding>([
    "onboarding",
  ]);

  const hasBack = !Boolean(
    cachedOnboardingData?.data[Number(userOnboardingCurrentPage)]
      ?.content_type === "onboarding-custom-page"
  );

  const hideProgressBar = Boolean(
    cachedOnboardingData?.data[Number(userOnboardingCurrentPage)]?.slug ===
      "suggestion"
  );

  const [loading, setLoading] = useState(false);

  function showSpecificChild(item: Data, index: number) {
    switch (item?.content_type) {
      case "question":
        return <Question data={item} />;
      case "placement":
        return <Placement data={item} />;
      case "onboarding-custom-page":
        return <CustomPage />;
      default:
        break;
    }
  }

  function doActionAfterChangeSwiperIndex() {
    dispatch(updateOnboardingButtonActivation(null));
    localStorage.setItem(
      "userOnboardingCurrentPage",
      String(swiperRef?.current?.swiper?.realIndex)
    );

    dispatch(
      updateUserOnboardingCurrentPage(swiperRef?.current?.swiper?.realIndex)
    );
  }

  function swiperInitialAction() {
    swiperRef?.current?.swiper?.slideTo(Number(userOnboardingCurrentPage));
  }

  const [visibleDialog, setvisibleDialog] = useState(false);
  function backToPreviousSlide() {
    if (swiperRef?.current?.swiper?.realIndex === 0) {
      // console.log("dont back");
      setvisibleDialog(true);
    } else {
      dispatch(updateOnboardingButtonActivation(null));
      swiperRef?.current?.swiper?.slideTo(
        swiperRef?.current?.swiper?.realIndex - 1
      );
    }
  }

  const { mutate: sendSelfEvaluation, isSuccess: isSuccessSendSelfEvaluation } =
    mutateVocabExamination();

  async function handlingSwiperAndSendAnswer() {
    if (
      Number(userOnboardingCurrentPage) + 1 ===
      cachedOnboardingData?.data?.length
    ) {
      localStorage.setItem("needOnboarding", String(false));
      localStorage.setItem("userOnboardingCurrentPage", String(0));

      dispatch(updateNeedOnboarding(false));
      router.push("/");
    } else if (
      cachedOnboardingData?.data[Number(userOnboardingCurrentPage)]
        .content_type === "question"
    ) {
      setLoading(true);
      onboardingSendAnswer({
        answer_slugs: [onboardingMainAndChoiceSlug.choiceSlug],
        question_slug: onboardingMainAndChoiceSlug.mainSlug,
      })
        .then((res) => {
          setLoading(false);
          dispatch(
            updateOnboardingMainAndChoiceSlug({
              choiceSlug: "",
              mainSlug: "",
            })
          );
          swiperRef?.current?.swiper?.slideTo(
            swiperRef?.current?.swiper?.realIndex + 1
          );
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else if (
      cachedOnboardingData?.data[Number(userOnboardingCurrentPage)]
        .content_type === "placement"
    ) {
      if (placementSessionOfCourseId !== null) {
        // if (placementSessionOfCourseId) {
        dispatch(
          updateLoadingStates({
            config: {
              visible: true,
              lottieType: "waiting.json",
              subtitle: "لطفا شکیبا باشید...",
              titleBeforeLottie: "درحال آماده‌سازی اولین درس برای شما..",
            },
          })
        );

        goToFirstSessionBelongCourseID(placementSessionOfCourseId)
          .then(function (sessionId) {
            if (sessionId) {
              router.push(`/session/${sessionId}`);
              dispatch(updateUserCanSeeSession(true));
            }
          })
          .finally(() => dispatch(resetLoading()));
        // }
      } else if (goVocabExaminationId !== null) {
        dispatch(
          updateLoadingStates({
            config: {
              lottieWidth: 200,
              lottieHeight: 200,
              visible: true,
              lottieType: "loading.json",
              subtitle: "لطفا شکیبا باشید...",
              title: "درحال آماده‌سازی سوالات شما..",
            },
          })
        );
        sendSelfEvaluation({
          vocab_estimate_self_evaluation: goVocabExaminationId,
        });
      }
    } else if (
      cachedOnboardingData?.data[Number(userOnboardingCurrentPage)]
        .content_type === "onboarding-custom-page"
    ) {
      if (
        cachedOnboardingData?.data[Number(userOnboardingCurrentPage)].slug ===
        "name"
      ) {
        if (onboardingInitUsername?.length >= 3) {
          setLoading(true);
          getMyProfileDataApi({
            updated_data: {
              name: onboardingInitUsername,
            },
          })
            .then(() => {
              setLoading(false);
              dispatch(updateOnboardingInitUsername(null));
              swiperRef?.current?.swiper?.slideTo(
                swiperRef?.current?.swiper?.realIndex + 1
              );
              dispatch(updateOnboardingButtonActivation(!null));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        // کاربر هدایت بشه به صفحه ی ای که براش تعیین شده
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }

  useEffect(() => {
    if (isSuccessSendSelfEvaluation) {
      dispatch(updateSessionBelongVocabExamination(true));
      router.push(`session/vocab-examination`);
    }
  }, [isSuccessSendSelfEvaluation]);

  useEffect(() => {
    router.prefetch("session/vocab-examination");
    router.prefetch("/");
  }, [router]);

  const progressBar: ProgressbarFunction = function () {
    const lengthOfProgressBar = cachedOnboardingData?.data?.filter(
      (item: any) => item?.slug !== "suggestion"
    );
    return lengthOfProgressBar?.length;
  };

  return (
    <>
      {hideProgressBar ? (
        <></>
      ) : (
        <AppBar
          component="nav"
          className="navigate-to-back"
          sx={{
            boxShadow: "unset",
            color: `${theme.palette.gray["1"]} !important`,
            backgroundColor: "white.flexible",
            borderBottom: `1px solid ${theme.palette.border.main} !important`,
          }}
        >
          <LinearProgress
            className=""
            variant="determinate"
            sx={{
              position: "fixed",
              backgroundColor: theme.palette.border.main,
              height: "8px",
              "& span": {
                backgroundColor: theme.palette.success.main,
              },
              transform: "translateX(-50%) rotate3d(0, 0, 1, 180deg)",
              zIndex: "10",
              width: "100%",
              left: "50%",
            }}
            value={
              ((Number(userOnboardingCurrentPage) + 1) * 100) / progressBar()
            }
          />

          <Toolbar className="navigator-content container">
            <Box />
            <Typography
              sx={{ color: theme.palette.gray["1"], direction: "rtl" }}
            >
              {cachedOnboardingData?.data?.map((item, index: Key) => {
                return Number(userOnboardingCurrentPage) === index
                  ? item.header
                  : "";
              })}
            </Typography>
            {hasBack ? (
              <IconButton
                onClick={backToPreviousSlide}
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
              <Box />
            )}
          </Toolbar>
        </AppBar>
      )}
      <Box className="onBoarding-swiper-wrapper">
        <Swiper
          dir="rtl"
          ref={swiperRef}
          className="onboargin-items"
          onInit={swiperInitialAction}
          onRealIndexChange={doActionAfterChangeSwiperIndex}
          allowTouchMove={APP_NODE_ENV === "production" ? false : true}
          keyboard={{
            enabled: APP_NODE_ENV === "production" ? false : true,
          }}
        >
          {cachedOnboardingData?.data?.map((item, index: Key) => {
            return (
              <SwiperSlide key={index}>
                {item.slug === "suggestion" ? (
                  <></>
                ) : (
                  <Toolbar
                    className="before-progress-space"
                    sx={{ height: "65px" }}
                  />
                )}
                {showSpecificChild(item, Number(index))}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box className="onboarding-nextPage container">
          <Z3DButton
            disabled={onboardingButtonActivation === null ? true : false}
            color={
              onboardingButtonActivation === null
                ? `${theme.palette.gray[3]} !important`
                : `${theme.palette.white.fix} !important`
            }
            background={
              onboardingButtonActivation === null
                ? `${theme.palette.disable.main} !important`
                : `${theme.palette.primary.main} !important`
            }
            onClick={handlingSwiperAndSendAnswer}
          >
            {loading ? (
              <Lottie
                className="threeDots-animation"
                play={true}
                loop={true}
                animationData={threeDotslottieAnimation}
              />
            ) : (
              cachedOnboardingData?.data?.map((item, index: Key) => {
                return (
                  Number(userOnboardingCurrentPage) === index &&
                  (item?.continue_button_label || "ادامه")
                );
              })
            )}
          </Z3DButton>
        </Box>
      </Box>
      <BackModalToSignup
        visibleDialog={visibleDialog}
        setvisibleDialog={setvisibleDialog}
      />
    </>
  );
}

export default OnboardingPage;
