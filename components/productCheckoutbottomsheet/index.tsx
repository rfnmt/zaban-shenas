"use client";
import React, { useState, useEffect } from "react";
import Sheet from "react-modal-sheet";
import Cookie from "js-cookie";
import {
  setOpenCheckoutBottomSheet,
  setOpenProductBottomSheet,
  setCheckoutSuccessfulBottomSheet,
  setCheckoutSuccessfulBottomSheetData,
} from "@/providers/Redux/general/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_APP_URL } from "@/env";
import Z3DButton from "../Z3DButton";
import CommonBottomSheetHeader from "../commonBottomSheetHeader";
import { useCheckoutData } from "./hook";
import ProductCheckoutBottomSheetBody from "../productCheckoutBottomSheetBody";
import { removeURLParam } from "@/modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { useShopMutation } from "../spalashScreen/hook/useShopMutation";
import LottieLoading from "../lottieLoading";
import { commonApiPurchase } from "@/modules/commonApi";
import { CheckoutDataType } from "./checkout.interface";
import CommonErrorSnackBar from "@/app/profile/components/errorSnackBar";
import { useStudentAPI } from "@/app/setting/store/hook";
import "./style.scss";

function ProductCheckoutBottomsheet() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userID = useSelector((state: RootReduxState) => state.user.id);
  // if we use false in gem_wallet instead of null
  // in page reloading checkout is being called
  const [gem_wallet, setGem_wallet] = useState<boolean | null>(null);
  const [purchasLoading, setPurchasLoading] = useState<boolean>(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const info_checkout: any | undefined =
    queryClient.getQueryData<CheckoutDataType>([
      "check-out",
      Number(Cookie.get("parentID")),
      Number(Cookie.get("productID")),
    ]);
  const { mutate: requestToGetShopData } = useShopMutation();
  const { mutate: getStudentData } = useStudentAPI();
  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;
  const goldData = shopData?.purchasables?.find(
    (item: any, index: number) => item?.data?.slug === "gold"
  );
  const { openCheckoutBottomsheet } = useSelector(
    (state: any) => state.general
  );
  const { fetchSyncRequestStatus } = useSelector(
    (state: RootReduxState) => state.general
  );

  function handleSuccessfulPurchase() {
    requestToGetShopData();
    if (userID) getStudentData(userID);
    window.history.pushState(
      "",
      document.title,
      removeURLParam(window.location.href, "checkout-success")
    );
    setGem_wallet(false);
    dispatch(setCheckoutSuccessfulBottomSheet(true));
    dispatch(setOpenCheckoutBottomSheet(false));
    dispatch(setOpenProductBottomSheet(false));
    // we need shop data to get expiration time for subscription
    dispatch(
      setCheckoutSuccessfulBottomSheetData({
        title: goldData?.data?.title,
        pic: goldData?.data?.images?.thumbnail,
        purchaseTag: info_checkout?.purchase_tag,
      })
    );
    setOpenErrorSnackbar(false);
  }

  const openPaymentLink = () => {
    let redirect_url = "";
    let fail_redirect_url = "";
    redirect_url = NEXT_PUBLIC_APP_URL + `${pathname}?checkout-success=success`;
    fail_redirect_url =
      NEXT_PUBLIC_APP_URL + `${pathname}?checkout-success=failed`;
    setPurchasLoading(true);
    commonApiPurchase({
      product_id: Number(Cookie.get("parentID")),
      variation_id: Number(Cookie.get("productID")),
      redirect_url: redirect_url,
      fail_redirect_url: fail_redirect_url,
      monetize_location: "product_page",
      use_gem: gem_wallet === null || gem_wallet === false ? false : true,
    })
      .then((res) => {
        setPurchasLoading(false);
        if (info_checkout.final_price === 0) {
          handleSuccessfulPurchase();
        } else {
          dispatch(setOpenCheckoutBottomSheet(false));
          window.open(res?.data?.payment_link, "_self");
        }
      })
      .catch((err) => {
        console.log(err);
        setPurchasLoading(false);
      });
  };

  useEffect(() => {
    if (fetchSyncRequestStatus === "done") {
      if (searchParams.get("checkout-success") === "success") {
        handleSuccessfulPurchase();
      }
      if (searchParams.get("checkout-success") === "failed") {
        window.history.pushState(
          "",
          document.title,
          removeURLParam(window.location.href, "checkout-success")
        );
        setGem_wallet(false);
        dispatch(setOpenProductBottomSheet(true));
        dispatch(setOpenCheckoutBottomSheet(true));
        setOpenErrorSnackbar(true);
      }
    }
  }, [fetchSyncRequestStatus]);

  /*-------------*/
  /*-------------*/
  /*-------------*/
  /*-------------*/
  /*-------------*/
  /*-------------*/

  const { mutate: finalCheckoutData, isPending: checkoutLoading } =
    useCheckoutData(
      Number(Cookie.get("parentID")),
      Number(Cookie.get("productID"))
    );
  useEffect(() => {
    if (fetchSyncRequestStatus === "done") {
      if (openCheckoutBottomsheet === true && !info_checkout) {
        finalCheckoutData({
          product_id: Number(Cookie.get("parentID")),
          variation_id: Number(Cookie.get("productID")),
          use_gem: gem_wallet === null || gem_wallet === false ? false : true,
        });
      }
    }
  }, [openCheckoutBottomsheet, fetchSyncRequestStatus]);
  useEffect(() => {
    if (gem_wallet === true || gem_wallet === false) {
      finalCheckoutData({
        product_id: Number(Cookie.get("parentID")),
        variation_id: Number(Cookie.get("productID")),
        use_gem: gem_wallet === null || gem_wallet === false ? false : true,
      });
    }
  }, [gem_wallet]);

  const closeCheckoutBottomSheet = () => {
    setGem_wallet(false);
    dispatch(setOpenCheckoutBottomSheet(false));
  };
  const closeSnackBar = () => {
    setOpenErrorSnackbar(false);
  };

  return (
    <>
      <Sheet
        className="checkout-bottomSheet"
        onClose={closeCheckoutBottomSheet}
        isOpen={openCheckoutBottomsheet}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header>
            <CommonBottomSheetHeader title="صورتحساب" />
          </Sheet.Header>
          <Sheet.Content>
            <LottieLoading
              open_lottie={checkoutLoading || purchasLoading}
              lottie_className="activation-product-purchase-loading"
            />
            <ProductCheckoutBottomSheetBody
              title="اشتراک ویژه"
              subtitle={info_checkout?.purchase_tag}
              details={info_checkout?.details}
              gem_amount={info_checkout?.gem_amount}
              gem_value={info_checkout?.gem_value}
              handleSwitch={() => setGem_wallet(!gem_wallet)}
              gem_wallet={gem_wallet}
            />

            <Box
              sx={{
                backgroundColor: "background.main",
              }}
              className="payment-button"
            >
              <Z3DButton onClick={openPaymentLink}>پرداخت</Z3DButton>
            </Box>

            <CommonErrorSnackBar
              openErrorSnackbar={openErrorSnackbar}
              closeSnackBar={closeSnackBar}
              text="پرداخت ناموفق بود!"
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={closeCheckoutBottomSheet} />
      </Sheet>
    </>
  );
}

export default ProductCheckoutBottomsheet;
