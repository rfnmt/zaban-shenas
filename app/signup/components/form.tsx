import React, { useEffect, useRef, useState } from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";

import {
  convertToPersianNumber,
  isIranPhoneNumber,
  toEnglishDigits,
} from "@/modules/helper";
import Z3DButton from "@/components/Z3DButton";

function SignupForm({ sendOTP, phone, err }: any): JSX.Element {
  const theme = useTheme() as any;

  const [state, setState] = useState({
    isValid: false,
    phone: phone,
  });

  const onSubmit = () => {
    if (state.isValid) {
      sendOTP(toEnglishDigits(state.phone));
    }
  };

  function regexHandler(e: any) {
    const { value } = e.target;
    setState((prev) => ({ ...prev, phone: value }));

    if (isIranPhoneNumber(toEnglishDigits(value))) {
      setState((prev) => ({
        ...prev,
        isValid: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isValid: false,
      }));
    }
  }

  // when user come back from verification code state button must be active
  useEffect(() => {
    phone
      ? setState((prev) => ({
          ...prev,
          isValid: true,
        }))
      : setState((prev) => ({
          ...prev,
          isValid: false,
        }));
  }, []);

  function signUpWithPressingEnterKey(e: any) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSubmit();
    }
  }

  const submitButton = useRef();

  return (
    <Box className="signup-form">
      <TextField
        name="phone"
        type="tel"
        variant="filled"
        onFocus={() => {
          window.scrollTo(submitButton.current);
        }}
        value={convertToPersianNumber(state.phone)}
        className="phone-input"
        onChange={regexHandler}
        onKeyDown={signUpWithPressingEnterKey}
        placeholder="-----------"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <>
              <Typography
                className="iranCode"
                sx={{
                  borderRight: `1px solid ${theme.palette.border.main}`,
                  color: (theme) => `${theme.palette.gray["1"]} !important`,
                }}
              >
                ۹۸+
              </Typography>
              <Box
                className="errorMessage"
                sx={{ color: `${theme.palette.error.main} !important` }}
              >
                {err}
              </Box>
            </>
          ),
        }}
        sx={{
          "& input": {
            color: (theme) => `${theme.palette.gray["1"]} !important`,
          },
          "& input::placeholder": {
            color: (theme) => `${theme.palette.gray["1"]} !important`,
          },
          borderColor: err
            ? `${theme.palette.error.main} !important`
            : `${theme.palette.border.main} !important`,
          "& .MuiFilledInput-input": {
            borderColor: err
              ? `${theme.palette.error.main} !important`
              : `${theme.palette.border.main} !important`,
          },
          backgroundColor: "white.flexible",
        }}
      />

      <Box ref={submitButton} className="send-or-register">
        <Z3DButton
          disabled={!state.isValid}
          onClick={onSubmit}
          color={
            !state.isValid
              ? `${theme.palette.gray[3]} !important`
              : `${theme.palette.white.fix} !important`
          }
          background={
            !state.isValid
              ? `${theme.palette.disable.main} !important`
              : `${theme.palette.primary.main} !important`
          }
        >
          ارسال کد تایید
        </Z3DButton>
      </Box>
    </Box>
  );
}

export default SignupForm;
