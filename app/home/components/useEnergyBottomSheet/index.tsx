import Image from "next/image";
import Lottie from "react-lottie-player";
import Sheet from "react-modal-sheet";
import React, { useEffect, useMemo } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import Icon from "@/components/icon";
import * as lottieAnimation from "@/public/lottie-files/loading-sessions-action-button.json";

import { RootReduxState } from "@/providers/Redux/store";
import { closeSheet } from "@/providers/Redux/home/freemuim/useEnergyBottomSheetSlice";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IPurchasables, IShop } from "@/app/setting/store/store.interfaces";
import { useEnergyConsumption } from "./hook/useEnergyConsumption";
import { setOpenProductBottomSheet } from "@/providers/Redux/general/generalSlice";
import { useShopMutation } from "@/components/spalashScreen/hook/useShopMutation";
import { openBoard } from "@/providers/Redux/home/freemuim/freemuimBoardHomeSlice";

import "./styles.scss";

function UseEnergyBottomSheet() {
  const router = useRouter();
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const { visiblity, cover, sessionId } = useSelector(
    (state: RootReduxState) => state.useEnergyBottomSheet
  );

  const shopData = queryClient.getQueryData<IShop>(["shop-data"]);

  const purchasable = shopData?.purchasables?.find(
    (item: IPurchasables) => item?.data?.type === "energy"
  );

  const energyPurchasedProducts = shopData?.purchased_products.find(
    (item) => item.id === purchasable?.id
  );

  const { mutate: energyConsumption, status: statusEnergyConsumption } =
    useEnergyConsumption();

  const { status: statusGetShopData, mutate: requestToGetShopData } =
    useShopMutation();

  useEffect(() => {
    router.prefetch(`/session/${sessionId}`);
    return () => {};
  }, [router]);

  useEffect(() => {
    if (statusEnergyConsumption === "success") {
      requestToGetShopData();
    }
  }, [statusEnergyConsumption]);

  useEffect(() => {
    if (statusGetShopData === "success") {
      dispatch(closeSheet());
      router.push(`/session/${sessionId}`);
    }

    return () => {};
  }, [statusGetShopData]);

  function openProductBottomSheet() {
    dispatch(closeSheet());
    dispatch(setOpenProductBottomSheet(true));
  }

  function toHoursAndMinutes() {
    const hours = Math.floor(
      purchasable?.data?.pricing.minutes_per_refill / 60
    );
    const minutes = purchasable?.data?.pricing.minutes_per_refill % 60;
    return { hours, minutes };
  }

  const remainingAmount = energyPurchasedProducts?.data?.remaining_amount || 0;

  const userHasNotGem = (
    <Box
      className="content-container"
      sx={{
        backgroundColor: "background.main",
        border: `1px solid ${theme.palette.white.flexible}`,
        borderBottom: "unset",
      }}
    >
      <Box
        className="energy-bottom-sheet-indicator"
        sx={{
          "&::before": {
            backgroundColor: "border.main",
          },
        }}
      />
      <Typography sx={{ color: "gray.1" }} className="title">
        اووه! {purchasable?.data?.title} نداری!{" "}
      </Typography>

      <Divider
        sx={{
          border: `1px solid ${theme.palette.border.main}`,
          margin: "16px auto",
        }}
      />

      <Typography sx={{ color: "gray.1" }} className="title">
        برای باز کردن درس جدید نیاز به {purchasable?.data?.title} داری!{" "}
      </Typography>

      <Typography sx={{ color: "gray.2" }} className="sub-title">
        هر{" "}
        {toHoursAndMinutes().hours ? toHoursAndMinutes().hours + " ساعت" : ""}
        {toHoursAndMinutes().minutes && toHoursAndMinutes().hours ? " و " : ""}
        {toHoursAndMinutes().minutes
          ? toHoursAndMinutes().minutes + " دقیقه"
          : ""}
        ، یک {purchasable?.data?.title} برات فعال میشه.{" "}
      </Typography>

      <div className="action-area">
        <Box
          sx={{
            "& button": {
              backgroundColor: "primary.main",
              color: "white !important",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            },
          }}
          className="earn-items"
        >
          <Button
            sx={{ backgroundColor: "primary.main" }}
            onClick={() => {
              dispatch(closeSheet());
              dispatch(openBoard());
            }}
          >
            دیدن گزینه‌های مربوط به {purchasable?.data?.title}{" "}
          </Button>
        </Box>
        <Button
          onClick={() => dispatch(closeSheet())}
          className="cancell"
          sx={{ color: "system.blur" }}
        >
          بیخیال
        </Button>
      </div>
    </Box>
  );

  const userHasGem = (
    <Box
      className="content-container"
      sx={{
        backgroundColor: "background.main",
        border: `1px solid ${theme.palette.white.flexible}`,
        borderBottom: "unset",
      }}
    >
      <Image width={72} height={72} src={cover} className="cover" alt="" />

      <Typography sx={{ color: "gray.1" }} className="title">
        برای خوندن هر درس یک {purchasable?.data?.title} استفاده میشه!
      </Typography>
      <Typography sx={{ color: "gray.2" }} className="sub-title">
        با یک از دو روش زیر می‌تونی درس بخونی!
      </Typography>

      <div className="action-area">
        <Box
          sx={{
            "& button": {
              backgroundColor: "primary.main",
              color: "white !important",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            },
          }}
          className="earn-items"
        >
          <Button
            onClick={openProductBottomSheet}
            startIcon={<Icon width={20} height={20} icon="infinity" />}
          >
            {purchasable?.data?.title} بی‌نهایت
          </Button>
          <Button
            sx={{ backgroundColor: "primary.main" }}
            onClick={() => {
              if (purchasable)
                energyConsumption({
                  amount: 1,
                  purchasable: purchasable?.id,
                });
            }}
            startIcon={
              statusEnergyConsumption === "pending" ? (
                <Lottie
                  play
                  loop
                  animationData={lottieAnimation}
                  style={{
                    width: 66,
                    height: 40,
                    position: "relative",
                  }}
                />
              ) : (
                <Icon width={15} height={15} icon="thunder" />
              )
            }
          >
            {statusEnergyConsumption !== "pending" &&
              "۱ " + purchasable?.data?.title}
          </Button>
        </Box>
        <Button
          onClick={() => dispatch(closeSheet())}
          className="cancell"
          sx={{ color: "system.blur" }}
        >
          بیخیال
        </Button>
      </div>
    </Box>
  );

  return (
    <Sheet
      className="use-freemium-bottom-sheet"
      detent="content-height"
      isOpen={visiblity}
      onClose={() => dispatch(closeSheet())}
    >
      <Sheet.Container>
        <Sheet.Content>
          {remainingAmount === 0 ? userHasNotGem : userHasGem}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => dispatch(closeSheet())} />
    </Sheet>
  );
}

export default UseEnergyBottomSheet;
