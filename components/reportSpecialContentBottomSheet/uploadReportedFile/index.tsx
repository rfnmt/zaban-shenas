import React, { ChangeEvent, MouseEventHandler } from "react";
import { Box } from "@mui/material";
import Icon from "../../icon";
import "./style.scss";

type Data = {
  imageCollections: Array<any>;
  handleUploadPhoto: MouseEventHandler<HTMLDivElement>;
  fileSelectedHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  imgInputRef: any;
};

function UploadReportedFile({
  imageCollections,
  handleUploadPhoto,
  fileSelectedHandler,
  imgInputRef,
}: Data) {
  return imageCollections.length < 5 ? (
    <>
      <Box
        className="upload-reported-photo"
        sx={{ backgroundColor: "border.main" }}
        onClick={handleUploadPhoto}
      >
        <Box className="symble-icon" sx={{ backgroundColor: "icon.2" }}>
          <Icon icon="white_close" size="27" />
        </Box>
      </Box>
      <input
        type="file"
        name=""
        id="upload-report-photo"
        onChange={fileSelectedHandler}
        accept="image/*"
        ref={imgInputRef}
      />
    </>
  ) : (
    <></>
  );
}

export default UploadReportedFile;
