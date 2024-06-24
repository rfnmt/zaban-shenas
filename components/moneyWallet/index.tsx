import React, { MouseEventHandler } from "react";
import { Box, Button, Switch, Typography, useTheme } from "@mui/material";
import "./style.scss";
import Image from "next/image";

type Props = {
  gem_amount: number | undefined;
  gem_value: number | undefined;
  handleSwitch: MouseEventHandler<HTMLButtonElement>;
  gem_wallet: boolean | null;
};

function MoneyWallet({
  gem_amount,
  handleSwitch,
  gem_wallet,
  gem_value,
}: Props) {
  const theme = useTheme() as any;
  return (
    <div className="user-money-wallet">
      <Button
        style={{
          display: gem_amount ? "" : "none",
        }}
        onClick={handleSwitch}
        className="money-wallet-credit"
      >
        <Switch
          checked={gem_wallet}
          sx={{
            "& .MuiButtonBase-root": {
              color: gem_wallet
                ? `${theme.palette.system.blue} !important`
                : `${theme.palette.gray["3"]} !important`,
            },
            "& .MuiSwitch-track": {
              backgroundColor: gem_wallet
                ? `${theme.palette.system.blue} !important`
                : `${theme.palette.gray["3"]} !important`,
            },
          }}
        />

        <Box
          className="title"
          sx={{ color: `${theme.palette.gray["1"]} !important` }}
        >
          <Typography className="price-title">تبدیل الماس به اعتبار</Typography>
          <Box className="price-title-wrapper">
            <Box className="amount" sx={{ color: theme.palette.system.blue }}>
              {new Intl.NumberFormat("en-US").format(gem_amount)}
            </Box>

            <Image
              src="/svg/diamond.svg"
              fill
              alt=""
              className="diamond-icon"
            />

            <Box
              className="back-icon"
              sx={{ backgroundColor: theme.palette.gray["1"] }}
            />
            <Box
              sx={{ color: theme.palette.gray["1"] }}
              className="gem-value-wrapper"
            >
              <span>تومان</span>
              <span>{new Intl.NumberFormat("en-US").format(gem_value)}</span>
            </Box>
          </Box>
        </Box>
      </Button>
    </div>
  );
}

export default MoneyWallet;
