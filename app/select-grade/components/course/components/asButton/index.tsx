import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Icon from "@/components/icon";
import { ICourse } from "@/app/select-grade/interfaces";
import { checkDateIsCurrentMonth } from "@/modules/helper";
import { changeUserCurrentCourse } from "@/providers/Dexie/courses";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { updateProccessingSessionStates } from "@/providers/Redux/home/homeSlice";

type Props = { data: ICourse };

function AsButton({ data }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme() as any;
  const newCourse = checkDateIsCurrentMonth(data?.created_at) === 0;

  useEffect(() => {
    router.prefetch("/");
    return () => {};
  }, [router]);

  function updateCurrentCourse() {
    changeUserCurrentCourse(data?.id).then(function () {
      router.push("/");
    });
  }

  return (
    <Box
      onClick={updateCurrentCourse}
      className="cource-item"
      sx={{
        backgroundColor: "white.flexible",
        boxShadow: "0 1px 1px rgba(0,0,0,.16)",
      }}
    >
      <Box className="select-grade-img-holder">
        {newCourse && (
          <Box
            className="new-cource"
            sx={{
              backgroundColor: theme.palette.accent2.main,
              color: theme.palette.white.flexible,
            }}
          >
            جدید
          </Box>
        )}

        <Box
          className="number-of-sections"
          sx={{
            backgroundColor: theme.palette.blackTransparent["2"],
            color: theme.palette.white.fix,
          }}
        >
          {data?.sub_courses?.length || 1} بخش
        </Box>
        <Image width={118} height={67} src={data?.thumbnail} alt="" />
      </Box>
      <Box className="text-holder">
        <Typography className="title" sx={{ color: theme.palette.gray["1"] }}>
          {data?.title}
        </Typography>
        <Typography
          className="description"
          sx={{ color: theme.palette.gray["2"] }}
        >
          {data?.description}
        </Typography>
      </Box>
      <Box className="icon-holder">
        <Icon icon="chevron-left" size={24} />
      </Box>
    </Box>
  );
}

export default AsButton;
