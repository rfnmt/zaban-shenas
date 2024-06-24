import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  handleOpenGiftBottomSheet,
  handleOpenSuccessfulGiftBottomSheet,
  setGiftName,
  setGiftVariationTitle,
  setOpenBuyingGemBottomSheet,
  handleGiftSwiperValue,
} from "@/providers/Redux/general/generalSlice";
import Sheet from "react-modal-sheet";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import GiftBottomSheetHeader from "./header";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import GiftSubscription from "./giftSubscriptions";
import GiftBottomsheetElement from "./giftBottomsheetElements";
import { Box, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import Image from "next/image";
import Z3DButton from "@/components/Z3DButton";
import { NEXT_PUBLIC_APP_URL } from "@/env";
import { usePathname, useSearchParams } from "next/navigation";
import { SuggestFreindRootData } from "../../../interfaces";
import { useGiftShopAPI } from "@/app/profile/hook";
import { IGiftShop } from "./giftBottomsheet.interfaces";
import LottieLoading from "@/components/lottieLoading";
import { IStudentData } from "@/models/studentData.interfaces";
import { commonApiCheckout, commonApiPurchase } from "@/modules/commonApi";
import LeveltwoMessage from "./leveltwoMessage";
import LeveltwoGiftComponents from "./levelTwoGiftComponents";
import LevelTitle from "./levelTitle";
import UserNameAndUserPic from "../userNameAndUserPic";
import GiftDialogueText from "../giftDialogueText";
import Lottie from "react-lottie-player";
import * as threeDotslottieAnimation from "@/public/lottie-files/3Dots.json";
import { useStudentAPI } from "@/app/setting/store/hook";
import "./style.scss";

function GiftBottomSheet() {
  const theme = useTheme() as any;
  const pathname = usePathname();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { openGiftBottomSheet, suggestedFriendID, giftSwiperValue } =
    useSelector((state: RootReduxState) => state.general);
  const { id } = useSelector((state: RootReduxState) => state.user);
  const [checkoutData, setCheckoutData] = useState<any>({});
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [variationTitle, setVariationTitle] = useState<string>("");
  const [typeOfComponent, setTypeOfComponent] = useState<any>({
    slug: "",
    title: "",
    price: 0,
    productID: null,
    parentID: null,
  });
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    suggestedFriendID === null
      ? Number(pathname.split("/")[3])
      : suggestedFriendID,
  ]);
  const studentTotalGem = studentData?.attributes?.data?.find(
    (item: any) => item.name === "gem"
  )?.value;
  const { mutate: getStudentData } = useStudentAPI();
  const { mutate: mutateAllGifts, isPending: botommsheetLoading } =
    useGiftShopAPI();
  const giftShopData = queryClient.getQueryData(["gift-shop"]) as IGiftShop;
  useEffect(() => {
    if (openGiftBottomSheet && !giftShopData) {
      mutateAllGifts({
        discounts: [],
        purchasable_bundle: [
          {
            checksum: 1688917718368,
            id: 2,
          },
        ],
        purchasables: [
          {
            checksum: 1703174734946,
            id: 4,
          },
          {
            checksum: 1698831768931,
            id: 5,
          },
          {
            checksum: 1689764472063,
            id: 6,
          },
          {
            checksum: 1703927184311,
            id: 7,
          },
        ],
        purchased_products: [
          {
            checksum: 1696058167098,
            id: 4,
          },
          {
            checksum: 1703278434855,
            id: 5,
          },
          {
            checksum: 1701618939890,
            id: 6,
          },
        ],
      });
    }
  }, [giftShopData, openGiftBottomSheet]);

  const [availableGifts, setAvailableGifts] = useState<Array<any>>([]);
  const [goldGifts, setGoldGifts] = useState<Array<any>>([]);
  useEffect(() => {
    if (searchParams.get("gift-gem-success") === "true") {
      setTypeOfComponent((prev: any) => ({
        ...prev,
        slug: localStorage.getItem("stableGiftSlug"),
        title: localStorage.getItem("stableGiftTitle"),
        price: localStorage.getItem("stableGiftPrice"),
        productID: localStorage.getItem("stableGiftProductID"),
        parentID: localStorage.getItem("stableGiftParentID"),
      }));
    } else if (searchParams.get("gift-gem-success") === "false") {
      setTypeOfComponent((prev: any) => ({
        ...prev,
        slug: localStorage.getItem("stableGiftSlug"),
        title: localStorage.getItem("stableGiftTitle"),
        price: localStorage.getItem("stableGiftPrice"),
        productID: localStorage.getItem("stableGiftProductID"),
        parentID: localStorage.getItem("stableGiftParentID"),
      }));
    }
    const giftsApartFromGold = giftShopData?.purchasables
      ?.map((item) => {
        if (
          item.data.slug === "booster" ||
          item.data.slug === "streak_freeze" ||
          item.data.slug === "one-time-test" ||
          item.data.slug === "placebo1" ||
          item.data.slug === "placebo2"
        ) {
          return item.data;
        }
      })
      .filter((item) => item !== undefined)
      .sort((a: any, b: any) => a.id - b.id);
    const giftGold = giftShopData?.purchasables
      ?.map((item) => {
        if (item.data.slug === "gold") {
          return item.data;
        }
      })
      .filter((item) => item !== undefined);
    setAvailableGifts(giftsApartFromGold);
    setGoldGifts(giftGold);
  }, [giftShopData?.purchasables, searchParams.get("gift-gem-success")]);

  const gemExchangeValue =
    giftShopData?.shop_meta_data?.data?.gem_exchange_value;

  function setLocalStorageItems() {
    localStorage.setItem("stableGiftParentID", typeOfComponent.parentID);
    localStorage.setItem("stableGiftPrice", typeOfComponent.price);
    localStorage.setItem("stableGiftProductID", typeOfComponent.productID);
    localStorage.setItem("stableGiftSlug", typeOfComponent.slug);
    localStorage.setItem("stableGiftTitle", typeOfComponent.title);
  }

  function removeLocalStorageItems() {
    localStorage.removeItem("stableGiftSlug");
    localStorage.removeItem("stableGiftTitle");
    localStorage.removeItem("stableGiftPrice");
    localStorage.removeItem("stableGiftProductID");
    localStorage.removeItem("stableGiftParentID");
    localStorage.removeItem("stableGiftVariationTitle");
  }

  function payGiftToFriend() {
    if (studentTotalGem > typeOfComponent.price) {
      if (typeOfComponent.slug === "gold") {
        commonApiCheckout({
          amount: 1,
          app_package: "zaban.amooz",
          fail_redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=false`,
          product_id: typeOfComponent.parentID,
          variation_id: typeOfComponent.productID,
          redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=true`,
          use_gem: true,
        })
          .then((res) => {
            setPaymentLoading(true);
            setCheckoutData(res.data);
          })
          .catch((err) => {
            console.log(err);
            setPaymentLoading(false);
          });
      } else {
        commonApiCheckout({
          amount: 1,
          app_package: "zaban.amooz",
          fail_redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=false`,
          product_id: typeOfComponent.productID,
          redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=true`,
          use_gem: true,
        })
          .then((res) => {
            setPaymentLoading(true);
            setCheckoutData(res.data);
          })
          .catch((err) => {
            console.log(err);
            setPaymentLoading(false);
          });
      }
    } else {
      setLocalStorageItems();
      dispatch(setOpenBuyingGemBottomSheet(true));
    }
  }

  useEffect(() => {
    if (Object.keys(checkoutData).length > 0) {
      if (typeOfComponent.slug === "gold") {
        commonApiPurchase({
          amount: 1,
          app_package: "zaban.amooz",
          fail_redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=false`,
          product_id: typeOfComponent.parentID,
          variation_id: typeOfComponent.productID,
          redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=true`,
          student_id: getSingleStudentData?.profile_data?.data?.id,
          use_gem: true,
        })
          .then((res) => {
            removeLocalStorageItems();
            dispatch(setGiftName(typeOfComponent.slug));
            dispatch(setGiftVariationTitle(variationTitle));
            dispatch(handleOpenSuccessfulGiftBottomSheet(true));
            dispatch(handleGiftSwiperValue(0));
            setTypeOfComponent({});
            setCheckoutData({});
            dispatch(handleOpenGiftBottomSheet(false));
            setPaymentLoading(false);
            // calling getStudentData(id) will update Gem amount after giving gift to the friend
            // so we don't need page refresh
            getStudentData(id);
          })
          .catch((err) => {
            console.log(err);
            setPaymentLoading(false);
          });
      } else {
        commonApiPurchase({
          amount: 1,
          app_package: "zaban.amooz",
          fail_redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=false`,
          product_id: typeOfComponent.productID,
          redirect_url:
            NEXT_PUBLIC_APP_URL + `${pathname}?gift-gem-success=true`,
          student_id: getSingleStudentData?.profile_data?.data?.id,
          use_gem: true,
        })
          .then((res) => {
            removeLocalStorageItems();
            dispatch(setGiftName(typeOfComponent.slug));
            dispatch(handleOpenSuccessfulGiftBottomSheet(true));
            dispatch(handleGiftSwiperValue(0));
            setTypeOfComponent({});
            setCheckoutData({});
            dispatch(handleOpenGiftBottomSheet(false));
            setPaymentLoading(false);
            // calling getStudentData(id) will update Gem amount after giving gift to the friend
            // so we don't need page refresh
            getStudentData(id);
          })
          .catch((err) => {
            console.log(err);
            setPaymentLoading(false);
          });
      }
    }
  }, [checkoutData]);

  function closeAndRemove() {
    dispatch(handleGiftSwiperValue(0));
    setTypeOfComponent({});
    dispatch(handleOpenGiftBottomSheet(false));
    removeLocalStorageItems();
  }

  return (
    <Sheet
      onClose={() => closeAndRemove()}
      isOpen={openGiftBottomSheet}
      detent="full-height"
      className="gift-bottomsheet"
    >
      <Sheet.Container>
        <Sheet.Header>
          <GiftBottomSheetHeader />
        </Sheet.Header>
        <SwipeableViews index={giftSwiperValue} disabled={true}>
          <Box className="giftTypeSlides">
            <Box
              sx={{ backgroundColor: "background.main" }}
              className="wrap-all-gifts"
            >
              <LottieLoading open_lottie={botommsheetLoading} />
              <LevelTitle title="انتخاب هدیه" level="(مرحله 1 از 2)" />
              {availableGifts?.length > 0 &&
                availableGifts?.map((item) => {
                  return (
                    <GiftBottomsheetElement
                      key={item.id}
                      data={item}
                      gemExchangeValue={gemExchangeValue}
                      setTypeOfComponent={setTypeOfComponent}
                    />
                  );
                })}

              {goldGifts?.length > 0 &&
                goldGifts?.map((item) => {
                  return (
                    <GiftSubscription
                      key={item.id}
                      data={item}
                      gemExchangeValue={gemExchangeValue}
                      setTypeOfComponent={setTypeOfComponent}
                      setVariationTitle={setVariationTitle}
                    />
                  );
                })}
            </Box>
          </Box>
          <Box className="giftTypeSlides second-slide">
            <Box sx={{ backgroundColor: "background.main", height: "100%" }}>
              <LevelTitle title=" تایید و ارسال " level="(مرحله 2 از 2)" />
              <Box
                className="message-to-user"
                sx={{
                  background: theme.palette.primary.min,
                  "& svg": {
                    "& path:first-of-type": {
                      fill: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <Icon icon="info-black" size={24} />
                <LeveltwoMessage
                  giftMessage={typeOfComponent.slug}
                  title={typeOfComponent.title}
                />
              </Box>
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
                {availableGifts?.length > 0 ? (
                  <LeveltwoGiftComponents
                    availableGifts={availableGifts}
                    goldGifts={goldGifts}
                    slug={typeOfComponent.slug}
                    variationTitle={variationTitle}
                  />
                ) : (
                  <></>
                )}
              </Box>

              <Z3DButton className="gift-payment" onClick={payGiftToFriend}>
                {paymentLoading ? (
                  <Lottie
                    className="threeDots-animation"
                    play={true}
                    loop={true}
                    animationData={threeDotslottieAnimation}
                  />
                ) : (
                  <>
                    <Image
                      src="/svg/diamond.svg"
                      width={20}
                      height={20}
                      alt=""
                    />
                    &nbsp;
                    {new Intl.NumberFormat("en-US").format(
                      typeOfComponent.price
                    )}
                    &nbsp; ارسال
                  </>
                )}
              </Z3DButton>
            </Box>
          </Box>
        </SwipeableViews>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => closeAndRemove()} />
    </Sheet>
  );
}

export default GiftBottomSheet;
