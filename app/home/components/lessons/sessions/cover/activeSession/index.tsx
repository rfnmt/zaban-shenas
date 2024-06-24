import { RootReduxState } from "@/providers/Redux/store";
import { Box } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import ImageProvider from "@/components/imageProvider";

function ActiveSession({ coverPath }: { coverPath: string }) {
  // const targetUnlockedSession = useSelector(
  //   (state: RootReduxState) => state.home.targetUnlockedSession
  // );

  // const doScrollAnimation = useCallback(() => {
  //   if (targetUnlockedSession) {
  //     document
  //       .querySelector(`#session-${targetUnlockedSession}`)
  //       ?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //         inline: "center",
  //       });
  //   }
  // }, [targetUnlockedSession]);

  // useEffect(() => {
  //   doScrollAnimation();

  //   return () => {};
  // }, [targetUnlockedSession]);

  return (
    <Box className="img-wrapper active-session">
      {coverPath && <ImageProvider width={72} height={72} src={coverPath} />}
    </Box>
  );
}

export default ActiveSession;
