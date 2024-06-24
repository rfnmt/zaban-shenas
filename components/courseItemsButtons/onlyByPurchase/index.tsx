import React from "react";
import { Button, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import Icon from "@/components/icon";
import { doIHaveThisProduct } from "@/modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import DisableAndLocked from "../disableAndLocked";
import { renderButtonTitle } from "../helpers";
import { setOpenProductBottomSheet } from "@/providers/Redux/general/generalSlice";

function OnlyByPurchase({ purchaseID, studyPercent, callback }) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const shopData = queryClient.getQueryData(["shop-data"]) as any;

  const itemPurchasableData = shopData?.purchasables?.find(
    (item: any) => item.id === purchaseID
  );

  const _shop_meta_data = shopData?.shop_meta_data?.data;

  if (doIHaveThisProduct(purchaseID))
    return (
      <Button
        variant="contained"
        onClick={callback}
        className="start-study-lesson"
        sx={{
          boxShadow: "0 1px 1px rgba(0,0,0,.16)",
          color: "white.fix",
          background: theme.palette.secondary.main,
          "&:hover": {
            background: theme.palette.secondary.main,
          },
        }}
      >
        {renderButtonTitle(studyPercent)}
      </Button>
    );
  else {
    if (itemPurchasableData?.data?.type === "one-time") {
      return (
        <Button
          variant="contained"
          className="start-study-lesson"
          sx={{
            boxShadow: "0 1px 1px rgba(0,0,0,.16)",
            color: "white.fix",
            background: theme.palette.secondary.main,
            "&:hover": {
              background: theme.palette.secondary.main,
            },
          }}
        >
          {renderButtonTitle(studyPercent)}
          {(Math.round(itemPurchasableData?.data?.pricing?.price / 1000) *
            1000) /
          _shop_meta_data?.gem_exchange_value ? (
            <div style={{ marginRight: 20, display: "flex" }}>
              {(Math.round(itemPurchasableData?.data?.pricing?.price / 1000) *
                1000) /
                _shop_meta_data?.gem_exchange_value}
              <Icon icon="zabanshenas" style={{ marginRight: 10 }} size={24} />
            </div>
          ) : (
            ""
          )}
        </Button>
      );
    } else if (itemPurchasableData?.data?.type === "subscription") {
      return (
        <Button
          variant="contained"
          onClick={() => {
            // show product bottom sheet
            // dispatch(setOpenProductBottomSheet(true));
            router.push(`${pathname}?product=true`);
          }}
          className="start-study-lesson"
          sx={{
            boxShadow: "0 1px 1px rgba(0,0,0,.16)",
            color: theme.palette.white.fix,
            background: theme.palette.secondary.main,
            "&:hover": {
              background: theme.palette.secondary.main,
            },
          }}
        >
          شروع
        </Button>
      );
    } else {
      return <DisableAndLocked />;
    }
  }
}

export default OnlyByPurchase;
