"use client";
import React from "react";
import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IBadgeData } from "./badge.interface";

function BadgesPage() {
  const theme = useTheme() as any;
  const getUserBadge = queryClient.getQueryData<IBadgeData>(["user-badge"]);
  return (
    <Box>
      <Typography
        className="badge-year"
        sx={{ color: theme.palette.gray["1"] }}
      >
        1402
      </Typography>
      <List
        sx={{ backgroundColor: theme.palette.white.flexible }}
        className="main-badge-list"
      >
        {getUserBadge?.badges?.reverse().map((item: any) => {
          return (
            <ListItem
              key={item.id}
              className="badge-list"
              sx={{
                borderBottomColor: `${theme.palette.border.main} !important`,
              }}
            >
              <Box>
                <Image
                  key={item?.data?.id}
                  src={item?.data?.thumbnail}
                  width={56}
                  height={56}
                  alt=""
                />
              </Box>
              <Box>
                <Typography sx={{ color: theme.palette.gray["1"] }}>
                  {item.data.title}
                </Typography>
                <Typography sx={{ color: theme.palette.gray["2"] }}>
                  {item.data.description}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default BadgesPage;
