import React, { MouseEventHandler } from "react";
import { Grow, IconButton, useTheme } from "@mui/material";
import Icon from "@/components/icon";
type ShowBackButtonType = {
  hideTextAndSearchResults: MouseEventHandler<HTMLButtonElement>;
};
function ShowBackButton({ hideTextAndSearchResults }: ShowBackButtonType) {
  const theme = useTheme() as any;
  return (
    <Grow timeout={400} in={true}>
      <IconButton
        className="back-to-default"
        onClick={hideTextAndSearchResults}
      >
        <Icon icon="chevron-left" size={30} />
      </IconButton>
    </Grow>
  );
}

export default ShowBackButton;
