import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

export const useDetectScrolledToBottom = () => {
  const { scrollYProgress } = useScroll();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(triggerButtonEnable(false));

    return () => {
      dispatch(triggerButtonEnable(false));
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.9) {
      dispatch(triggerButtonEnable(true));
    } else {
      dispatch(triggerButtonEnable(false));
    }
  });
};
