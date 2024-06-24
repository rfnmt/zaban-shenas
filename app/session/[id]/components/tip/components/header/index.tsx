"use client";

import Image from "next/image";
import { Typography } from "@mui/material";

import "./style.scss";
import ImageProvider from "@/components/imageProvider";
import { textIsFarsi } from "@/modules/helper";

function Header({ data }: any) {
  return (
    <div className="tip-header-wrapper">
      {/* <Image fill className="image" src={data?.image} alt={data?.title} /> */}
      {/* <Image
        width={264}
        height={148}
        className="image"
        src={data?.image}
        alt={data?.title}
      /> */}

      <ImageProvider className="image" src={data?.image} alt={data?.title} />

      <Typography
        className="title"
        sx={{
          color: "gray.1",
          fontFamily: textIsFarsi(data?.title) ? "IRansans" : "Comme",
          direction: textIsFarsi(data?.title) ? "rtl" : "ltr",
        }}
      >
        {data?.title}
      </Typography>
      <Typography
        className="sub-title"
        sx={{
          color: "gray.2",
          fontFamily: textIsFarsi(data?.description) ? "IRansans" : "Comme",
          direction: textIsFarsi(data?.description) ? "rtl" : "ltr",
        }}
      >
        {data?.description}
      </Typography>
    </div>
  );
}
export default Header;
