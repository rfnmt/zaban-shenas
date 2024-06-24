import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import ImageProvider from "@/components/imageProvider";
import Icon from "@/components/icon";
import {
  updatePassedSessionAnimate,
  updateTargetPassedSession,
} from "@/providers/Redux/home/homeSlice";

function WithPassedAnimtion({ coverPath }: { coverPath: string }) {
  const dispatch = useDispatch();
  return (
    <Box className="img-wrapper">
      {coverPath && <ImageProvider width={72} height={72} src={coverPath} />}
      <Box className="session-state">
        <motion.div
          transition={{ delay: 1, duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="passed-session-gradient"
        />
        <motion.div
          onAnimationComplete={() => {
            dispatch(updatePassedSessionAnimate(false));
            dispatch(updateTargetPassedSession(null));
          }}
          transition={{ delay: 1, duration: 1 }}
          initial={{ opacity: 0, y: "20px" }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
        >
          <Icon icon="verified" size={24} className="passed-icon" />
        </motion.div>
      </Box>
    </Box>
  );
}

export default WithPassedAnimtion;
