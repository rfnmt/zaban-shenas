import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import Counter from "@/components/counterAnimation";

import "./style.scss";

type FirstStreakMessageType = {
  animation: boolean;
  increaseCounterValue: boolean;
  decreaseCounterValue: boolean;
  setshowContinueButton: (x: boolean) => void;
};

function FirstStreakMessage({
  animation,
  increaseCounterValue,
  decreaseCounterValue,
  setshowContinueButton,
}: FirstStreakMessageType) {
  const theme = useTheme() as any;

  const weekDays = [
    { day: "ش" },
    { day: "ی" },
    { day: "د" },
    { day: "س" },
    { day: "چ" },
    { day: "پ" },
    { day: "ج" },
  ];
  const [myday0, setMyday0] = useState({ state: false });
  const [myday1, setMyday1] = useState({ state: false });
  const [myday2, setMyday2] = useState({ state: false });
  const [myday3, setMyday3] = useState({ state: false });
  const [myday4, setMyday4] = useState({ state: false });
  const [myday5, setMyday5] = useState({ state: false });

  const [textType, setTextType] = useState(
    "با زنجیره میفهمی چند روز پشت سر هم درس خوندی"
  );

  useEffect(() => {
    const day0 = setTimeout(() => {
      setMyday0((prev) => ({ ...prev, state: true }));
    }, 500);
    const day1 = setTimeout(() => {
      setMyday1((prev) => ({ ...prev, state: true }));
    }, 2800);
    const day2 = setTimeout(() => {
      setMyday2((prev) => ({ ...prev, state: true }));
    }, 3800);
    const day3 = setTimeout(() => {
      setMyday3((prev) => ({ ...prev, state: true }));
    }, 5000);
    const day4 = setTimeout(() => {
      setMyday4((prev) => ({ ...prev, state: true }));
    }, 6500);
    const day5 = setTimeout(() => {
      setTextType("اگه یه روز درس نخونی زنجیرت صفر میشه");
      setMyday5((prev) => ({ ...prev, state: true }));
    }, 8500);
    return () => {
      clearTimeout(day0);
      clearTimeout(day1);
      clearTimeout(day2);
      clearTimeout(day3);
      clearTimeout(day4);
      clearTimeout(day5);
    };
  }, []);
  return (
    <>
      <motion.div
        className="whatIsStreak-icon-counter"
        initial={{ opacity: 0 }}
        animate={{ x: -10, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        key="icon-counter-wrapper"
      >
        {animation ? (
          <Image src="/svg/streak-icon.svg" width={168} height={168} alt="" />
        ) : (
          <Icon icon="disabled-fire" width={168} height={168} />
        )}

        {increaseCounterValue && (
          <motion.div key="get-streak-days2" className="get-streak-days">
            <Counter from={0} to={5} duration={8} delay={2} />
          </motion.div>
        )}
        {decreaseCounterValue && (
          <motion.div key="get-streak-days" className="get-streak-days">
            <Counter
              from={5}
              to={0}
              duration={0.3}
              delay={0.5}
              onComplete={() =>
                setTimeout(() => setshowContinueButton(true), 2000)
              }
            />
          </motion.div>
        )}
      </motion.div>

      <Box
        className="whatIsStreak-weekdays"
        sx={{
          boxShadow: "0 1px 1px #00000029",
          backgroundColor: theme.palette.white.flexible,
        }}
      >
        <motion.div key="user-study-chain" className="user-study-chain">
          <Box
            className="userChains"
            sx={{
              "& svg.break-streak": {
                "& path": {
                  fill: `${theme.palette.gray["3"]} !important`,
                },
              },
            }}
          >
            {myday0.state === false ? (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.accent3.main,
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="icon-counter-wrapper0"
              >
                <Icon icon="streakTik" size={24} />
              </motion.div>
            )}
            {myday1.state === false ? (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.accent3.main,
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="icon-counter-wrapper1"
              >
                <Icon icon="streakTik" size={24} />
              </motion.div>
            )}
            {myday2.state === false ? (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.accent3.main,
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="icon-counter-wrapper2"
              >
                <Icon icon="streakTik" size={24} />
              </motion.div>
            )}
            {myday3.state === false ? (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.accent3.main,
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="icon-counter-wrapper3"
              >
                <Icon icon="streakTik" size={24} />
              </motion.div>
            )}
            {myday4.state === false ? (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.accent3.main,
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="icon-counter-wrapper4"
              >
                <Icon icon="streakTik" size={24} />
              </motion.div>
            )}
            {myday5.state === false ? (
              <Box
                sx={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.accent3.main,
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key="icon-counter-wrapper5"
              >
                <Icon icon="clearText" size={24} className="break-streak" />
              </motion.div>
            )}

            <Box
              sx={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: theme.palette.accent3.main,
              }}
            />
          </Box>
          <Box className="days-name">
            {weekDays.map((item, index) => {
              return (
                <Typography key={index} sx={{ color: theme.palette.gray["1"] }}>
                  {item.day}
                </Typography>
              );
            })}
          </Box>
        </motion.div>
      </Box>

      <motion.div
        initial={myday5 && { opacity: 0 }}
        animate={myday5 && { opacity: 1 }}
        transition={myday5 && { duration: 1, delay: 0.7 }}
        key="icon-counter-wrapper6"
      >
        <Typography
          className="whatIsStreak-caption"
          sx={{ color: theme.palette.gray["1"] }}
        >
          {textType}
        </Typography>
      </motion.div>
    </>
  );
}

export default FirstStreakMessage;
