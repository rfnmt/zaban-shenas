import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import Z3DButton from "@/components/Z3DButton";
import "./style.scss";
import { useRouter } from "next/navigation";

function InvitingFriends() {
  const theme = useTheme() as any;
  const router = useRouter();
  return (
    <Box className="invite-friends">
      <Box className="caption">
        <Box>
          <Typography sx={{ color: theme.palette.white.fix }}>
            دوستات رو دعوت کن
          </Typography>
          <Typography sx={{ color: theme.palette.white.fix }}>
            به دوستات بگو یاد گرفتن زبان تو زبان آموز چقدر راحت و لذت بخشه
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Icon icon="invite" size={70} />
        </Box>
      </Box>
      <Z3DButton onClick={() => router.push("/setting/introduce-to-friends")}>
        دعوت دوستان
      </Z3DButton>
    </Box>
  );
}

export default InvitingFriends;
