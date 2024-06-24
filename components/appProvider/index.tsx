"use client";

import axios from "axios";
import React, { memo, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import _dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

import { theme } from "@/modules/theme/themes";
import { RootReduxState } from "@/providers/Redux/store";
import { signOut } from "@/providers/Redux/user/userSlice";
import {
  clearCache,
  getWindowDimensions,
  removeURLParam,
} from "@/modules/helper";
import { APP_NODE_ENV } from "@/env";
import {
  handleGiftSwiperValue,
  handleOpenGiftBottomSheet,
  setOpenActivationBottomSheet,
  setOpenBuyingGemBottomSheet,
} from "@/providers/Redux/general/generalSlice";
import CommonErrorSnackBar from "../../app/profile/components/errorSnackBar";
import CommonSuccessSnackBar from "../../app/profile/components/successSnackbar";

import ProductCheckoutBottomsheet from "../productCheckoutbottomsheet";
import ProductBottomSheet from "../productBottomsheet";
import SplashScreen from "../spalashScreen";
import CheckoutSuccessfulBottomSheet from "@/components/checkoutSuccessfulBottomSheet";
import LogoutModal from "@/components/logoutModal";
import ReportSpecialContentBottomSheet from "@/components/reportSpecialContentBottomSheet";
import LogoutFromQuestionTestModal from "@/components/logoutFromQuestionTestModal";
import ReportBottomSheet from "@/components/reportBottomsheet";
import DefineRoutes from "./routes";
import ActivationBottomSheet from "@/components/activationBottomSheet";
import BuyingGemBottomSheet from "@/components/buyingGemBottomSheet";
import Loading from "@/components/loading/index.tsx";

const ThemeSwitcher = _dynamic(() => import("../themeSwitcher"));

import "./styles.scss";

function AcademyRootLayout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  useEffect(() => {
    let vh = window?.innerHeight || 0;
    let ra = getWindowDimensions().ratio || 0;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--ra", `${ra}px`);

    return () => {};
  }, []);

  const { token } = useSelector((state: RootReduxState) => state.user);
  const visibleLoading = useSelector(
    (state: RootReduxState) => state.loading.config.visible
  );

  const { mode, fetchSyncRequestStatus } = useSelector(
    (state: RootReduxState) => state.general
  );

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const memorizedTheme = useMemo(() => {
    return mode === "prefers-color-scheme"
      ? theme(prefersDarkMode ? "dark" : "light")
      : theme(mode);
  }, [mode, prefersDarkMode]);

  if (token) axios.defaults.headers.common["Authorization"] = token;

  axios.interceptors.response.use(
    (response) => response,
    async function (error) {
      const { response } = error;

      if (!response) {
        return Promise.reject("خطایی رخ داده ‌است");
      } else {
        const { status } = response;
        if (status === 403 || status === 401) {
          await clearCache();
          dispatch(signOut());
          router.replace("/signup");
        } else {
          return Promise.reject("خطایی رخ داده ‌است" + error?.response);
        }
      }
    }
  );

  const routes = DefineRoutes();

  const contextualComponentRender = useMemo(() => {
    return pathname === "/signup"
      ? "children"
      : fetchSyncRequestStatus !== "done"
      ? "splash-screen"
      : "children";
  }, [fetchSyncRequestStatus, pathname]);

  const closeSnackBar = () => {
    setOpenErrorSnackbar(false);
    setOpenSuccessSnackbar(false);
  };
  useEffect(() => {
    if (searchParams.get("sheet-gem-success") === "true") {
      setOpenSuccessSnackbar(true);
      dispatch(setOpenBuyingGemBottomSheet(false));
      dispatch(setOpenActivationBottomSheet(true));
      localStorage.removeItem("needingOneGem");
    } else if (searchParams.get("sheet-gem-success") === "false") {
      setOpenErrorSnackbar(true);
      dispatch(setOpenBuyingGemBottomSheet(true));
      dispatch(setOpenActivationBottomSheet(true));
    }

    if (searchParams.get("gift-gem-success") === "true") {
      setOpenSuccessSnackbar(true);
      // dispatch(setOpenBuyingGemBottomSheet(false));
      dispatch(handleGiftSwiperValue(1));
      dispatch(handleOpenGiftBottomSheet(true));
    } else if (searchParams.get("gift-gem-success") === "false") {
      setOpenErrorSnackbar(true);
      // dispatch(setOpenBuyingGemBottomSheet(true));
      dispatch(handleGiftSwiperValue(1));
      dispatch(handleOpenGiftBottomSheet(true));
    }
    window.history.pushState(
      "",
      document.title,
      removeURLParam(window.location.href, "sheet-gem-success")
    );

    window.history.pushState(
      "",
      document.title,
      removeURLParam(window.location.href, "gift-gem-success")
    );
  }, []);

  return (
    <ThemeProvider theme={memorizedTheme}>
      <CssBaseline />
      <Box bgcolor="background.main" className="academy-root-layout">
        {APP_NODE_ENV !== "production" && <ThemeSwitcher />}

        {contextualComponentRender === "splash-screen" ? (
          <SplashScreen key="splash-screen" />
        ) : (
          <AnimatePresence
            onExitComplete={() => window.scrollTo(0, 0)}
            mode="wait"
          >
            {routes.map(
              (route) =>
                route.path === pathname && (
                  <div className="page-wrapper" key={route.key}>
                    {route.component}
                  </div>
                )
            )}
          </AnimatePresence>
        )}
        <ActivationBottomSheet />
        <BuyingGemBottomSheet />
        <ReportBottomSheet />
        <LogoutFromQuestionTestModal />
        <LogoutModal />
        <ProductBottomSheet />
        <ProductCheckoutBottomsheet />
        <CheckoutSuccessfulBottomSheet />
        <ReportSpecialContentBottomSheet />
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
        {visibleLoading && <Loading />}
      </Box>
    </ThemeProvider>
  );
}

export default memo(AcademyRootLayout);
