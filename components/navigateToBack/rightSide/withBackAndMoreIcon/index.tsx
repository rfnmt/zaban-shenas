import React, { useMemo } from "react";

import { RootReduxState } from "@/providers/Redux/store";
import { useSelector } from "react-redux";
import AsButton from "./asButton";
import AsLink from "./asLink";

function WithBackAndMoreIcon() {
  const { visibleTipBottomSheet } = useSelector(
    (state: RootReduxState) => state.general
  );

  const view = useMemo(() => {
    if (visibleTipBottomSheet) return <AsButton />;
    else return <AsLink />;
  }, []);

  return view;
}

export default WithBackAndMoreIcon;
