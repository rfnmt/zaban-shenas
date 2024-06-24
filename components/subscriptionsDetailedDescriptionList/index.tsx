import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";
import { useSelector } from "react-redux";
import Image from "next/image";

type Props = {
  goldData: any;
  goldLightTheme: string;
  goldDarkTheme: string;
};

function SubscriptionsDetailedDescriptionList({
  goldData,
  goldLightTheme,
  goldDarkTheme,
}: Props) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: any) => state.general);
  return (
    <Box
      className="detailed_description_list"
      sx={{
        backgroundColor: theme.palette.blackTransparent["1"],
      }}
    >
      {goldData?.map((item: any, index: number) => {
        return (
          <Box
            key={index}
            sx={{
              color: mode === "light" ? goldLightTheme : goldDarkTheme,
            }}
            className="pic-description-wrapper"
          >
            <Box className="description-pic">
              <Image src={item?.thumbnail} alt="" fill />
            </Box>
            <Box>
              <Typography className="title">{item?.title}</Typography>
              <Typography className="subtitle">{item?.subtitle}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default SubscriptionsDetailedDescriptionList;
