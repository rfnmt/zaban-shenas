import React, { useState, useRef, useEffect } from "react";
import { Button, Box, TextField, Typography, useTheme } from "@mui/material";

import { convertToPersianNumber } from "../../../../modules/helper";

import Icon from "../../../../components/icon";
import { signupByOTP } from "@/app/signup/api";

import "./styles.scss";

import LottieLoading from "@/components/lottieLoading";

let myInterval: number;
interface VerifyPropsState {
  verifyLoading: boolean;
  length: number;
  onComplete: (x: string) => void;
  enteredData: string;
  setCodeError: (x: any) => any;
  goStepOne: () => void;
  remaining_time: number;
  stateStep: number;
  codeError: string;
}

const VerifyCode = ({
  verifyLoading,
  length,
  onComplete,
  enteredData,
  setCodeError,
  goStepOne,
  remaining_time,
  stateStep,
  codeError,
}: VerifyPropsState) => {
  const theme = useTheme() as any;
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const [state, setState] = useState({
    seconds: Math.floor(remaining_time % 60),
    minutes: Math.floor(remaining_time / 60),
  });
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const processInput = (e, slot) => {
    setCodeError((prev: any) => ({ ...prev, codeError: "" }));
    const num = e.target.value;

    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  useEffect(() => {
    if (stateStep === 2) {
      myInterval = setInterval(() => {
        const { seconds, minutes } = state;

        if (seconds > 0) {
          setState((prev) => ({
            ...prev,
            seconds: state.seconds - 1,
          }));
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setState((prev) => ({
              ...prev,
              minutes: minutes - 1,
              seconds: 59,
            }));
          }
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  }, [state.seconds, state.minutes]);

  // useEffect(() => {
  //   if ("OTPCredential" in window) {
  //     window.addEventListener("DOMContentLoaded", (e) => {
  //       navigator.credentials
  //         .get({ otp: { transport: ["sms"] } })
  //         .then((otp) => {
  //           console.log({ otp });
  //           alert({ otp });
  //           // input.value = otp.code;
  //           // if (form) form.submit();
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     });
  //   }
  //   return () => {};
  // }, []);

  function resetTimer() {
    setCode([...Array(length)].map(() => ""));
    inputs.current[0].focus();
    setCodeError((prev: any) => ({ ...prev, codeError: "" }));

    setLoading(true);
    signupByOTP({
      uid: enteredData,
    })
      .then(function (response) {
        setLoading(false);
        setState((prev) => ({
          ...prev,
          seconds: Math.floor(response.data.remaining_seconds % 60),
          minutes: Math.floor(response.data.remaining_seconds / 60),
        }));
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    code.join("").length === 4 && onComplete(code.join(""));
  }, [code]);

  useEffect(() => {
    if (verifyLoading) {
      setCode([...Array(length)].map(() => ""));
      inputs.current[0].focus();
    }
  }, [verifyLoading]);

  return (
    <Box>
      <LottieLoading open_lottie={loading || verifyLoading} />
      <Box
        className="wrapCodeInput"
        sx={{ backgroundColor: "background.main" }}
      >
        <Box className="codeInput">
          <Button className="icon-wrapper" onClick={goStepOne}>
            <Icon icon="arrow_back" size={48} />
          </Button>
          <Typography
            className="confirmation-code"
            sx={{ color: `${theme.palette.gray["1"]} !important` }}
          >
            کد تایید
          </Typography>
          <Typography
            className="codeLabel"
            sx={{ color: `${theme.palette.gray["2"]} !important` }}
          >
            لطفا کد ارسال شده به
            {convertToPersianNumber(enteredData)}
            را وارد کنید
          </Typography>
          <Button
            className="codeDetail"
            onClick={goStepOne}
            sx={{
              color: `${theme.palette.system.blue} !important`,
            }}
          >
            ویرایش شماره
          </Button>
          <Box className="codeInputs">
            {code.map((num, idx) => {
              return (
                <TextField
                  className="smsCodes"
                  variant="outlined"
                  key={idx}
                  type="tel"
                  value={num}
                  inputMode="numeric"
                  autoFocus={!code[0].length && idx === 0}
                  onChange={(e) => processInput(e, idx)}
                  onKeyUp={(e) => onKeyUp(e, idx)}
                  inputRef={(ref) => inputs.current.push(ref)}
                  inputProps={{ maxLength: 1 }}
                  sx={{
                    "& input": {
                      color: `${theme.palette.gray["1"]} !important`,
                      backgroundColor: "white.flexible",
                      border: codeError
                        ? `2px solid ${theme.palette.error.main} !important`
                        : "",
                      boxShadow: codeError ? "" : "0 1px 1px rgba(0,0,0,.16)",
                    },
                  }}
                />
              );
            })}
          </Box>
          {codeError && (
            <Box
              className="codeError"
              sx={{
                color: `${theme.palette.error.main} !important`,
              }}
            >
              کد وارد شده اشتباه است، لطفا دوباره بررسی کنید
            </Box>
          )}

          <div className="resendCode">
            {state.minutes === 0 && state.seconds === 0 ? (
              <>
                <Button
                  onClick={resetTimer}
                  sx={{
                    color: `${theme.palette.system.blue} !important`,
                  }}
                >
                  ارسال مجدد کد تایید
                </Button>
              </>
            ) : (
              <Box
                className="remaining-time"
                sx={{
                  color: `${theme.palette.gray["2"]} !important`,
                }}
              >
                مدت اعتبار:
                <span
                  dangerouslySetInnerHTML={{
                    __html: "&nbsp; ",
                  }}
                />
                <b>
                  {convertToPersianNumber(state.minutes)}:
                  {state.seconds < 10
                    ? `${convertToPersianNumber(0)}${convertToPersianNumber(
                        state.seconds
                      )}`
                    : convertToPersianNumber(state.seconds)}
                </b>
              </Box>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyCode;
