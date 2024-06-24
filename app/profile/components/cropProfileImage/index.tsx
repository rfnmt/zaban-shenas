import React, { MouseEventHandler, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  useTheme,
  Slider,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import "./style.scss";
import Icon from "@/components/icon";
interface CropData {
  openModal: boolean;
  handleCloseModal: () => void;
  croppedImage: string;
  crop: any;
  zoom: number;
  setCrop: any;
  onCropComplete: any;
  setZoom: any;
  handleShowCroppedImage: MouseEventHandler;
  handleCloseCropImageModal: MouseEventHandler;
  setRotationState: (x: number) => void;
  rotationState: number;
}

function CropProfileImage({
  openModal,
  handleCloseModal,
  croppedImage,
  crop,
  zoom,
  setCrop,
  onCropComplete,
  setZoom,
  handleShowCroppedImage,
  handleCloseCropImageModal,
  setRotationState,
  rotationState,
}: CropData) {
  const theme = useTheme() as any;
  const [typeOfImageOperation, settypeOfImageOperation] =
    React.useState("size");
  const handleChangeTypeOfImgOperation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    settypeOfImageOperation((event.target as HTMLInputElement).value);
  };

  function handleRotationDeg() {
    if (rotationState >= 270 && rotationState < 360) {
      setRotationState(360);
    } else if (rotationState >= 180 && rotationState < 270) {
      setRotationState(270);
    } else if (rotationState >= 90 && rotationState < 180) {
      setRotationState(180);
    } else if (rotationState >= 0 && rotationState < 90) {
      setRotationState(90);
    } else {
      setRotationState(0);
    }
  }

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      className="image-crop-wrapper"
    >
      <Box className="crop-profile-buttons">
        <Button
          sx={{
            backgroundColor: "white.flexible",
            color: `${theme.palette.gray["1"]} !important`,
          }}
          onClick={handleCloseCropImageModal}
        >
          <Icon icon="close" size={40} />
        </Button>
        <Button
          onClick={handleShowCroppedImage}
          sx={{
            backgroundColor: "white.flexible",
            color: `${theme.palette.gray["1"]} !important`,
            width: "100px",
            justifyContent: "space-evenly",
            "& path": {
              fill: theme.palette.icon["2"],
            },
          }}
        >
          <Typography>انتخاب</Typography>
          <Icon icon="check-mark" size={25} />
        </Button>
      </Box>
      <Box className="crop-profile-image">
        <Cropper
          image={croppedImage}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="round"
          rotation={rotationState}
          onRotationChange={setRotationState}
        />
      </Box>
      <Box className="text-90-rotaion">
        {typeOfImageOperation === "rotation" ? (
          <>
            <Box
              sx={{
                "& path": {
                  fill: theme.palette.white.fix,
                },
                backgroundColor: theme.palette.icon["2"],
                borderRadius: "50%",
              }}
              onClick={() => {
                setRotationState(0);
              }}
            >
              <Icon icon="close" size={30} />
            </Box>
            <Typography>
              {rotationState < 0
                ? Math.round(rotationState) * -1
                : Math.round(rotationState)}
            </Typography>
            <Box onClick={() => handleRotationDeg()}>
              <Icon icon="rotation90" size={30} />
            </Box>
          </>
        ) : (
          <Box sx={{ height: "30px" }}></Box>
        )}
      </Box>
      <Box className="img-rotaion-wrapper">
        {typeOfImageOperation === "size" ? (
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="zoom"
            onChange={(e: any) => setZoom(e.target.value)}
            className="range"
          />
        ) : (
          <Slider
            value={rotationState}
            min={0}
            max={360}
            step={1}
            aria-labelledby="rotate"
            onChange={(e, rotation) => setRotationState(rotation)}
            className="range"
          />
        )}
      </Box>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={typeOfImageOperation}
          onChange={handleChangeTypeOfImgOperation}
          className="type-of-operation"
        >
          <FormControlLabel
            sx={{ backgroundColor: theme.palette.black.fix }}
            value="rotation"
            control={<Radio />}
            label={
              <Box
                sx={{
                  "& path": {
                    fill:
                      typeOfImageOperation === "rotation"
                        ? theme.palette.primary.main
                        : theme.palette.white.fix,
                  },
                }}
              >
                <Icon icon="rotation" size={20} />
                {typeOfImageOperation === "size" ? (
                  <Typography></Typography>
                ) : (
                  <Typography sx={{ color: theme.palette.white.fix }}>
                    چرخش
                  </Typography>
                )}
              </Box>
            }
          />
          <FormControlLabel
            sx={{ backgroundColor: theme.palette.black.fix }}
            value="size"
            control={<Radio />}
            label={
              <Box
                sx={{
                  "& path": {
                    fill:
                      typeOfImageOperation === "size"
                        ? theme.palette.primary.main
                        : theme.palette.white.fix,
                  },
                }}
              >
                <Icon icon="crop" size={20} />
                {typeOfImageOperation === "size" ? (
                  <Typography sx={{ color: theme.palette.white.fix }}>
                    اندازه
                  </Typography>
                ) : (
                  <Typography></Typography>
                )}
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>
    </Dialog>
  );
}

export default CropProfileImage;
