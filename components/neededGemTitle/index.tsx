import React, { useEffect } from "react";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { calcNeededGEM } from "@/modules/helper";
import { useSelector } from "react-redux";
import { useStudentAPI } from "@/app/setting/store/hook";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootReduxState } from "@/providers/Redux/store";
import { usePathname } from "next/navigation";
import { IStudentData } from "@/models/studentData.interfaces";
import Cookie from "js-cookie";
import "./style.scss";

function NeededGemTitle() {
  const theme = useTheme() as any;
  const pathname = usePathname();
  const shopData: any = queryClient.getQueryData(["shop-data"]);
  const { openBuyingGemBottomSheet, giftName } = useSelector(
    (state: any) => state.general
  );
  const { id } = useSelector((state: RootReduxState) => state.user);

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

  const { mutate: getStudentData } = useStudentAPI();

  useEffect(() => {
    if (openBuyingGemBottomSheet) {
      if (!studentData && id) {
        getStudentData(id);
      }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData, id]);
  const gemExchangeValue: any =
    shopData?.shop_meta_data?.data?.gem_exchange_value;
  const studentTotalGem = studentData?.attributes?.data?.find(
    (item: any) => item.name === "gem"
  )?.value;

  const privateProductData = shopData?.purchasables.find(
    (item: any) => item.id === Number(localStorage.getItem("activationID"))
  )?.data;

  const goldData = shopData?.purchasables.find(
    (item: any) => item.id === Number(Cookie.get("parentID"))
  )?.data;
  const goldDataVariation = goldData?.pricing?.variations.find(
    (item: any) => item.id === Number(Cookie.get("productID"))
  );

  const privateProductData_Remaining_Amount_And_ExpireDate =
    shopData?.purchased_products.find(
      (item: any) => item.id === Number(localStorage.getItem("activationID"))
    );

  const neededGem = calcNeededGEM({
    price: privateProductData?.pricing?.price,
    maxAmount:
      privateProductData?.pricing?.max_amount -
      (privateProductData_Remaining_Amount_And_ExpireDate?.data
        ?.remaining_amount || 0),
    gemExchangeValue: gemExchangeValue,
    type: privateProductData?.type === "one-time" ? "one-time" : "",
  });

  const neededGemForGift = calcNeededGEM({
    price:
      giftName === "gold" || localStorage.getItem("stableGiftSlug") === "gold"
        ? goldDataVariation?.price * goldDataVariation?.duration
        : privateProductData?.pricing?.price,
    maxAmount: 1,
    gemExchangeValue: gemExchangeValue,
    type: privateProductData?.type === "one-time" ? "one-time" : "",
  });
  const { needingOneGem } = useSelector(
    (state: RootReduxState) => state.freemuimBoardHome
  );

  return (
    <Box className="needed-gem-title">
      <Typography className="title-infos">
        <Typography variant="caption" sx={{ color: theme.palette.system.blue }}>
          {pathname.split("/").includes("suggestedFriends")
            ? neededGemForGift - studentTotalGem || (
                <Skeleton variant="rectangular" animation={false} />
              )
            : needingOneGem || localStorage.getItem("needingOneGem")
            ? (needingOneGem || typeof window !== "undefined"
                ? Number(window.localStorage.getItem("needingOneGem"))
                : 0) - studentTotalGem || (
                <Skeleton variant="rectangular" animation={false} />
              )
            : neededGem - studentTotalGem || (
                <Skeleton variant="rectangular" animation={false} />
              )}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: `${theme.palette.gray["1"]} !important`,
          }}
        >
          {" "}
          تا
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.system.blue }}>
          {" "}
          الماس{" "}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: `${theme.palette.gray["1"]} !important`,
          }}
        >
          کم داری. میتونی از طریق خرید بسته های پایین, الماس اضافه کنی
        </Typography>
      </Typography>
    </Box>
  );
}

export default NeededGemTitle;
