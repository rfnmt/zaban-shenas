import React, { useState } from "react";
import Sheet from "react-modal-sheet";
import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenBuyingGemBottomSheet } from "@/providers/Redux/general/generalSlice";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { NEXT_PUBLIC_APP_URL } from "@/env";
import { usePathname } from "next/navigation";
import { useTheme } from "@emotion/react";
import CommonBottomSheetHeader from "@/components/commonBottomSheetHeader";
import NeededGemTitle from "@/components/neededGemTitle";
import GemVariations from "@/components/gemVariations";
import { commonApiPurchase } from "@/modules/commonApi";
import "./style.scss";

function BuyingGemBottomSheet() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const theme = useTheme() as any;
  const [specificGemData, setSpecificGemData] = useState<any>({
    id: null,
    loading: false,
  });
  const shopData: any = queryClient.getQueryData(["shop-data"]);
  const gemVariationsData = shopData?.purchasables.find(
    (item: any, index: number) => item?.data?.type === "gem"
  );
  const { openBuyingGemBottomSheet } = useSelector(
    (state: any) => state.general
  );

  function handleGemVariations(productID: number, variationID: number) {
    const getVariationSpecificID =
      gemVariationsData?.data?.pricing?.variations.find(
        (item: any, index: number) => {
          return item.id === variationID;
        }
      )?.id;
    setSpecificGemData((prev: any) => ({
      ...prev,
      id: getVariationSpecificID,
      loading: true,
    }));

    let redirect_url = "";
    let fail_redirect_url = "";
    redirect_url =
      NEXT_PUBLIC_APP_URL +
      `${pathname}?${
        pathname.includes("profile") ? "gift-gem-success" : "sheet-gem-success"
      }=true`;
    fail_redirect_url =
      NEXT_PUBLIC_APP_URL +
      `${pathname}?${
        pathname.includes("profile") ? "gift-gem-success" : "sheet-gem-success"
      }=false`;

    commonApiPurchase({
      product_id: productID,
      variation_id: variationID,
      redirect_url: redirect_url,
      fail_redirect_url: fail_redirect_url,
      monetize_location: "product_page",
      use_gem: false,
    })
      .then((res) => {
        // console.log(res.data);
        setSpecificGemData((prev: any) => ({
          ...prev,
          loading: false,
        }));
        window.open(res?.data?.payment_link, "_self");
      })
      .catch((err) => {
        console.log(err);
        setSpecificGemData((prev: any) => ({
          ...prev,
          loading: false,
        }));
      });
  }

  return (
    <Sheet
      className="buying-gem-choices-bottomsheet"
      detent="content-height"
      isOpen={openBuyingGemBottomSheet}
      onClose={() => dispatch(setOpenBuyingGemBottomSheet(false))}
    >
      <Sheet.Container>
        <Sheet.Header>
          <CommonBottomSheetHeader title="!نیاز به الماس بیشتری داری" />
        </Sheet.Header>
        <Sheet.Content>
          <Box
            className="buying-gem-choices-body"
            sx={{ backgroundColor: "white.flexible" }}
          >
            <NeededGemTitle />

            <GemVariations
              gemVariations={gemVariationsData?.data?.pricing?.variations}
              productionID={gemVariationsData?.data?.id}
              handleGemVariations={handleGemVariations}
              loading={specificGemData.loading}
              specificVariationID={specificGemData.id}
            />
            <Button
              className="later"
              onClick={() => dispatch(setOpenBuyingGemBottomSheet(false))}
              sx={{ color: theme.palette.system.blue }}
            >
              بعدا
            </Button>
          </Box>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={() => dispatch(setOpenBuyingGemBottomSheet(false))}
      />
    </Sheet>
  );
}

export default BuyingGemBottomSheet;
