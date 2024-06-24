"use client";
import { useEffect, useState } from "react";
import { Divider, useTheme } from "@mui/material";

function Seperator(data: Contentbody) {
  //
  const theme = useTheme() as any;

  const [seperatorBgColor, setSeperatorBgColor] = useState("");

  useEffect(() => {
    if (data?.data?.type === "seperator") {
      if (data?.data?.background?.color === "red") {
        setSeperatorBgColor(theme.palette.accent2.main);
      } else if (data?.data?.background?.color === "green") {
        setSeperatorBgColor(theme.palette.secondary.main);
      } else if (data?.data?.background?.color === "blue") {
        setSeperatorBgColor(theme.palette.primary.light);
      } else {
        setSeperatorBgColor(theme.palette.border.main);
      }
    }
  }, []);

  return (
    <div className="tip-seperator-wrapper">
      <Divider
        sx={{
          borderColor: seperatorBgColor,
          height: "1px",
        }}
      />
    </div>
  );
}
export default Seperator;
