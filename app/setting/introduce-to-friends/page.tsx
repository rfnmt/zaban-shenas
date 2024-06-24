"use client";
import React, { useEffect, useRef, useState } from "react";
import { useItroduceToFriends } from "./hook/useIntroduceToFriends";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import "./introduceToFriends.scss";

import Z3DButton from "@/components/Z3DButton";
import Image from "next/image";
import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import { useSelector } from "react-redux";
import CommonSuccessSnackBar from "@/app/profile/components/successSnackbar";

function IntroduceToFriends() {
  const router = useRouter();
  const ref = useRef(null);
  const theme = useTheme() as any;
  const { id } = useSelector((state: RootReduxState) => state.user);
  const { data, refetch, isError, isLoading } = useItroduceToFriends();

  const {
    gem_amount_acquired,
    students_invited_count,
    students_purchased_count,
    affiliate_rewards,
    students,
    pagination,
  } = data?.data || {};

  const mainText =
    "سلام من با زبان آموز آکادمی دارم انگلیسی یاد میگیرم توام اگه میخوای میتونی با لینک زیر ثبت نام کنی";

  const appDownloadUrl = "https://zabanshenas.com/install/";
  const text = `${mainText}`;
  const handleIntroduceToFriends = () => {
    if ("share" in navigator) {
      navigator
        .share({
          title: mainText,
          url: appDownloadUrl,
          text: text,
        })
        .then(() => {})
        .catch(console.error);
    } else {
    }
  };

  const [copyAcademyLink, setCopyAcademyLink] = useState(false);
  function copyLink() {
    navigator.clipboard.writeText(ref.current.innerHTML);
    setCopyAcademyLink(true);
  }
  const closeSnackBar = () => {
    setCopyAcademyLink(false);
  };

  function invitedFriendsList() {
    router.push("/setting/introduce-to-friends/invited-friends-list");
  }
  function getAward() {}

  return (
    <>
      <Box className="wrap-introduce-to-friends">
        <Box className="introduce-header">
          <Box className="icon-wrapper">
            <Icon icon="friends" />
          </Box>
          <Box className="introduce-title">
            <Typography className="title" sx={{ color: "white.fix" }}>
              دوستاتو دعوت کن و الماس جایزه بگیر
            </Typography>

            <Typography className="subTitle" sx={{ color: "white.fix" }}>
              به ازای هر دوستی که اشتراک ویژه‌ی یکساله رو تهیه میکنه، تا ۳۰۰ عدد
              الماس جایزه بگیر
            </Typography>
          </Box>
        </Box>

        <Box
          className="introduce-body"
          sx={{ backgroundColor: "background.main" }}
        >
          <Box className="invitation">
            <Typography className="link-title" sx={{ color: "gray.1" }}>
              لینک دعوت
            </Typography>
            <Box
              className="link-button-wrapper"
              sx={{
                backgroundColor: "white.flexible",
                boxShadow: "0 1px 1px rgba(0,0,0,.16)",
              }}
            >
              <Box
                className="link"
                sx={{
                  boxShadow: "0 1px 1px rgba(0,0,0,.16)",
                  backgroundColor: "background.main",
                }}
                onClick={copyLink}
              >
                <Box
                  className="wrap-icon"
                  sx={{
                    borderColor: `${theme.palette.border.main} !important`,
                  }}
                >
                  <Icon icon="file_copy" />
                </Box>
                <Typography
                  sx={{ color: "gray.2" }}
                  className="link-address"
                  id="link-address"
                  ref={ref}
                >
                  https://a.zapp.ir/{id}
                </Typography>
              </Box>
              <Z3DButton onClick={handleIntroduceToFriends}>
                ارسال دعوتنامه
              </Z3DButton>
            </Box>
          </Box>

          <Box className="invited-student">
            <Typography className="link-title" sx={{ color: "gray.1" }}>
              افرادی که دعوت کردی
            </Typography>

            {students?.length !== 0 ? (
              <Box
                className="all-students"
                sx={{
                  boxShadow: "0 1px 1px rgba(0,0,0,.16)",
                  backgroundColor: "white.flexible",
                }}
              >
                <Box className="students" onClick={invitedFriendsList}>
                  {/* {students?.length - 4 === 0 ? (
                    <></>
                  ) : (
                    <Box
                      className="student-info hidden-students"
                      sx={{
                        boxShadow: "0 1px 1px rgba(0,0,0,.16)",
                      }}
                    >
                      <Typography>+ {students?.length - 4}</Typography>
                    </Box>
                  )} */}

                  {students?.slice(0, 4).map((item: any, index: number) => {
                    return (
                      <Box
                        key={index}
                        className="student-info"
                        sx={{
                          boxShadow: "0 1px 1px rgba(0,0,0,.16)",
                          borderColor: `${theme.palette.border.main} !important`,
                          display: "flex",
                          order: -index,
                        }}
                      >
                        {item?.profile_pic ? (
                          <Image
                            src={item?.profile_pic}
                            width={48}
                            height={48}
                            alt={item?.name}
                          />
                        ) : (
                          <Icon
                            icon="without-pic"
                            size={48}
                            className="user-profile-pic"
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
                <Z3DButton onClick={getAward}>
                  دریافت جایزه
                  <Image
                    src="/svg/diamond.svg"
                    width={24}
                    height={24}
                    alt=""
                    className="diamond"
                  />
                </Z3DButton>
              </Box>
            ) : (
              <Box
                className="none-student"
                sx={{
                  color: "gray.2",
                  boxShadow: "0 1px 1px rgba(0,0,0,.16)",
                  backgroundColor: "white.flexible",
                }}
              >
                فعلا دوستی رو به زبان آموز دعوت نکردی. دوستاتو دعوت کن و جایزه
                بگیر
              </Box>
            )}
          </Box>

          <Box className="statistics-wrapper">
            <Typography className="link-title" sx={{ color: "gray.1" }}>
              آمار
            </Typography>
            <Box
              sx={{
                boxShadow: "0 1px 1px rgba(0,0,0,.16)",
                backgroundColor: "white.flexible",
                padding: "16px",
                borderRadius: "10px",
              }}
            >
              <Box className="statistic" sx={{ color: "gray.1" }}>
                <Box className="total-count">
                  <Icon icon="people" className="student" />

                  {students_invited_count}
                </Box>
                <Box>دوستایی که دعوتتو قبول کردن</Box>

                <Icon icon="accepted-requests" className="common-icons" />
              </Box>
              <Box className="statistic" sx={{ color: "gray.1" }}>
                <Box className="total-count">
                  <Icon icon="people" className="student" />
                  {students_purchased_count}
                </Box>
                <Box>دوستایی که اشتراک فعال دارن</Box>

                <Icon icon="vip" className="common-icons" />
              </Box>
              <Box className="statistic" sx={{ color: "gray.1" }}>
                <Box className="total-count">
                  <Image src="/svg/diamond.svg" width={18} height={18} alt="" />
                  <Typography
                    variant="caption"
                    className="amount"
                    sx={{ color: theme.palette.system.blue }}
                  >
                    {gem_amount_acquired}
                  </Typography>
                </Box>
                <Box>الماس‌هایی که بدست آوردی</Box>

                <Box className="open_chest">
                  <Image
                    src="/icon/open_chest.png"
                    width={32}
                    height={32}
                    alt=""
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <CommonSuccessSnackBar
        openSuccessSnackbar={copyAcademyLink}
        closeSnackBar={closeSnackBar}
        type="introduceToFriends"
      />
    </>
  );
}

export default IntroduceToFriends;
