import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import "./style.scss";

type Props = {
  variations: any;
  goldLightTheme: string;
  goldDarkTheme: string;
  selectMaximumDiscount: number;
  handleVariations: (x: number, y: number) => void;
  productionID: number;
};

function SubscriptionsPrice({
  variations,
  goldLightTheme,
  goldDarkTheme,
  selectMaximumDiscount,
  handleVariations,
  productionID,
}: Props) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: any) => state.general);
  return (
    <Box
      className="subscriptions-price"
      sx={{
        backgroundColor: theme.palette.blackTransparent["1"],
      }}
    >
      {variations?.map((item: any, index: number) => {
        return (
          <Box
            key={index}
            className="variations-wrapper"
            sx={{
              backgroundColor: theme.palette.blackTransparent["1"],
              color: mode === "light" ? goldLightTheme : goldDarkTheme,
            }}
            onClick={() => handleVariations(productionID, item?.id)}
          >
            {item?.featured && (
              <Box className="featured">
                <Image src="/svg/Featured.svg" fill alt="" />
              </Box>
            )}
            <Box
              className="enrolling"
              sx={{
                backgroundColor: theme.palette.blackTransparent["1"],
              }}
            >
              <Typography> {item?.title} </Typography>
            </Box>
            <Box className="values-wrapper">
              <Typography className="subtitle">{item?.subtitle}</Typography>
              {selectMaximumDiscount && (
                <Box className="value-with-discount">
                  <del>
                    {new Intl.NumberFormat("en-US").format(item?.price)}
                  </del>
                  <Typography
                    sx={{
                      color: theme.palette.accent1.main,
                    }}
                  >
                    {new Intl.NumberFormat("en-US").format(
                      item?.price -
                        Math.round((selectMaximumDiscount / 100) * item?.price)
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.accent1.main,
                    }}
                  >
                    تومان
                  </Typography>
                </Box>
              )}
              {(selectMaximumDiscount === 0 ||
                selectMaximumDiscount === null) && (
                <Box
                  className="value-without-discount"
                  sx={{
                    color: theme.palette.white.fix,
                  }}
                >
                  <Typography>
                    {new Intl.NumberFormat("en-US").format(item?.price)}
                  </Typography>

                  <Typography>تومان</Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default SubscriptionsPrice;
