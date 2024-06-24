import { RootReduxState } from "@/providers/Redux/store";
import { Box, Button, useTheme } from "@mui/material";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";

interface IGoogleLogin {
  googleResponse: (x: any) => void;
}

function GoogleButton({ googleResponse }: IGoogleLogin) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);

  return (
    <Box
      className="send-or-register google"
      sx={{
        "& .google-button": {
          backgroundColor: `${theme.palette.white.flexible} !important`,
          color: theme.palette.gray[1],
        },
      }}
    >
      <GoogleLogin
        size="large"
        shape="circle"
        theme={mode === "light" ? "outline" : "filled_black"}
        onSuccess={googleResponse}
        logo_alignment="center"
        text="signin_with"
        locale="fa-IR"
      />
    </Box>
  );
}

export default GoogleButton;
