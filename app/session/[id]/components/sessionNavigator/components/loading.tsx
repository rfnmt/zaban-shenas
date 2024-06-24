import { Button } from "@mui/material";
import React from "react";
import Lottie from "react-lottie-player";

import * as lottieAnimation from "@/public/lottie-files/loading-sessions-action-button.json";

function Loading() {
  return (
    <Button
      onClick={() => {}}
      variant="contained"
      className="user-action"
      sx={{
        backgroundColor: "secondary.main",
        "&:hover": { backgroundColor: "secondary.main" },
      }}
    >
      <Lottie
        play
        loop
        animationData={lottieAnimation}
        style={{ width: 66, height: 40, position: "relative", color: "red" }}
      />
    </Button>
  );
}

export default Loading;
