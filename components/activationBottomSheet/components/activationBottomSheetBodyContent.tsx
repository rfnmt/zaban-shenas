import React from "react";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

type Props = {
  data: any;
  remaining_amount: any;
};

function ActivationBottomSheetBodyContent({ data, remaining_amount }: Props) {
  const theme = useTheme() as any;
  const { needingOneGem } = useSelector(
    (state: RootReduxState) => state.freemuimBoardHome
  );
  return (
    <Box
      className="activation-bottomSheet-body-content"
      sx={{ backgroundColor: "white.flexible" }}
    >
      <Box className="pic-description-wrapper">
        <Box className="description-pic">
          <Image fill src={data?.images?.thumbnail} alt="" />
        </Box>
        <Box>
          <Box
            className="title"
            sx={{
              color: `${theme.palette.gray["1"]} !important`,
            }}
          >
            <Typography>{data?.title}</Typography>
            {data?.pricing?.max_amount && (
              <>
                <Typography>x</Typography>
                <Typography>
                  {" "}
                  {needingOneGem || localStorage.getItem("needingOneGem")
                    ? 1
                    : data?.pricing?.max_amount - remaining_amount}{" "}
                </Typography>
              </>
            )}
          </Box>
          <Typography
            className="subtitle"
            sx={{
              color: `${theme.palette.gray["1"]} !important`,
            }}
          >
            {data?.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ActivationBottomSheetBodyContent;
