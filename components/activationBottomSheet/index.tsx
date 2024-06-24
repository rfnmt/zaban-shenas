import { Box, Button, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import { useSelector, useDispatch } from "react-redux";
import Z3DButton from "../Z3DButton";
import {
  setOpenActivationBottomSheet,
  setOpenBuyingGemBottomSheet,
  setActivationProductCheckoutData,
  setBoosterSuccessBottomSheet,
  set_SendProductDataToSuccessBottomSheet,
  set_common_successful_bottomsheet,
} from "@/providers/Redux/general/generalSlice";
import { callTransientConsumption } from "../productCheckoutbottomsheet/hook";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useShopMutation } from "../spalashScreen/hook/useShopMutation";
import { useStudentAPI } from "@/app/setting/store/hook";
import { RootReduxState } from "@/providers/Redux/store";
import { calcNeededGEM } from "@/modules/helper";
import ReTryRequest from "../retryRequest";
import {
  setwholeStudentRemaindGems,
  updateBoosterExpiryDate,
  updatePlacebo2ExpiryDate,
} from "@/providers/Redux/setting/shop/shopSlice";
import LottieLoading from "../lottieLoading";
import CommonBottomSheetHeader from "../commonBottomSheetHeader";
import ActivationBottomSheetBodyContent from "./components/activationBottomSheetBodyContent";
import Image from "next/image";
import { IStudentData } from "@/models/studentData.interfaces";
import { CheckoutDataType } from "../productCheckoutbottomsheet/checkout.interface";
import {
  setNeedingOneGem,
  setRemainedEnergy,
} from "@/providers/Redux/home/freemuim/freemuimBoardHomeSlice";
import { settingStore } from "@/app/setting/store/api";
import CommonSuccessSnackBar from "@/app/profile/components/successSnackbar";
import { commonApiCheckout, commonApiPurchase } from "@/modules/commonApi";
import "./style.scss";

