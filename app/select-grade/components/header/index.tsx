import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import "./styles.scss";
import Icon from "@/components/icon";
import Link from "next/link";

function SelectGradeHeader() {
  const theme = useTheme() as any;

  return (
    <AppBar
      component="nav"
      className="select-grade-header"
      sx={{
        borderBottom: `1px solid ${theme.palette.border.main}`,
        background: theme.palette.white.flexible,
        boxShadow: "unset",
      }}
    >
      <Toolbar>
        <div className="container">
          <Link href={"/"}>
            <IconButton
              className="back-home"
              sx={{ svg: { fill: `${theme.palette.icon[2]} !important` } }}
            >
              <Icon icon="close" />
            </IconButton>
          </Link>

          <Typography
            className="header-title"
            sx={{ color: theme.palette.gray[1] }}
          >
            انتخاب مقطع
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SelectGradeHeader;
