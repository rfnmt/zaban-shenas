import { RootReduxState } from "@/providers/Redux/store";
import React from "react";
import Sheet from "react-modal-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { handleOpenSuccessfulGiftBottomSheet } from "@/providers/Redux/general/generalSlice";
import Image from "next/image";
import Icon from "@/components/icon";
import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { SuggestFreindRootData } from "../../../interfaces";
import { usePathname } from "next/navigation";
import { IGiftShop } from "../giftBottomSheet/giftBottomsheet.interfaces";
import ActivationElementsHeader from "@/components/activationElementsHeader";
import Z3DButton from "@/components/Z3DButton";
import GiftDialogueText from "../giftDialogueText";
import UserNameAndUserPic from "../userNameAndUserPic";
import "./style.scss";
function SuccessfulGiftBottomSheet() {
  const pathname = usePathname();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { mode } = useSelector((state: any) => state.general);
  const { openSuccessfulGiftBottomSheet, giftName, giftVariationTitle } =
    useSelector((state: RootReduxState) => state.general);
  const { suggestedFriendID } = useSelector((state: any) => state.general);
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    suggestedFriendID === null
      ? Number(pathname.split("/")[3])
      : suggestedFriendID,
  ]);
  const giftShopData = queryClient.getQueryData(["gift-shop"]) as IGiftShop;

  const accordedGiftData = giftShopData?.purchasables?.filter(
    (item: any) => item.data.slug === giftName
  );

  return (
    <Sheet
      onClose={() => {
        dispatch(handleOpenSuccessfulGiftBottomSheet(false));
      }}
      isOpen={openSuccessfulGiftBottomSheet}
      detent="content-height"
      className="gift-successful"
    >
      <Sheet.Container>
        <Sheet.Header>
          <Box
            className="successful-gift-header"
            sx={{
              borderBottom: `1px solid ${theme.palette.border.main} !important`,
              "&::before": {
                backgroundColor: `${theme.palette.border.main} !important`,
              },
            }}
          >
            <Typography
              className="caption"
              sx={{ color: theme.palette.gray["1"] }}
            >
              هدیه ارسال شد
            </Typography>
          </Box>
        </Sheet.Header>
        <Sheet.Content>
          <UserNameAndUserPic studentData={studentData} />
          <Box
            className="user-dialogue"
            sx={{
              borderColor: `${theme.palette.border.main} !important`,
              backgroundColor: theme.palette.white.flexible,
              "&::before": {
                borderColor: `${theme.palette.border.main} !important`,
                backgroundColor: theme.palette.white.flexible,
              },
            }}
          >
            <GiftDialogueText getSingleStudentData={getSingleStudentData} />
            {accordedGiftData !== undefined && accordedGiftData.length > 0 ? (
              <Box
                className="gift-bottomsheet-elements"
                sx={{
                  background: `linear-gradient(270deg,${
                    mode === "light"
                      ? accordedGiftData[0].data.theming
                          ?.background_gradiant_secondary_light
                      : accordedGiftData[0].data.theming
                          ?.background_gradiant_secondary_dark
                  }, ${
                    mode === "light"
                      ? accordedGiftData[0].data.theming
                          ?.background_gradiant_primary_light
                      : accordedGiftData[0].data.theming
                          ?.background_gradiant_primary_dark
                  })`,
                }}
              >
                <ActivationElementsHeader
                  lightThemeing={
                    accordedGiftData[0].data.theming?.text_color_light
                  }
                  darkThemeing={
                    accordedGiftData[0].data.theming?.text_color_dark
                  }
                  title={accordedGiftData[0].data.title}
                  description={
                    giftName === "gold"
                      ? giftVariationTitle
                      : accordedGiftData[0].data.description
                  }
                  thumbnail={accordedGiftData[0].data.images?.thumbnail}
                  customTheme={theme.palette.white.fix}
                />
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Z3DButton
            onClick={() => {
              dispatch(handleOpenSuccessfulGiftBottomSheet(false));
            }}
          >
            تمام
          </Z3DButton>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => {
          dispatch(handleOpenSuccessfulGiftBottomSheet(false));
        }}
      />
    </Sheet>
  );
}

export default SuccessfulGiftBottomSheet;
