"use client";
import React, { useEffect, useState } from "react";
import { useTheme, Box, FormControl, RadioGroup } from "@mui/material";
import * as target from "@/public/lottie-files/target.json";
import Lottie from "react-lottie-player";
import { useGetInitilaData, useSettingDailyGoal } from "./hook";
import DailyGoalComponent from "./components/dailyGoalComponent";
import LottieLoading from "@/components/lottieLoading";
import SettingChildsHeader from "@/components/settingComponents/settingChildsHeader";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { InitialData } from "../initialData.interfaces";
import { INotification } from "../notifications.interfaces";
import "./editDailyGoal.scss";
import {
  getUserGaindXpByDate,
  pushFreshExperiencesWithHasUpdateKey,
} from "@/providers/Dexie/experiences";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

function EditDailyGoal() {
  const theme = useTheme() as any;
  const dailyGoalData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);
  const preStoredData = queryClient.getQueryData<INotification>([
    "setting-daily-goal",
  ]);
  const dailyGoalXp = preStoredData?.settings?.data?.daily_goal_xp;
  let valueOfRadio = "";

  //

  // const {
  //   mutate: initial_data_daily_Goal,
  //   isLoading,
  //   isSuccess,
  //   data: daily,
  // } = useGetInitilaData();

  const { mutate: setting_xp_daily_Goal, isPending: daily_loading } =
    useSettingDailyGoal();

  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);

  const [radioValue, setRadioValue] = useState<string>("");

  let dailyDataArray: any = [];
  dailyDataArray = dailyGoalData?.daily_goals?.data;
  if (dailyDataArray) {
    if (dailyGoalXp === "casual") {
      valueOfRadio = "casual";
      dailyDataArray[0].border = true;
      dailyDataArray[1].border = true;
      dailyDataArray[2].border = false;
      dailyDataArray[3].border = false;
    } else if (dailyGoalXp === "regular") {
      valueOfRadio = "regular";
      dailyDataArray[0].border = false;
      dailyDataArray[1].border = true;
      dailyDataArray[2].border = true;
      dailyDataArray[3].border = false;
    } else if (dailyGoalXp === "serious") {
      valueOfRadio = "serious";
      dailyDataArray[0].border = false;
      dailyDataArray[1].border = false;
      dailyDataArray[2].border = true;
      dailyDataArray[3].border = true;
    } else if (dailyGoalXp === "insane") {
      valueOfRadio = "insane";
      dailyDataArray[0].border = false;
      dailyDataArray[1].border = false;
      dailyDataArray[2].border = false;
      dailyDataArray[3].border = true;
    }
  }

  const today = dayjs().format("YYYY-MM-DD");
  const { id } = useSelector((state: RootReduxState) => state.user);

  const handleDailyStudy = async (e: any) => {
    setRadioValue(e.target.value);
    if (e.target.value === "casual") {
      dailyDataArray[0].border = true;
      dailyDataArray[1].border = true;
      dailyDataArray[2].border = false;
      dailyDataArray[3].border = false;
    } else if (e.target.value === "regular") {
      dailyDataArray[0].border = false;
      dailyDataArray[1].border = true;
      dailyDataArray[2].border = true;
      dailyDataArray[3].border = false;
    } else if (e.target.value === "serious") {
      dailyDataArray[0].border = false;
      dailyDataArray[1].border = false;
      dailyDataArray[2].border = true;
      dailyDataArray[3].border = true;
    } else if (e.target.value === "insane") {
      dailyDataArray[0].border = false;
      dailyDataArray[1].border = false;
      dailyDataArray[2].border = false;
      dailyDataArray[3].border = true;
    }

    setting_xp_daily_Goal({
      updated_data: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        daily_goal_xp: e.target.value,
      },
    });

    const getUserDailyGoal = userInitialData?.daily_goals?.data.find(
      (item) => item.slug === e.target.value
    );

    const experiences = await getUserGaindXpByDate(today);

    let modifyExperience = {};

    if (experiences) {
      modifyExperience = {
        ...experiences,
        daily_goal_xp: getUserDailyGoal?.daily_goal_xp || 0,
      };
    } else {
      modifyExperience = {
        daily_goal_xp: getUserDailyGoal?.daily_goal_xp || 0,
        date: today,
        did: id,
        frozen: false,
        gained_xp: 0,
      };
    }

    if (Object.keys(modifyExperience).length)
      pushFreshExperiencesWithHasUpdateKey([modifyExperience]);
  };

  useEffect(() => {
    // initial_data_daily_Goal({});
    // setting_xp_daily_Goal({});
    return () => {};
  }, []);

  //

  return (
    <Box className="wrap-daily-goal">
      <SettingChildsHeader title="هدف روزانه خود را مشخص کنید" />

      <Box sx={{ position: "relative", height: "232px" }}>
        {/* <LottieLoading
          open_lottie={isLoading}
          lottie_className="daily-goal-loading"
        /> */}
        <LottieLoading
          open_lottie={daily_loading}
          lottie_className="daily-goal-loading"
        />

        <FormControl
          component="fieldset"
          fullWidth={true}
          sx={{
            "& .MuiFormGroup-root": {
              borderRadius: "10px",
            },
          }}
        >
          <RadioGroup
            aria-label="dailyStudy"
            name="dailyStudy"
            value={radioValue || valueOfRadio}
            onChange={handleDailyStudy}
            sx={{ backgroundColor: "white.flexible" }}
          >
            {dailyDataArray?.map((item: any, index: number) => {
              return <DailyGoalComponent data={item} key={index} />;
            })}
          </RadioGroup>
        </FormControl>
      </Box>
      <div className="logo-and-extra-description">
        <Box
          className="text-content"
          sx={{
            color: `${theme.palette.gray["1"]} !important`,
            borderColor: `${theme.palette.border.main} !important`,
            "&::before": {
              backgroundColor: "white.flexible",
              borderColor: `${theme.palette.border.main} !important`,
            },
            backgroundColor: "white.flexible",
          }}
        >
          <p>هدف روزانه خود را هر زمان که</p>
          <p>خواستید میتوانید تغییر بدهید.</p>
        </Box>
        <div className="animation-wrapper">
          <Lottie
            loop={false}
            animationData={target}
            play
            style={{ width: 242, height: 245, position: "relative" }}
            segments={[0, 40]}
          />
        </div>
      </div>
    </Box>
  );
}

export default EditDailyGoal;
