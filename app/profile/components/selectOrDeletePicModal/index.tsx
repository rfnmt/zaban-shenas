import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { Box, Button, Dialog, Typography, useTheme } from "@mui/material";
import "./style.scss";

interface SelectDeletProfilePicData {
  openSelectPicInDarkModal: MouseEventHandler;
  handleDelPicInDarkModal: MouseEventHandler;
  handleSelectImage: ChangeEventHandler<HTMLInputElement>;
  selectImageViaModalRef: any;
  selectPic;
  handleCloseSelectPic;
}

function SelectOrDeletePicModal({
  openSelectPicInDarkModal,
  handleDelPicInDarkModal,
  handleSelectImage,
  selectImageViaModalRef,
  selectPic,
  handleCloseSelectPic,
}: SelectDeletProfilePicData) {
  const theme = useTheme() as any;
  return (
    <Dialog
      open={selectPic}
      onClose={handleCloseSelectPic}
      className="select_delete_cancel_buttons"
    >
      <Box
        className="select_delete_options"
        sx={{ backgroundColor: "white.flexible" }}
      >
        <Typography
          paragraph={true}
          sx={{
            color: `${theme.palette.gray["1"]} !important`,
          }}
          className="title"
        >
          تصویر جدیدی را انتخاب یا تصویر فعلی را حذف کنید
        </Typography>
        <div className="select_delete">
          <Button
            sx={{
              color: `${theme.palette.system.blue} !important`,
            }}
            onClick={openSelectPicInDarkModal}
          >
            انتخاب تصویر جدید
          </Button>
          <Button
            onClick={handleDelPicInDarkModal}
            sx={{
              color: `${theme.palette.error.main} !important`,
            }}
          >
            حذف تصویر فعلی
          </Button>
          <input
            id="selectImageInModal"
            hidden
            type="file"
            onChange={handleSelectImage}
            ref={selectImageViaModalRef}
          />
        </div>
      </Box>
    </Dialog>
  );
}

export default SelectOrDeletePicModal;
