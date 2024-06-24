"use client";

import { faIR } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
export const theme = (mode: string) => {
  if (mode === "light") {
    return createTheme({
      components: {
        MuiIconButton: {
          defaultProps: {
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
      faIR,
      typography: {
        fontFamily: "IRANSans",
      },
      palette: {
        type: "light",
        primary: {
          main: "#00429E",
          dark: "#003082",
          light: "#77CCFF",
          transparent: "rgba(0,66,158,0.0)",
          min: "#e2f0ff",
          max: "#00215A",
        },
        select: { notifications: "#c7dafb" },
        secondary: {
          main: "#00c853",
          accent1: "#0fdc60",
          dark: "#00aa46",
          light: "#94FFBE4D",
        },
        accent1: {
          main: "#FF9600",
          dark: "#f87400",
          light: "rgba(255,169,71,0.3)",
        },
        accent2: {
          main: "#f83b49",
          dark: "#e32b38",
          light: "#FBD8DB",
        },
        accent3: {
          main: "#efefef",
        },
        gray: {
          1: "#4b4b4b",
          2: "#777777",
          3: "#afafaf",
        },
        grey: {
          1: "#4b4b4b",
          2: "#777777",
          3: "#afafaf",
        },
        border: {
          main: "#e5e5e5",
        },
        disable: {
          main: "#f3f3f3",
        },
        background: {
          main: "#fafafa",
        },
        black: {
          fix: "#000000",
          flexible: "#010000",
        },
        white: {
          fix: "#ffffff",
          flexible: "#feffff",
          verifyLoading: "rgb(51 51 51 / 59%)",
          transparent: "#FFFFFF80",
        },
        blackTransparent: {
          1: "rgba(0,0,0,0.32)",
          2: "rgba(0,0,0,0.87)",
        },
        system: {
          blue: "#007aff",
        },
        error: {
          main: "#e53935",
        },
        success: {
          main: "#20B33B",
        },
        fire: {
          main: "#ffc900",
        },
        learning_word: {
          main: "#F9FB02",
          transparent: "rgba(249,251,2,0.6)",
        },
        learning_phrase: {
          main: "#FBDA29",
          transparent: "rgba(251,218,41,0.6)",
        },
        new_phrase: {
          main: "#3FB1F8",
          transparent: "rgba(63,177,248,0.6)",
        },
        new_word: {
          main: "#98D8FF",
          transparent: "rgba(152,216,255,0.6)",
        },
        icon: {
          1: "#4d4d4d",
          2: "#7a7a7a",
        },
        tip_red: {
          background: "#ffe5e7",
        },
        tip_green: {
          background: "#e0ffed",
        },
        table_red: {
          background: "#ffbab4",
        },
        table_green: {
          background: "#aafc93",
        },
        question: {
          background: "#FAFAFF",
        },
      },
    });
  } else if (mode === "dark") {
    return createTheme({
      components: {
        MuiIconButton: {
          defaultProps: {
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
      faIR,
      typography: {
        fontFamily: "IRANSans",
      },
      palette: {
        type: "dark",
        primary: {
          main: "#0879CB",
          dark: "#145A8C",
          light: "#0A466B",
          transparent: "rgba(18,130,200,0.0)",
          min: "#252b31",
          // max: "rgba(180,227,255,0.5)",
          max: "#B4E3FF80",
        },
        select: { notifications: "#0d2c4b" },
        secondary: {
          main: "#00AA46",
          accent1: "#00C853",
          dark: "#008735",
          light: "#008232",
        },
        accent1: {
          main: "#FF9A0A",
          dark: "#FF7903",
          light: "rgba(254,151,159,0.3)",
        },
        accent2: {
          main: "#FC4654",
          dark: "#e32b38",
          light: "#FBD8DB",
        },
        accent3: {
          main: "#262626",
        },
        gray: {
          1: "#E6E6E6",
          2: "#A7A7A7",
          3: "#757575",
        },
        grey: {
          1: "#E6E6E6",
          2: "#A7A7A7",
          3: "#757575",
        },
        border: {
          main: "#363636",
        },
        disable: {
          main: "#1D1D1D",
        },
        background: {
          main: "#1b1c1e",
        },
        black: {
          fix: "#000000",
          flexible: "#feffff",
        },
        white: {
          fix: "#ffffff",
          flexible: "#2b2b2b",
          verifyLoading: "rgb(43 43 43 / 59%)",
          transparent: "rgba(0,0,0,0.50)",
        },
        blackTransparent: {
          1: "rgba(0,0,0,0.32)",
          2: "rgba(0,0,0,0.87)",
        },
        system: {
          blue: "#007aff",
        },
        error: {
          main: "#e53935",
        },
        success: {
          main: "#00ba2f",
        },
        fire: {
          main: "#ffc900",
        },
        learning_word: {
          main: "#A8952D",
          transparent: "rgba(168,149,45,0.6)",
        },
        learning_phrase: {
          main: "#504405",
          transparent: "rgba(80,68,5,0.6)",
        },
        new_phrase: {
          main: "#0992D6",
          transparent: "rgba(9,146,214,0.6)",
        },
        new_word: {
          main: "#003D63",
          transparent: "rgba(0,61,99,0.6)",
        },
        icon: {
          1: "#E4E4E4",
          2: "#A5A5A5",
        },
        tip_red: {
          background: "#600e15",
        },
        tip_green: {
          background: "#063b1c",
        },
        table_red: {
          background: "#8d1100",
        },
        table_green: {
          background: "#1c7c00",
        },
        question: {
          background: "#1F1F1F",
        },
      },
    });
  } else if (mode === "lightBrown") {
    return createTheme({
      components: {
        MuiIconButton: {
          defaultProps: {
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
      faIR,
      typography: {
        fontFamily: "IRANSans",
      },
      palette: {
        type: "lightBrown",
        primary: {
          main: "#00429e",
          dark: "#003082",
          light: "#77ccff",
          transparent: "rgba(0,66,158,0.0)",
          min: "#B4E3FF80",
          // max: "rgba(180,227,255,0.5)",
          max: "#00215a",
        },
        secondary: {
          main: "#00c853",
          accent1: "#0fdc60",
          dark: "#00aa46",
          light: "#94FFBE4D",
        },
        accent1: {
          main: "#ff9600",
          dark: "#f87400",
          light: "rgba(255,169,71,0.3)",
        },
        accent2: {
          main: "#f83b49",
          dark: "#e32b38",
          light: "#FBD8DB",
        },
        accent3: {
          main: "#dcd2bb",
        },
        gray: {
          1: "#4b4b4b",
          2: "#777777",
          3: "#afafaf",
        },
        grey: {
          1: "#4b4b4b",
          2: "#777777",
          3: "#afafaf",
        },
        border: {
          main: "#d7c8b2",
        },
        disable: {
          main: "#f0f0e4",
        },
        background: {
          main: "#e6dfc5",
        },
        black: {
          fix: "#000000",
          flexible: "#1e1400",
        },
        white: {
          fix: "#ffffff",
          flexible: "#fafaeb",
        },
        blackTransparent: {
          1: "rgba(0,0,0,0.32)",
          2: "rgba(0,0,0,0.87)",
        },
        system: {
          blue: "#007aff",
        },
        error: {
          main: "#e53935",
        },
        success: {
          main: "#20B33B",
        },
        fire: {
          main: "#ffc900",
        },
        learning_word: {
          main: "#f9fb02",
          transparent: "rgba(249,251,2,0.6)",
        },
        learning_phrase: {
          main: "#FBDA29",
          transparent: "#FBDA2999",
        },
        new_phrase: {
          main: "#3FB1F8",
          transparent: "#3FB1F899",
        },
        new_word: {
          main: "#98D8FF",
          transparent: "#98D8FF99",
        },
        icon: {
          1: "#4D4D4D",
          2: "#7A7A7A",
        },
      },
    });
  } else {
    return createTheme({
      components: {
        MuiIconButton: {
          defaultProps: {
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            disableFocusRipple: true,
            disableRipple: true,
            disableTouchRipple: true,
          },
        },
      },
      faIR,
      typography: {
        fontFamily: "IRANSans",
      },
      palette: {
        type: "light",
        primary: {
          main: "#00429E",
          dark: "#003082",
          light: "#77CCFF",
          transparent: "rgba(0,66,158,0.0)",
          min: "#e2f0ff",
          max: "#00215A",
        },
        select: { notifications: "#c7dafb" },
        secondary: {
          main: "#00c853",
          accent1: "#0fdc60",
          dark: "#00aa46",
          light: "#94FFBE4D",
        },
        accent1: {
          main: "#FF9600",
          dark: "#f87400",
          light: "rgba(255,169,71,0.3)",
        },
        accent2: {
          main: "#f83b49",
          dark: "#e32b38",
          light: "#FBD8DB",
        },
        accent3: {
          main: "#efefef",
        },
        gray: {
          1: "#4b4b4b",
          2: "#777777",
          3: "#afafaf",
        },
        grey: {
          1: "#4b4b4b",
          2: "#777777",
          3: "#afafaf",
        },
        border: {
          main: "#e5e5e5",
        },
        disable: {
          main: "#f3f3f3",
        },
        background: {
          main: "#fafafa",
        },
        black: {
          fix: "#000000",
          flexible: "#010000",
        },
        white: {
          fix: "#ffffff",
          flexible: "#feffff",
          verifyLoading: "rgb(51 51 51 / 59%)",
          transparent: "#FFFFFF80",
        },
        blackTransparent: {
          1: "rgba(0,0,0,0.32)",
          2: "rgba(0,0,0,0.87)",
        },
        system: {
          blue: "#007aff",
        },
        error: {
          main: "#e53935",
        },
        success: {
          main: "#20B33B",
        },
        fire: {
          main: "#ffc900",
        },
        learning_word: {
          main: "#F9FB02",
          transparent: "rgba(249,251,2,0.6)",
        },
        learning_phrase: {
          main: "#FBDA29",
          transparent: "rgba(251,218,41,0.6)",
        },
        new_phrase: {
          main: "#3FB1F8",
          transparent: "rgba(63,177,248,0.6)",
        },
        new_word: {
          main: "#98D8FF",
          transparent: "rgba(152,216,255,0.6)",
        },
        icon: {
          1: "#4d4d4d",
          2: "#7a7a7a",
        },
        tip_red: {
          background: "#ffe5e7",
        },
        tip_green: {
          background: "#e0ffed",
        },
        table_red: {
          background: "#ffbab4",
        },
        table_green: {
          background: "#aafc93",
        },

        question: {
          background: "#FAFAFF",
        },
      },
    });
  }
};

export default theme;
