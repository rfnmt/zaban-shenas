import React from "react";
import { Box, useTheme } from "@mui/material";
import "./style.scss";
type Props = {
  max_amount: number;
  remaining_amount: number;
};

function StoreChainRemainingAmount({ max_amount, remaining_amount }: Props) {
  const theme = useTheme() as any;
  return (
    <Box className="store-chain-wrapper">
      <Box
        className="saviour-wrapper"
        style={{
          gridTemplateColumns: `repeat(${max_amount}, 1fr)`,
        }}
      >
        {Array.from({
          length: max_amount,
        }).map((item, index) => {
          return (
            <Box
              key={index}
              className={`saviour ${
                index + 1 <= remaining_amount ? "success" : ""
              }`}
            />
          );
        })}
      </Box>
      <Box className="saviour-info" sx={{ color: theme.palette.white.fix }}>
        <span>{remaining_amount || 0}</span>
        &nbsp; از &nbsp;
        <span>{max_amount}</span>
        &nbsp; مانده
      </Box>
    </Box>
  );
}

export default StoreChainRemainingAmount;
