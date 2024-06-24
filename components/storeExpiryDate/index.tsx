import { Typography } from "@mui/material";
import React from "react";
import Z3DButton from "../Z3DButton";
import "./style.scss";
import Icon from "../icon";
import Image from "next/image";

type Props = {
  expiryDate: number;
  handleActivationProductData: () => void;
  neededGem: number;
  purchase_label: string;
  serverBackground?: string | undefined;
  customBackground?: string | undefined;
  serverColor?: string | undefined;
  customColor?: string | undefined;
};

function StoreExpiryDate({
  expiryDate,
  handleActivationProductData,
  neededGem,
  purchase_label,
  serverBackground,
  customBackground,
  serverColor,
  customColor,
}: Props) {
  return expiryDate > 0 ? (
    <Typography
      sx={{ color: "white.fix", backgroundColor: "blackTransparent.1" }}
      className="store-expiry-date"
    >
      فعال تا {Math.trunc(expiryDate / 60 + 1)} دقیقه دیگه
    </Typography>
  ) : (
    <Z3DButton
      onClick={handleActivationProductData}
      background={serverBackground || customBackground}
      color={serverColor || customColor}
    >
      {purchase_label}&nbsp;
      {new Intl.NumberFormat("en-US").format(neededGem)}
      &nbsp;
      <Image src="/svg/diamond.svg" fill alt="" className="diamond" />
    </Z3DButton>
  );
}

export default StoreExpiryDate;
