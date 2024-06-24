import React, { MouseEventHandler } from "react";
import { Box, Button } from "@mui/material";
import Icon from "../../icon";
import Image from "next/image";
import "./imageAndRemoveButton.scss";

type Data = {
  imageCollections: Array<any>;
  removeImage: MouseEventHandler<HTMLButtonElement>;
};

function ImageAndRemoveButton({ imageCollections, removeImage }: Data) {
  return (
    <Box style={{ direction: "ltr", display: "flex" }}>
      {imageCollections.map((imageSrc: any, index: number) => {
        const url = URL.createObjectURL(imageSrc);
        return (
          <Box key={index} className="close-icon-and-img-wrapper">
            <Button
              className="close"
              sx={{ backgroundColor: "blackTransparent.1" }}
              onClick={() => removeImage(imageSrc)}
            >
              <Icon icon="white_close" size="27" />
            </Button>
            <Image
              width={34}
              height={68}
              key={index}
              src={url}
              className="show-img"
              alt=""
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default ImageAndRemoveButton;
