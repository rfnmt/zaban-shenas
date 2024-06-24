import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
};

function ImageProvider({
  src,
  className = "",
  style = {},
  alt = "",
  width = 0,
  height = 0,
}: Props) {
  let paramString = src.split("?")[1];
  let queryString = new URLSearchParams(paramString);

  for (let pair of queryString?.entries()) {
    if (height === 0) if (pair[0] === "height") height = +pair[1];
    if (width === 0) if (pair[0] === "width") width = +pair[1];
  }

  return (
    <Image
      src={src}
      alt={alt}
      style={style}
      width={width > 720 ? 720 : width}
      height={height > 405 ? 405 : height}
      className={className}
      fill={width === 0 && height === 0}
    />
  );
}

export default ImageProvider;
