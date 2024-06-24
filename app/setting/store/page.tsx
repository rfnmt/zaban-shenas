"use client";
import React, { Key, useEffect, useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useShopMutation } from "@/components/spalashScreen/hook/useShopMutation";
import PurchaseableItem from "./components/purchaseables";
import { IShop } from "./store.interfaces";
import { removeURLParam } from "@/modules/helper";
import { useStudentAPI } from "./hook";
import { RootReduxState } from "@/providers/Redux/store";
import { setwholeStudentRemaindGems } from "@/providers/Redux/setting/shop/shopSlice";
import { IStudentData } from "@/models/studentData.interfaces";
import "./store.scss";
import CommonErrorSnackBar from "@/app/profile/components/errorSnackBar";
import CommonSuccessSnackBar from "@/app/profile/components/successSnackbar";

function Store() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Array<any>>([]);
  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;
  const { mutate: requestToGetShopData } = useShopMutation();

  const { id } = useSelector((state: RootReduxState) => state.user);

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

  const { mutate: getStudentData } = useStudentAPI();

  useEffect(() => {
    if (!studentData && id) {
      getStudentData(id);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData, id]);

  const studentTotalGem = studentData?.attributes?.data?.find(
    (item: any) => item.name === "gem"
  )?.value;

  dispatch(setwholeStudentRemaindGems(studentTotalGem));

  const { fetchSyncRequestStatus } = useSelector(
    (state: RootReduxState) => state.general
  );

  useEffect(() => {
    if (fetchSyncRequestStatus === "done") {
      if (shopData) {
        const data = [];

        for (const purchasable_bundle of shopData?.purchasable_bundle) {
          for (const container of purchasable_bundle?.data?.containers) {
            data.push(container);
          }
        }

        setOrder(data);
      } else {
        requestToGetShopData();
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData]);

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const closeSnackBar = () => {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  };

  function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  useEffect(() => {
    if (searchParams.get("store-gem-success") === "true") {
      setOpenSuccessSnackbar(true);
    } else if (searchParams.get("store-gem-success") === "false") {
      setOpenErrorSnackbar(true);
    }
    window.history.pushState(
      "",
      document.title,
      removeURLParam(window.location.href, "store-gem-success")
    );
  }, []);

  return (
    <>
      <Box
        className="container store-content"
        onLoad={
          searchParams.get("store-gem-success") !== null
            ? scrollDown
            : undefined
        }
      >
        {order.map((orderItem, key: Key) => {
          return <PurchaseableItem key={key} data={orderItem} />;
        })}
      </Box>
      <CommonErrorSnackBar
        openErrorSnackbar={openErrorSnackbar}
        closeSnackBar={closeSnackBar}
        text="پرداخت ناموفق بود !"
      />
      <CommonSuccessSnackBar
        openSuccessSnackbar={openSuccessSnackbar}
        closeSnackBar={closeSnackBar}
        type="success-buying-from-store"
      />
    </>
  );
}

export default Store;
