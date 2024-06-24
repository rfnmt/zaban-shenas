import React, { ChangeEventHandler, FocusEventHandler } from "react";
import Icon from "@/components/icon";
import { Box, IconButton, InputBase, Paper, useTheme } from "@mui/material";
import "./style.scss";

interface FriendsSearchInputData {
  doSearchFunction: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  showBackButtonAndResults?: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  searchedTextByUser: string;
  cleanWholeTextButton: boolean;
  onlyRemoveInputText: () => void;
}

function FriendsSearchInput({
  doSearchFunction,
  searchedTextByUser,
  showBackButtonAndResults,
  cleanWholeTextButton,
  onlyRemoveInputText,
}: FriendsSearchInputData) {
  const theme = useTheme() as any;
  return (
    <Box
      className="input-search-wrapper"
      sx={{ backgroundColor: theme.palette.background.main }}
    >
      <Paper
        className="form"
        sx={{
          backgroundColor: `${theme.palette.accent3.main} !important`,
          border: `1px solid ${theme.palette.border.main}`,
        }}
      >
        <InputBase
          className="input-tag"
          onChange={doSearchFunction}
          onFocus={showBackButtonAndResults}
          placeholder="جستجو"
          inputProps={{ "aria-label": "search google" }}
          value={searchedTextByUser}
          sx={{
            "& > input": {
              color: `${theme.palette.gray["1"]} !important`,
              "&::placeholder": {
                color: `${theme.palette.gray["2"]} !important`,
              },
            },
          }}
        />
        {cleanWholeTextButton && (
          <IconButton
            className="clean-input-text"
            onClick={onlyRemoveInputText}
          >
            <Icon icon="clearText" size={24} />
          </IconButton>
        )}

        <Box
          className="magnifier"
          sx={{
            "& .icon-zoom": {
              "&::before": {
                color: `${theme.palette.icon["2"]} !important`,
              },
            },
          }}
        >
          <Icon icon="search-box" size={24} />
        </Box>
      </Paper>
    </Box>
  );
}

export default FriendsSearchInput;
