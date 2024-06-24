"use client";
import React from "react";
import { Box, Button, useTheme } from "@mui/material";

import Icon from "../../../components/icon";
import Z3DButton from "@/components/Z3DButton";
import {
  APP_VERSION,
  NEXT_PUBLIC_CRISP_URL,
  NEXT_PUBLIC_CRISP_WEBSITE_ID,
} from "@/env";
import Image from "next/image";
import "./aboutUs.scss";

function AboutUs() {
  const theme = useTheme() as any;

  function handleNewMessage() {
    let url = `${NEXT_PUBLIC_CRISP_URL}?website_id=${NEXT_PUBLIC_CRISP_WEBSITE_ID}&app_version=${APP_VERSION}&platform=pwa`;
    window.open(url);
  }

  const contactLinks = [
    {
      href: "https://t.me/zabanshenas_com",
      icon: "tel",
      class_name: "tel",
    },
    {
      href: "https://www.instagram.com/zabanshenas_com/",
      icon: "insta",
      class_name: "insta",
    },
    {
      href: "https://zabanshenas.com/",
      icon: "web",
      class_name: "web",
    },
    {
      href: "mailto:email@zabanshenas.com",
      icon: "mail",
      class_name: "mail",
    },
  ];

  return (
    <Box className="wrap-aboutus" bgcolor="background.main">
      <Box className="zabanshenas-icon-wrapper">
        <Image src="/icon/logo/192.png" alt="" width={88} height={88} />
      </Box>
      <Box
        className="contents"
        sx={{ color: `${theme.palette.gray["2"]} !important` }}
      >
        نسخه ۸.۶.۱
      </Box>
      <Box className="about-text">
        <Box
          className="text"
          sx={{ color: `${theme.palette.gray["1"]} !important` }}
        >
          پس از ۱۰ سال تجربه و آزمون و خطا با اپلیکیشن زبان‌شناس،‌ ما توانستیم
          به یک روش جامع و کاربردی برای آموزش زبان انگلیسی برسیم. مهم نیست که
          چند سالتان باشد، یا سطح‌تان در چه حدی باشد، ما اپلیکیشن زبان آموز را
          به شکلی ساخته‌ایم که برای همه افراد مناسب باشد. زبان آموز حاصل زحمات
          شبانه روزی 60 نفره ی تیم زبانشناس است.
        </Box>
        <Box
          className="text"
          sx={{ color: `${theme.palette.gray["1"]} !important` }}
        >
          تا به حال هزاران نفر به کمک اپلیکیشن زبانشناس انگلیسی را یاد گرفته
          اند. ما امید داریم تجربه ی موفق زبانشناس در زبان آموز نیز تکرار شود تا
          بتوانیم بهتر از همیشه برای موفقیت و افزایش دانش شما تلاش کنیم.
        </Box>

        <Box className="about-us-buttons">
          <Z3DButton onClick={handleNewMessage} className="contact-support">
            <Icon icon="support_contact" size="24" />
            <span className="contact-text">پیام به پشتیبانی</span>
          </Z3DButton>
          <Box className="icons-collections">
            {contactLinks.map((item, index) => {
              return (
                <a target="_blank" href={item.href} key={index}>
                  <Button
                    className={`contact-icons ${item.class_name}`}
                    startIcon={<Icon icon={item.icon} size="36" />}
                  />
                </a>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUs;
