import React, { ChangeEventHandler } from "react";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { convertToPersianNumber } from "@/modules/helper";
import { textIsFarsi } from "@/modules/helper";
import Icon from "@/components/icon";
import "./style.scss";

type ProfileInputsType = {
  title: string;
  onChangeInput: ChangeEventHandler;
  placeholderCaption: string;
  inputValue: string;
  isThereError?: boolean;
  errorCaption?: string;
  pendingVerification?: Array<any>;
  componentType?: string;
  handleConfirmation?: () => void;
};

function ProfileInputs({
  title,
  onChangeInput,
  placeholderCaption,
  inputValue,
  isThereError,
  errorCaption,
  pendingVerification,
  componentType,
  handleConfirmation,
}: ProfileInputsType) {
  const theme = useTheme() as any;
  return (
    <Box className="profile-input-wrapper">
      <Box className="title-and-confirmation">
        {isThereError === true ? (
          <></>
        ) : (
          pendingVerification?.map((item) => {
            return componentType === item?.data?.type ? (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  "& svg": {
                    marginLeft: "4px",
                  },
                }}
              >
                <Typography sx={{ color: "#f87400" }} className="pending">
                  در انتظار تایید شما
                </Typography>
                <Icon icon="shield" size={24} />
              </Box>
            ) : (
              <></>
            );
          })
        )}
        <Typography
          className="input-title"
          sx={{ color: theme.palette.gray["1"] }}
        >
          {title}
        </Typography>
      </Box>
      <TextField
        variant="filled"
        className="input-field"
        onChange={onChangeInput}
        placeholder={convertToPersianNumber(placeholderCaption)}
        value={inputValue === null ? "" : inputValue}
        sx={{
          "& input::placeholder": {
            color: "gray.3",
            textAlign: title === "نام" ? "right" : "left",
            padding: "0 5px",
          },
          border: `${isThereError ? "2px" : "1px"} solid ${
            isThereError ? theme.palette.error.main : theme.palette.border.main
          } !important`,
          "& input": {
            backgroundColor: "white.flexible",
            color: isThereError
              ? `${theme.palette.error.main} !important`
              : `${theme.palette.gray["1"]} !important`,
            padding: "0 10px",
            textAlign: textIsFarsi(inputValue) ? "right" : "left",
            direction: textIsFarsi(inputValue) ? "rtl" : "ltr",
          },
        }}
      />
      {isThereError ? (
        <FormHelperText
          className="profile-input-error"
          sx={{
            color: (theme) => `${theme.palette.error.main} !important`,
          }}
        >
          {errorCaption}
        </FormHelperText>
      ) : (
        <></>
      )}
      {isThereError === true ? (
        <></>
      ) : (
        pendingVerification?.map((item) => {
          return componentType === item?.data?.type ? (
            <Button
              key={item.id}
              className="resending-link"
              sx={{
                "& svg": {
                  "& path": {
                    fill: theme.palette.system.blue,
                  },
                },
              }}
              onClick={handleConfirmation}
            >
              <Typography
                sx={{
                  color: theme.palette.system.blue,
                  marginTop: "8px",
                  marginLeft: "auto",
                }}
              >
                ارسال مجدد لینک تایید
              </Typography>
              <Icon icon="confirmation" size={24} />
            </Button>
          ) : (
            <></>
          );
        })
      )}
    </Box>
  );
}

export default ProfileInputs;
