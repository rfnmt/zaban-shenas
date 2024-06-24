import React, { MouseEventHandler } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";
import Image from "next/image";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IShop } from "@/app/setting/store/store.interfaces";
import MoneyWallet from "../moneyWallet";

interface SubscriptionBody {
  title: string | undefined;
  subtitle: string | undefined;
  details: Array<any> | undefined;
  gem_amount: number | undefined;
  gem_value: number | undefined;
  handleSwitch: MouseEventHandler<HTMLButtonElement>;
  gem_wallet: boolean | null;
}
function ProductCheckoutBottomSheetBody({
  title,
  subtitle,
  details,
  gem_amount,
  gem_value,
  handleSwitch,
  gem_wallet,
}: SubscriptionBody) {
  const theme = useTheme() as any;
  // when we come back from failed success if we pass pic as props
  // pic does not show and it returns " undefined "
  //
  // so we use following code that always returns pic
  const shopData = queryClient.getQueryData(["shop-data"]) as IShop;
  const goldData = shopData?.purchasables?.find(
    (item: any, index: number) => item?.data?.slug === "gold"
  );
  return (
    <Box
      className="checkout-bottomSheet-body"
      sx={{ backgroundColor: "background.main" }}
    >
      <Box
        className="checkout-bottomSheet-contents"
        sx={{
          backgroundColor: "white.flexible",
        }}
      >
        <Box className="checkout-bottomSheet-contents-header">
          <Box className="product-titles">
            <Typography sx={{ color: `${theme.palette.gray["1"]} !important` }}>
              {title}
            </Typography>
            <Typography sx={{ color: `${theme.palette.gray["1"]} !important` }}>
              {subtitle}
            </Typography>
          </Box>
          <Box className="product-image">
            <Image fill src={goldData?.data?.images?.thumbnail} alt="" />
          </Box>
        </Box>
        <Box className="checkout-bottomSheet-contents-body">
          {details &&
            details.map((detail: any, index: number) => {
              return (
                <div key={index} className="product-final-data">
                  <Box
                    className="price"
                    sx={{
                      color: `${theme.palette.gray["1"]} !important`,
                    }}
                  >
                    {detail.hint ? (
                      <Typography
                        sx={{ color: theme.palette.gray["3"] }}
                        className="hint"
                        variant="caption"
                      >
                        {detail.hint}
                      </Typography>
                    ) : (
                      <></>
                    )}

                    <Typography className="value" variant="caption">
                      {detail.value}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: `${theme.palette.gray["3"]} !important`,
                    }}
                    className="info-text"
                  >
                    {detail.title}
                  </Typography>
                </div>
              );
            })}
        </Box>
      </Box>

      <MoneyWallet
        gem_amount={gem_amount}
        handleSwitch={handleSwitch}
        gem_wallet={gem_wallet}
        gem_value={gem_value}
      />
    </Box>
  );
}

export default ProductCheckoutBottomSheetBody;
