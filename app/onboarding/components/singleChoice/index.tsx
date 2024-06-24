import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import "./style.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOnboardingMainAndChoiceSlug,
  updateOnboardingButtonActivation,
} from "@/providers/Redux/onboarding/onboardingSlice";
import { RootReduxState } from "@/providers/Redux/store";

function SingleChoice({ choices, mainSlug }) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { onboardingButtonActivation } = useSelector(
    (state: RootReduxState) => state.onboarding
  );

  return choices.map((item: any, index: number) => {
    return (
      <Button
        key={item.id}
        sx={{
          backgroundColor: theme.palette.white.flexible,
          boxShadow: "0 1px 1px #00000029",
          "&:hover": {
            backgroundColor: theme.palette.white.flexible,
            boxShadow: "0 1px 1px #00000029",
          },
        }}
        className="single-choice-wrapper"
      >
        <FormControl component="fieldset">
          <RadioGroup
            name="single-choice"
            value={onboardingButtonActivation}
            onChange={(e) => {
              dispatch(
                updateOnboardingMainAndChoiceSlug({
                  choiceSlug: item.slug,
                  mainSlug,
                })
              );
              dispatch(
                updateOnboardingButtonActivation(Number(e.target.value))
              );
            }}
          >
            <FormControlLabel
              className="form-control-label"
              value={item.id}
              control={<Radio className="radio-selection" />}
              label={
                <Box
                  className="label-wrapper"
                  sx={
                    onboardingButtonActivation === item.id
                      ? {
                          color: `${theme.palette.system.blue} !important`,
                          border: `2px solid ${theme.palette.system.blue}`,
                        }
                      : {
                          color: `${theme.palette.gray["1"]} !important`,
                          border: "2px solid transparent !important",
                        }
                  }
                >
                  {item?.icon && (
                    <Image src={item?.icon} width={32} height={32} alt="" />
                  )}
                  {item?.label}
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
      </Button>
    );
  });
}

export default SingleChoice;
