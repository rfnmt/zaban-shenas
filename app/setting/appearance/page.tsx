"use client";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Box, Dialog } from "@mui/material";
import { changeThemeMode } from "../../../providers/Redux/general/generalSlice";
import SettingChildsModalComponent from "@/components/settingComponents/settingChildsModalComponent";
import SettingChildsHeader from "@/components/settingComponents/settingChildsHeader";
import SettingChildsComponentSimpleAndSwitch from "@/components/settingComponents/settingChildsComponentSimpleAndSwitch";

import "./appearance.scss";

function Appearance() {
  const dispatch = useDispatch();

  const { mode } = useSelector((state: any) => state.general);
  const [openDialog, setOpenDialog] = useState(false);

  const handleThemeDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleThemeDarkLight = (e: any) => {
    if (e.target.value) {
      localStorage.setItem("mode", e.target.value);
      dispatch(changeThemeMode(e.target.value));
    }
  };

  const radioButtonData = [
    {
      value: "prefers-color-scheme",
      label: "براساس تنظیمات دستگاه",
    },
    { value: "light", label: "روشن" },
    { value: "dark", label: "تیره" },
  ];

  const Dark_Light_Theme = (
    <SettingChildsModalComponent
      textContent="پوسته رنگی"
      radioButtonData={radioButtonData}
      handleCloseModal={handleCloseModal}
      handleOnChangeForModal={handleThemeDarkLight}
      radioGroupValue={mode}
      isRadioButton={true}
    />
  );

  return (
    <Box bgcolor="background.main">
      <Box className="setting-appearance-wrapper">
        <SettingChildsHeader title="پوسته رنگی" />
        <Box
          className="setting-childs-component-simple-and-switch-and-checkbox"
          sx={{
            backgroundColor: "white.flexible",
          }}
        >
          <SettingChildsComponentSimpleAndSwitch
            withSwitch={false}
            handleOnClickFunction={handleThemeDialog}
            rightTextContent="پوسته"
            leftTextContent={
              mode === "dark"
                ? "تیره"
                : mode === "light"
                ? "روشن"
                : "براساس تنظیمات دستگاه"
            }
          />
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseModal}
        className="simpleModalComponentWrapper"
      >
        {Dark_Light_Theme}
      </Dialog>
    </Box>
  );
}

export default Appearance;