function ActivationBottomSheet() {
  const theme = useTheme() as any;
  const { openActivationBottomSheet } = useSelector(
    (state: any) => state.general
  );
  const dispatch = useDispatch();
  const userID = useSelector((state: RootReduxState) => state.user.id);
  const { needingOneGem } = useSelector(
    (state: RootReduxState) => state.freemuimBoardHome
  );
  const { fetchSyncRequestStatus } = useSelector(
    (state: RootReduxState) => state.general
  );
  const shopData: any = queryClient.getQueryData(["shop-data"]);
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

  const { mutate: requestToGetShopData } = useShopMutation();
  const { mutate: getStudentData } = useStudentAPI();

  useEffect(() => {
    if (openActivationBottomSheet) {
      if (!studentData && userID) {
        getStudentData(userID);
      }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData, userID]);

  const gemExchangeValue: any =
    shopData?.shop_meta_data?.data?.gem_exchange_value;

  const studentTotalGem = studentData?.attributes?.data?.find(
    (item: any) => item.name === "gem"
  )?.value;

  const remainingAmountAndExpireDate = shopData?.purchased_products.find(
    (item: any) => item.id === Number(localStorage.getItem("activationID"))
  );

  const privateProductData = shopData?.purchasables.find(
    (item: any) => item.id === Number(localStorage.getItem("activationID"))
  )?.data;

  //

  const neededGem = calcNeededGEM({
    price: privateProductData?.pricing?.price,
    maxAmount:
      privateProductData?.pricing?.max_amount -
      (remainingAmountAndExpireDate?.data?.remaining_amount || 0),
    gemExchangeValue: gemExchangeValue,
    type: privateProductData?.type === "one-time" ? "one-time" : "",
  });

  const remainingAmount =
    privateProductData?.pricing?.max_amount -
    (remainingAmountAndExpireDate?.data?.remaining_amount || 0);

  const [checkoutSuccessResponse, setCheckoutSuccessResponse] = useState({
    finalPrice: null,
    passCheckout: false,
    checkoutLoading: false,
    purchaseTag: "",
  });
  const [showErrorContent, setShowErrorContent] = useState(false);
  const [successfulPurchase, setSuccessfulPurchase] = useState(false);
  const [purchaseSuccessResponse, setPurchaseSuccessResponse] = useState("");
  function activateTheProduct() {
    // user can use gem
    if (!needingOneGem) {
      if (studentTotalGem >= neededGem) {
        setCheckoutSuccessResponse((prev: any) => ({
          ...prev,
          checkoutLoading: true,
        }));
        commonApiCheckout({
          product_id: privateProductData?.id,
          amount: remainingAmount,
          use_gem: true,
        })
          .then((res) => {
            setCheckoutSuccessResponse((prev: any) => ({
              ...prev,
              finalPrice: res.data.final_price,
              passCheckout: true,
              purchaseTag: res.data.purchase_tag,
            }));
          })
          .catch((err) => {
            console.log(err);
            setShowErrorContent(true);
            setCheckoutSuccessResponse((prev: any) => ({
              ...prev,
              finalPrice: null,
              passCheckout: false,
              checkoutLoading: false,
            }));
          });
      } else {
        // user need to buying gem, show bottomsheet for buying gem
        dispatch(setOpenBuyingGemBottomSheet(true));
      }
    }

    if (needingOneGem) {
      if (studentTotalGem >= needingOneGem) {
        setCheckoutSuccessResponse((prev: any) => ({
          ...prev,
          checkoutLoading: true,
        }));
        commonApiCheckout({
          product_id: privateProductData?.id,
          amount: 1,
          use_gem: true,
        })
          .then((res) => {
            setCheckoutSuccessResponse((prev: any) => ({
              ...prev,
              finalPrice: res.data.final_price,
              passCheckout: true,
              purchaseTag: res.data.purchase_tag,
            }));
          })
          .catch((err) => {
            console.log(err);
            setShowErrorContent(true);
            setCheckoutSuccessResponse((prev: any) => ({
              ...prev,
              finalPrice: null,
              passCheckout: false,
              checkoutLoading: false,
            }));
          });
      } else {
        localStorage.setItem("needingOneGem", needingOneGem);
        dispatch(setOpenBuyingGemBottomSheet(true));
      }
    }
  }

  useEffect(() => {
    if (
      checkoutSuccessResponse.passCheckout === true &&
      checkoutSuccessResponse.finalPrice === 0
    ) {
      commonApiPurchase({
        product_id: privateProductData?.id,
        monetize_location: "product_page",
        use_gem: true,
        amount: needingOneGem ? 1 : remainingAmount,
      })
        .then((res) => {
          setSuccessfulPurchase(true);
          localStorage.removeItem("needingOneGem");
          setPurchaseSuccessResponse(res.data.order_status);
          setCheckoutSuccessResponse((prev: any) => ({
            ...prev,
            finalPrice: null,
            passCheckout: false,
            checkoutLoading: false,
            purchaseTag: "",
          }));
        })
        .catch((err) => {
          setCheckoutSuccessResponse((prev: any) => ({
            ...prev,
            finalPrice: null,
            passCheckout: false,
            checkoutLoading: false,
            purchaseTag: "",
          }));
        });
    }
  }, [checkoutSuccessResponse.passCheckout]);

  useEffect(() => {
    if (fetchSyncRequestStatus === "done") {
      if (purchaseSuccessResponse === "success") {
        // decrease gem amount and show successful message
        dispatch(setOpenActivationBottomSheet(false));

        if (privateProductData?.type === "transient") {
          //show transient bottom sheet
          if (privateProductData?.slug === "booster") {
            dispatch(setBoosterSuccessBottomSheet(true));
            dispatch(
              set_SendProductDataToSuccessBottomSheet(privateProductData)
            );
            requestToGetShopData();
            if (userID) getStudentData(userID);
            const studentdata = queryClient.getQueryData<IStudentData>([
              "student-data",
            ]);

            const studentTotalGem = studentdata?.attributes?.data?.find(
              (item: any) => item.name === "gem"
            )?.value;

            dispatch(setwholeStudentRemaindGems(studentTotalGem));
            callTransientConsumption(privateProductData.id).then(function (
              response
            ) {
              const { data } = response;

              const specialProductID = data.purchased_products.find(
                (item: any, index: number) => {
                  return item.id === privateProductData.id;
                }
              );

              dispatch(
                updateBoosterExpiryDate(specialProductID?.data?.expiry_date)
              );
            });
          }
          if (privateProductData?.slug === "placebo2") {
            dispatch(set_common_successful_bottomsheet(true));
            dispatch(
              set_SendProductDataToSuccessBottomSheet(privateProductData)
            );
            dispatch(
              setActivationProductCheckoutData(
                checkoutSuccessResponse.purchaseTag
              )
            );
            requestToGetShopData();
            if (userID) getStudentData(userID);
            const studentdata = queryClient.getQueryData<IStudentData>([
              "student-data",
            ]);
            const studentTotalGem = studentdata?.attributes?.data?.find(
              (item: any) => item.name === "gem"
            )?.value;
            dispatch(setwholeStudentRemaindGems(studentTotalGem));

            callTransientConsumption(privateProductData.id).then(function (
              response
            ) {
              const { data } = response;

              const specialProductID = data.purchased_products.find(
                (item: any, index: number) => {
                  return item.id === privateProductData.id;
                }
              );

              dispatch(
                updatePlacebo2ExpiryDate(specialProductID?.data?.expiry_date)
              );
            });
          }
        } else if (privateProductData?.type === "consumable") {
          dispatch(set_common_successful_bottomsheet(true));
          dispatch(set_SendProductDataToSuccessBottomSheet(privateProductData));
          dispatch(
            setActivationProductCheckoutData(
              checkoutSuccessResponse.purchaseTag
            )
          );
          requestToGetShopData();
          if (userID) getStudentData(userID);
          const studentdata = queryClient.getQueryData<IStudentData>([
            "student-data",
          ]);

          const studentTotalGem = studentdata?.attributes?.data?.find(
            (item: any) => item.name === "gem"
          )?.value;

          dispatch(setwholeStudentRemaindGems(studentTotalGem));
        } else if (privateProductData?.type === "one-time") {
          dispatch(set_SendProductDataToSuccessBottomSheet(privateProductData));
          dispatch(set_common_successful_bottomsheet(true));
          dispatch(
            setActivationProductCheckoutData(
              checkoutSuccessResponse.purchaseTag
            )
          );
          requestToGetShopData();
          if (userID) getStudentData(userID);
          const studentdata = queryClient.getQueryData<IStudentData>([
            "student-data",
          ]);
          const studentTotalGem = studentdata?.attributes?.data?.find(
            (item: any) => item.name === "gem"
          )?.value;
          dispatch(setwholeStudentRemaindGems(studentTotalGem));
        } else if (privateProductData?.type === "energy") {
          requestToGetShopData();
          if (userID) getStudentData(userID);
          dispatch(
            setwholeStudentRemaindGems(
              needingOneGem
                ? studentTotalGem - needingOneGem
                : studentTotalGem - neededGem
            )
          );

          settingStore()
            .then((res) => {
              const getEnergyData = res.data.purchased_products.find(
                (item: any) => item.id === privateProductData?.id
              );
              dispatch(setRemainedEnergy(getEnergyData.data.remaining_amount));
            })
            .catch((err) => console.log(err));
        }
        setPurchaseSuccessResponse("");
        dispatch(setNeedingOneGem(null));
        localStorage.removeItem("needingOneGem");
      }
      // }
    }
  }, [purchaseSuccessResponse]);

  function closeActivationBottomSheet() {
    dispatch(setOpenActivationBottomSheet(false));
    dispatch(setOpenBuyingGemBottomSheet(false));
    setShowErrorContent(false);
    dispatch(setNeedingOneGem(null));
    localStorage.removeItem("needingOneGem");
  }

  function handleCloseSnackbar() {
    setSuccessfulPurchase(false);
  }
  // console.log({ studentTotalGem, needingOneGem, neededGem }, "BOTTOM");
  return (
    <>
      <Sheet
        className="activation-bottomSheet"
        detent="content-height"
        isOpen={openActivationBottomSheet}
        onClose={closeActivationBottomSheet}
      >
        <Sheet.Container>
          <Sheet.Header>
            <CommonBottomSheetHeader title={privateProductData?.slogan} />
          </Sheet.Header>
          <Sheet.Content>
            <LottieLoading
              open_lottie={checkoutSuccessResponse.checkoutLoading}
              lottie_className="activation-product-purchase-loading"
            />
            {showErrorContent ? (
              <div style={{ height: 287 }}>
                <ReTryRequest
                  callback={activateTheProduct}
                  // title={errorCheckoutData}
                />
              </div>
            ) : (
              <Box
                className="activationBuyingGem_body"
                sx={{ backgroundColor: "background.main" }}
              >
                <ActivationBottomSheetBodyContent
                  data={privateProductData && privateProductData}
                  remaining_amount={
                    remainingAmountAndExpireDate?.data?.remaining_amount || 0
                  }
                />
                <Z3DButton className="activation" onClick={activateTheProduct}>
                  <Box className="activation-label">
                    {privateProductData?.button?.purchase_label}&nbsp;
                  </Box>
                  {new Intl.NumberFormat("en-US").format(
                    needingOneGem ||
                      (typeof window !== "undefined"
                        ? Number(window.localStorage.getItem("needingOneGem"))
                        : 0) ||
                      neededGem
                  )}
                  &nbsp;
                  <Image
                    src="/svg/diamond.svg"
                    fill
                    alt=""
                    className="diamond"
                  />
                </Z3DButton>
                <Button
                  className="later"
                  onClick={closeActivationBottomSheet}
                  sx={{ color: theme.palette.system.blue }}
                >
                  بعدا
                </Button>
              </Box>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={closeActivationBottomSheet} />
      </Sheet>
      <CommonSuccessSnackBar
        openSuccessSnackbar={successfulPurchase}
        closeSnackBar={handleCloseSnackbar}
        type="energy"
      />
    </>
  );
}

export default ActivationBottomSheet;
