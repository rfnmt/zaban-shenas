import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import Image from "next/image";
import Icon from "@/components/icon";
import { useRouter } from "next/navigation";

function BadgesSnapshot({ badgesData }: any) {
  const theme = useTheme() as any;
  const router = useRouter();
  return (
    <Box className="user-badges">
      <Typography
        sx={{ color: theme.palette.gray["1"] }}
        className="medal-title"
      >
        مدال ها
      </Typography>
      <Box
        sx={{
          background: theme.palette.white.flexible,
          boxShadow: "0px 1px 1px #00000029",
        }}
        className="medals-holder"
      >
        <Box
          className="medals"
          sx={{ borderBottom: `1px solid ${theme.palette.border.main} ` }}
        >
          {badgesData?.map((item: any) => {
            return (
              <Image
                key={item?.data?.id}
                src={item?.data?.thumbnail}
                width={48}
                height={48}
                alt=""
              />
            );
          })}
        </Box>
        <Box className="see-all" onClick={() => router.push("/profile/badges")}>
          <Icon icon="chevron-left" size={24} />
          <Typography sx={{ color: theme.palette.gray["1"] }}>
            دیدن همه
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default BadgesSnapshot;
