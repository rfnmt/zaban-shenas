import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import ImageProvider from "@/components/imageProvider";
import Icon from "@/components/icon";
import { updateUnlockedSessionAnimate } from "@/providers/Redux/home/homeSlice";

function WithUnlockAnimation({ coverPath }: { coverPath: string }) {
  const dispatch = useDispatch();
  return (
    <Box className="img-wrapper">
      {coverPath && <ImageProvider width={72} height={72} src={coverPath} />}
      <Box className="session-state">
        <motion.div
          transition={{ delay: 2, duration: 1 }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          className="locked-session-cover-filter"
        />
        <motion.div
          onAnimationComplete={() => {
            dispatch(updateUnlockedSessionAnimate(false));
          }}
          transition={{ delay: 2, duration: 1 }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: "20px" }}
          style={{ position: "absolute", left: 0, right: 0 }}
        >
          <Icon icon="lock" size={24} className="locked-icon" />
        </motion.div>
      </Box>
    </Box>
  );
}

export default WithUnlockAnimation;
