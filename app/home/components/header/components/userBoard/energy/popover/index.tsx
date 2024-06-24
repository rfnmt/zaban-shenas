import { Popover, Slide, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import RemainingAmountEnergyIcons from "./remainingAmountEnergyIcons";
import RemainingAmountEnergyState from "./remainingAmountEnergyState";
import PurchaseItemsToGetMoreEnergy from "./purchaseItemsToGetMoreEnergy";
import { RootReduxState } from "@/providers/Redux/store";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/app/home/index.interfaces";
import { doIHaveThisProduct } from "@/modules/helper";

import "./styles.scss";

type IProps = {
  anchor: HTMLButtonElement | null;
  closePopover: () => void;
};

function EnergyPopover({ anchor, closePopover }: IProps) {
  const theme = useTheme() as any;
  const open = Boolean(anchor);

  const { boardVisiblity } = useSelector(
    (state: RootReduxState) => state.freemuimBoardHome
  );

  const id = boardVisiblity ? "energy-popover" : undefined;

  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const _doIHaveThisProduct = useMemo(() => {
    const find = cachedUserCurrentCourseAllData?.courses.find(
      (item) => item.id === cachedUserCurrentCourseId
    );

    const _purchasable = find?.data.purchasable;

    if (_purchasable) return doIHaveThisProduct(_purchasable);
    return false;
  }, [cachedUserCurrentCourseAllData]);

  return (
    <Popover
      id={id}
      open={boardVisiblity}
      TransitionComponent={Slide}
      className="home-energy-popover"
      onClose={closePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      sx={{
        "& .MuiBackdrop-root": { backgroundColor: "blackTransparent.1" },
        "& .MuiPaper-root": {
          backgroundColor: "background.main",
          "&:before": {
            backgroundColor: `${theme.palette.background.main}`,
            borderTop: `1px solid ${theme.palette.border.main}`,
            borderLeft: `1px solid ${theme.palette.border.main}`,
          },
        },
      }}
      anchorEl={document.getElementsByClassName("thunder-item")[0]}
    >
      {_doIHaveThisProduct ? (
        <>
          <Typography className="fa-body" sx={{ color: "success.main" }}>
            بی نهایت
          </Typography>
          <Typography
            className="fa-tag"
            sx={{ color: "gray.1", direction: "rtl" }}
          >
            شما در حال حاضر اشتراک ویژه دارید و با جون بی نهایت در حال یادگیری
            هستید.
          </Typography>
        </>
      ) : (
        <>
          <RemainingAmountEnergyIcons />
          <RemainingAmountEnergyState />
          <PurchaseItemsToGetMoreEnergy />
        </>
      )}
    </Popover>
  );
}

export default EnergyPopover;
