import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumber } from "@/modules/helper";
import {
  handleGiftSwiperValue,
  handleOpenGiftBottomSheet,
} from "@/providers/Redux/general/generalSlice";
import { RootReduxState } from "@/providers/Redux/store";
import { Box, IconButton, Skeleton, Typography, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import Image from "next/image";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useStudentAPI } from "@/app/setting/store/hook";
import { SuggestFreindRootData } from "@/app/profile/suggestedFriends/interfaces";
import { usePathname } from "next/navigation";
import { IStudentData } from "@/models/studentData.interfaces";
import "./style.scss";

function GiftBottomSheetHeader() {
  const theme = useTheme() as any;
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootReduxState) => state.user);
  const { giftSwiperValue } = useSelector(
    (state: RootReduxState) => state.general
  );
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    Number(pathname.split("/")[3]),
  ]);
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const studentTotalGem = studentData?.attributes?.data?.find(
    (item: any) => item.name === "gem"
  )?.value;
  const { mutate: getStudentData } = useStudentAPI();
  useEffect(() => {
    if (!studentData && id) {
      getStudentData(id);
    }
  }, [studentData, id]);

  return (
    <Box
      className="gift-bottomsheet-navigateToBack"
      sx={{
        color: `${theme.palette.gray["1"]} !important`,
        backgroundColor: "background.main",
        borderBottom: `1px solid ${theme.palette.border.main} !important`,
        "&::before": {
          backgroundColor: `${theme.palette.border.main} !important`,
        },
      }}
    >
      <Box className="gem-amount">
        <Image
          src="/svg/diamond.svg"
          fill
          alt=""
          className="gift-navigateToBack-diamond"
        />
        <Box sx={{ color: theme.palette.system.blue }}>
          {isNumber(studentTotalGem) ? (
            new Intl.NumberFormat("en-US").format(studentTotalGem)
          ) : (
            <Skeleton className="gift-navigateToBack-skeleton" />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", color: theme.palette.gray["1"] }}>
        <Typography
          sx={{ color: theme.palette.system.blue, marginRight: "4px" }}
        >
          {getSingleStudentData?.profile_data?.data?.name
            ? getSingleStudentData?.profile_data?.data?.name
            : "کاربر"}
        </Typography>
        <Typography> ارسال هدیه به </Typography>
      </Box>
      <IconButton
        onClick={() =>
          giftSwiperValue === 0
            ? dispatch(handleOpenGiftBottomSheet(false))
            : dispatch(handleGiftSwiperValue(0))
        }
        sx={{
          marginLeft: "auto",
          "& svg": {
            "& path": {
              fill: `${theme.palette.icon["2"]} !important`,
            },
          },
        }}
      >
        {giftSwiperValue === 0 ? (
          <Icon icon="close" size="48" />
        ) : (
          <Icon icon="arrow_back" size="48" />
        )}
      </IconButton>
    </Box>
  );
}

export default GiftBottomSheetHeader;
