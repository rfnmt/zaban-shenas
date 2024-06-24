import { ReactNode } from "react";
import { Button, Box, useTheme } from "@mui/material";

import "./styles.scss";

export type Props = {
  color?: string;
  className?: string;
  background?: string;
  children?: ReactNode | string;
  onClick?: () => void;
  disabled?: boolean;
};

function Z3DButton({
  color,
  background,
  className,
  children,
  onClick,
  disabled = false,
}: Props) {
  const theme = useTheme();

  return (
    <Button
      className={`Z3DButton ${className || ""}`}
      disabled={disabled}
      onClick={onClick}
      sx={{
        color: color ? `${color} ` : "#fff !important",
        backgroundColor: background || theme.palette.primary.main,
        "&:hover": {
          backgroundColor: background || theme.palette.primary.main,
        },
      }}
    >
      {children}
    </Button>
  );
}

export default Z3DButton;
