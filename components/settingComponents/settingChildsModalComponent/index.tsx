"use client";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";

import "./settingChildsModalComponent.scss";

interface ModalData {
  textContent: string;
  radioButtonData: Array<any>;
  handleCloseModal: Function;
  radioGroupValue: string;
  handleOnChangeForModal: Function;
  isRadioButton: boolean;
}
function SettingChildsModalComponent({
  textContent,
  radioButtonData,
  handleCloseModal,
  radioGroupValue,
  handleOnChangeForModal,
  isRadioButton,
}: ModalData) {
  const theme = useTheme() as any;

  return (
    <Box
      className="modal-options"
      sx={{
        backgroundColor: "white.flexible",
      }}
    >
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{ color: `${theme.palette.gray["1"]} !important` }}
        >
          {textContent}
        </FormLabel>
        {isRadioButton ? (
          <>
            <RadioGroup
              className="modal-options-radioGroup"
              aria-label="modal-for-setting-child"
              name="modal-for-setting-child"
              value={radioGroupValue}
              onChange={(e) => handleOnChangeForModal(e)}
            >
              {radioButtonData.map((item, index) => {
                return (
                  <Button className="radioButton-wrapper" key={index}>
                    <FormControlLabel
                      key={index}
                      sx={{
                        color: `${theme.palette.gray["1"]} !important`,
                      }}
                      value={item.value}
                      control={
                        <Radio
                          className="radioButton"
                          sx={{
                            color:
                              radioGroupValue === item.value
                                ? `${theme.palette.system.blue} !important`
                                : `${theme.palette.icon["2"]} !important`,
                          }}
                        />
                      }
                      label={item.label}
                      onClick={() => handleCloseModal()}
                    />
                  </Button>
                );
              })}
            </RadioGroup>
            <div className="cancel">
              <Button
                sx={{
                  color: `${theme.palette.system.blue} !important`,
                }}
                onClick={() => handleCloseModal()}
              >
                لغو
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </FormControl>
    </Box>
  );
}

export default SettingChildsModalComponent;
