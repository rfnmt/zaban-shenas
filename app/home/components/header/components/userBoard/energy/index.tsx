import { Box, Button, Popover, Popper, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@/components/icon";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IPurchasables, IShop } from "@/app/setting/store/store.interfaces";
import EnergyPopover from "./popover";
import { RootReduxState } from "@/providers/Redux/store";
import {
  closeBoard,
  openBoard,
} from "@/providers/Redux/home/freemuim/freemuimBoardHomeSlice";
import { CurrentCourseInterface } from "@/app/home/index.interfaces";
import { doIHaveThisProduct } from "@/modules/helper";

function Energy() {
  const shopData = queryClient.getQueryData<IShop>(["shop-data"]);
  const dispatch = useDispatch();

  const { boardVisiblity, remainedEnergy } = useSelector(
    (state: RootReduxState) => state.freemuimBoardHome
  );

  const remainingAmount = useMemo(() => {
    const purchasable = shopData?.purchasables?.find(
      (item: IPurchasables) => item?.data?.type === "energy"
    );

    const purchasedProducts = shopData?.purchased_products.find(
      (item) => item.id === purchasable.id
    );

    // console.log({ purchasedProducts, purchasable });

    return purchasedProducts?.data.remaining_amount || 0;
  }, [shopData]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(openBoard());
  };

  const closePopover = () => {
    dispatch(closeBoard());
    setAnchorEl(null);
  };

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
    <>
      <EnergyPopover anchor={anchorEl} closePopover={closePopover} />
      <Button className="toggle-popover" onClick={openPopover}>
        {_doIHaveThisProduct ? (
          <Icon width={30} icon="infinity" />
        ) : (
          <>
            <Typography sx={{ color: "secondary.main" }}>
              {new Intl.NumberFormat("en-US").format(Number(remainedEnergy === 0 ? remainingAmount : remainedEnergy))}
            </Typography>
            <Icon width={20} icon="thunder" />
          </>
        )}
      </Button>
    </>
  );
}

export default Energy;
