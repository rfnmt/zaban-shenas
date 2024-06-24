"use client";
import React, { memo } from "react";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import SettingsChild from "@/components/settingComponents/SettingsChild";
import {
  APP_VERSION,
  NEXT_PUBLIC_CRISP_URL,
  NEXT_PUBLIC_CRISP_WEBSITE_ID,
} from "@/env";

import "./setting.scss";

function Setting() {
  const router = useRouter();
  const pathname = usePathname();

  function contactWithSupport() {
    let url = `${NEXT_PUBLIC_CRISP_URL}?website_id=${NEXT_PUBLIC_CRISP_WEBSITE_ID}&app_version=${APP_VERSION}&platform=pwa`;
    window.open(url, "_self");
  }

  const mainText =
    "من بالاخره تصمیم گرفتم که یکبار برای همیشه زبان انگلیسی رو یاد بگیرم. تو هم میتونی از همین امروز به همراه من یادگیری زبان رو با روشی اصولی و کارآمد شروع کنی. این روش به صورت مختصر در ویدئوی زیر توضیح داده شده.";
  const subText =
    "منتظر چی هستی؟ اگر آماده‌ای فقط کافیه نرم افزار زبانشناس رو از لینک زیر دانلود کنی و روزی ۲۵ دقیقه زبان بخونی";
  const aparatUrl = "https://www.aparat.com/v/mKHAv";
  const appDownloadUrl = "https://zabanshenas.com/install/";
  const text = `${mainText}\n\n${aparatUrl}\n\n${subText}\n\n`;
  const introduceToFriends = () => {
    if ("share" in navigator) {
      navigator
        .share({
          title: mainText + subText,
          url: appDownloadUrl,
          text: text,
        })
        .then(() => {})
        .catch(console.error);
    } else {
    }
  };

  function openLogoutModal() {
    router.push(`${pathname}?logout-modal=true`);
  }

  return (
    <>
      <Box bgcolor="background.main">
        <Box className="setting-wrapper">
          <Box
            className="setting-main-child-wrapper"
            sx={{
              backgroundColor: "white.flexible",
            }}
          >
            <SettingsChild
              icon="xp-goal"
              title="ویرایش هدف روزانه"
              handleClickEvent={() => router.push("/setting/edit-daily-goal")}
            />
          </Box>
          {/* ***************** */}
          {/* ***************** */}
          <Box
            className="setting-main-child-wrapper"
            sx={{
              backgroundColor: "white.flexible",
            }}
          >
            <SettingsChild
              icon="store"
              title="فروشگاه"
              handleClickEvent={() => router.push("/setting/store")}
            />
          </Box>
          {/* ***************** */}
          {/* ***************** */}
          <Box
            className="setting-main-child-wrapper"
            sx={{
              backgroundColor: "white.flexible",
            }}
          >
            <SettingsChild
              icon="appearance"
              title="ظاهر"
              handleClickEvent={() => router.push("/setting/appearance")}
            />
            <SettingsChild
              icon="notification"
              title="اعلان‌ها و یادآورها"
              handleClickEvent={() => router.push("/setting/notifications")}
            />
          </Box>
          {/* ***************** */}
          {/* ***************** */}
          <Box
            className="setting-main-child-wrapper"
            sx={{
              backgroundColor: "white.flexible",
            }}
          >
            {/* <SettingsChild
              icon="comment"
              title="ثبت نظر"
              handleClickEvent={() => router.push("/subscription-management")}
            /> */}
            <SettingsChild
              icon="support"
              title="ارتباط با پشتیبانی"
              handleClickEvent={contactWithSupport}
              customIcon={true}
            />
            <SettingsChild
              icon="share"
              title="معرفی به دوستان"
              handleClickEvent={() =>
                router.push("/setting/introduce-to-friends")
              }
            />
            <SettingsChild
              icon="report"
              title="گزارش"
              handleClickEvent={() => router.push("/setting/report")}
            />
            <SettingsChild
              icon="about"
              title="درباره ما"
              handleClickEvent={() => router.push("/setting/about-us")}
            />
            {/* <SettingsChild
              icon="sending-log"
              title="ارسال لاگ"
              handleClickEvent={() => router.push("/subscription-management")}
            /> */}
            <SettingsChild
              icon="log-out"
              title="خروج از حساب کاربری"
              handleClickEvent={openLogoutModal}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default memo(Setting);
