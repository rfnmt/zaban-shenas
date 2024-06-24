"use client";
import React, { memo, useEffect, useState } from "react";

import { Box } from "@mui/material";
import { useSettingDailyGoal } from "../edit-daily-goal/hook";
import SettingChildsHeader from "../../../components/settingComponents/settingChildsHeader";
import SettingChildsComponentNotificationTypes from "../../../components/settingComponents/settingChildsComponentNotificationTypes";
import SettingChildsComponentSimpleAndSwitch from "../../../components/settingComponents/settingChildsComponentSimpleAndSwitch";
import ExtraMessage from "../../../components/settingComponents/extraMessage";
import LottieLoading from "@/components/lottieLoading";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { INotification } from "../notifications.interfaces";
import "./notifications.scss";

function Notifications() {
  const preStoredData = queryClient.getQueryData<INotification>([
    "setting-daily-goal",
  ]);
  const [streakLoading, setStreakLoading] = useState("");
  const [massageLoading, setMassageLoading] = useState("");
  const [displayConversation, setDisplayConversation] = useState(false);
  const [conversation_push_email_sms, setConversation_push_email_sms] =
    useState({
      conversation_push: true,
      conversation_email: true,
      conversation_sms: true,
    });

  const [displayReminder, setDisplayReminder] = useState(false);
  const [streak_push_email_sms, setStreak_Push_email_sms] = useState<any>({
    streak_push: true,
    streak_email: true,
    streak_sms: true,
  });

  const {
    isSuccess: singleRequestSuccess,
    mutate: signleRequestMutate,
    isPending: loadingSegment,
  } = useSettingDailyGoal();

  useEffect(() => {
    if (!loadingSegment) {
      setStreakLoading("");
      setMassageLoading("");
    }
  }, [loadingSegment]);

  useEffect(() => {
    const {
      conversation_email_opt_in,
      conversation_notification_opt_in,
      conversation_sms_opt_in,
      streak_email_opt_in,
      streak_notification_opt_in,
      streak_sms_opt_in,
    } = preStoredData?.settings?.data;

    setConversation_push_email_sms((prev: any) => ({
      ...prev,
      conversation_push: conversation_notification_opt_in,
      conversation_email: conversation_email_opt_in,
      conversation_sms: conversation_sms_opt_in,
    }));
    setStreak_Push_email_sms((prev: any) => ({
      ...prev,
      streak_push: streak_notification_opt_in,
      streak_email: streak_email_opt_in,
      streak_sms: streak_sms_opt_in,
    }));

    if (
      conversation_notification_opt_in ||
      conversation_email_opt_in ||
      conversation_sms_opt_in
    ) {
      setDisplayConversation(true);
    } else {
      setDisplayConversation(false);
    }
    if (
      streak_notification_opt_in ||
      streak_email_opt_in ||
      streak_sms_opt_in
    ) {
      setDisplayReminder(true);
    } else {
      setDisplayReminder(false);
    }
  }, [singleRequestSuccess]);

  const handleSwitchReminder = () => {
    setDisplayReminder(!displayReminder);

    const showingDisplayReminder = !displayReminder;

    setStreakLoading("notification-streak");
    if (showingDisplayReminder === true) {
      send_streak_Data({
        push: true,
        email: true,
        sms: true,
      });
    } else {
      send_streak_Data({
        push: false,
        email: false,
        sms: false,
      });
    }
  };

  function handleonClickNotification() {
    const { streak_push } = streak_push_email_sms;
    setStreakLoading("notification-streak");
    send_streak_Data({
      push: !streak_push,
      email: streak_push_email_sms.streak_email,
      sms: streak_push_email_sms.streak_sms,
    });

    setStreak_Push_email_sms((prev: any) => ({
      ...prev,
      streak_push: !streak_push_email_sms.streak_push,
    }));
  }

  function handleonClickEmail() {
    const { streak_email } = streak_push_email_sms;
    setStreakLoading("notification-streak");
    send_streak_Data({
      push: streak_push_email_sms.streak_push,
      email: !streak_email,
      sms: streak_push_email_sms.streak_sms,
    });

    setStreak_Push_email_sms((prev: any) => ({
      ...prev,
      streak_email: !streak_push_email_sms.streak_email,
    }));
  }

  function handleonClickSms() {
    const { streak_sms } = streak_push_email_sms;
    setStreakLoading("notification-streak");
    send_streak_Data({
      push: streak_push_email_sms.streak_push,
      email: streak_push_email_sms.streak_email,
      sms: !streak_sms,
    });

    setStreak_Push_email_sms((prev: any) => ({
      ...prev,
      sms: !streak_push_email_sms.sms,
    }));
  }

  function send_streak_Data({ push, email, sms }: any) {
    signleRequestMutate({
      updated_data: {
        streak_notification_opt_in: push,
        streak_email_opt_in: email,
        streak_sms_opt_in: sms,
      },
    });
  }
  /////////////////////
  ////////////////////
  ///////////////////

  const handleSwitchConversation = () => {
    setDisplayConversation(!displayConversation);
    const showingDisplayConversation = !displayConversation;
    setMassageLoading("messages");
    if (showingDisplayConversation === true) {
      send_conversation_Data({
        push: true,
        email: true,
        sms: true,
      });
    } else {
      send_conversation_Data({
        push: false,
        email: false,
        sms: false,
      });
    }
  };

  function handleConversationNotification() {
    const { conversation_push } = conversation_push_email_sms;
    setMassageLoading("messages");
    send_conversation_Data({
      push: !conversation_push,
      email: conversation_push_email_sms.conversation_email,
      sms: conversation_push_email_sms.conversation_sms,
    });

    setConversation_push_email_sms((prev: any) => ({
      ...prev,
      conversation_push: !conversation_push_email_sms.conversation_push,
    }));
  }

  function handleConversationEmail() {
    const { conversation_email } = conversation_push_email_sms;
    setMassageLoading("messages");
    send_conversation_Data({
      push: conversation_push_email_sms.conversation_push,
      email: !conversation_email,
      sms: conversation_push_email_sms.conversation_sms,
    });

    setConversation_push_email_sms((prev: any) => ({
      ...prev,
      conversation_email: !conversation_push_email_sms.conversation_email,
    }));
  }

  function handleConversationSms() {
    const { conversation_sms } = conversation_push_email_sms;
    setMassageLoading("messages");
    send_conversation_Data({
      push: conversation_push_email_sms.conversation_push,
      email: conversation_push_email_sms.conversation_email,
      sms: !conversation_sms,
    });

    setConversation_push_email_sms((prev: any) => ({
      ...prev,
      conversation_sms: !conversation_push_email_sms.conversation_sms,
    }));
  }

  function send_conversation_Data({ push, email, sms }: any) {
    signleRequestMutate({
      updated_data: {
        conversation_notification_opt_in: push,
        conversation_email_opt_in: email,
        conversation_sms_opt_in: sms,
      },
    });
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box className="wrap-notifications">
        <SettingChildsHeader title="یادآور زنجیره" />
        <Box
          className="setting-childs-component-simple-and-switch-and-checkbox"
          sx={{
            backgroundColor: "white.flexible",
          }}
        >
          <LottieLoading
            open_lottie={streakLoading === "notification-streak" ? true : false}
            lottie_className="notificationLoading"
            width={110}
            height={110}
          />
          <SettingChildsComponentSimpleAndSwitch
            withSwitch={true}
            handleOnClickFunction={handleSwitchReminder}
            rightTextContent="نمایش یادآور"
            state1={displayReminder}
          />

          {displayReminder ? (
            <>
              <SettingChildsComponentNotificationTypes
                rightTextContent="نوتیفیکیشن"
                state1={streak_push_email_sms.streak_push}
                handleOnClickFunction={handleonClickNotification}
              />
              <SettingChildsComponentNotificationTypes
                rightTextContent="ایمیل"
                state1={streak_push_email_sms.streak_email}
                handleOnClickFunction={handleonClickEmail}
              />
              <SettingChildsComponentNotificationTypes
                rightTextContent="پیامک"
                state1={streak_push_email_sms.streak_sms}
                handleOnClickFunction={handleonClickSms}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
        <ExtraMessage
          textContent="پیام‌های مشاوره ای"
          showLongText={true}
          longText="  ما با بررسی رفتار مطالعه شما بهترین زمان برای یادآوری مطالعه روزانه
            را برایتان محاسبه می‌کنیم."
        />
        <Box
          className="setting-childs-component-simple-and-switch-and-checkbox"
          sx={{
            backgroundColor: "white.flexible",
          }}
        >
          <LottieLoading
            open_lottie={massageLoading === "messages" ? true : false}
            lottie_className="notificationLoading"
            width={110}
            height={110}
          />
          <SettingChildsComponentSimpleAndSwitch
            withSwitch={true}
            handleOnClickFunction={handleSwitchConversation}
            rightTextContent="دریافت پیام"
            state1={displayConversation}
          />

          {displayConversation ? (
            <>
              <SettingChildsComponentNotificationTypes
                rightTextContent="نوتیفیکیشن"
                state1={conversation_push_email_sms.conversation_push}
                handleOnClickFunction={handleConversationNotification}
              />
              <SettingChildsComponentNotificationTypes
                rightTextContent="ایمیل"
                state1={conversation_push_email_sms.conversation_email}
                handleOnClickFunction={handleConversationEmail}
              />
              <SettingChildsComponentNotificationTypes
                rightTextContent="پیامک"
                state1={conversation_push_email_sms.conversation_sms}
                handleOnClickFunction={handleConversationSms}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
        <ExtraMessage
          textContent=""
          showLongText={true}
          longText="با خاموش کردن این گزینه، تنها در صندوق پیام داخل برنامه پیام های تیم زبان آموز را دریافت خواهید کرد."
        />
      </Box>
    </Box>
  );
}

export default memo(Notifications);
