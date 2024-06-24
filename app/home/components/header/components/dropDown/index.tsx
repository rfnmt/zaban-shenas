import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useTheme } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import ImageProvider from "@/components/imageProvider";

function DropDown() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme() as any;
  const { profile_pic } = useSelector((state: RootReduxState) => state.user);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  function logoutUser() {
    router.push(`${pathname}?logout-modal=true`);
  }

  return (
    <div>
      <IconButton onClick={handleClick} className="user-avatar">
        {profile_pic ? (
          <ImageProvider src={profile_pic} width={48} height={48} />
        ) : (
          <Icon icon="zabanshenas" size={48} />
        )}
      </IconButton>
      <Menu
        className="header-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        onClick={closeMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            zIndex: 9999999,
            overflow: "visible",
            backgroundColor: "background.main",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="/profile">
          <MenuItem
            sx={{
              color: "gray.1",
              "&:hover": {
                background: (theme) => theme.palette.background.main,
              },
            }}
          >
            <Icon icon="zabanshenas" size={24} />
            پروفایل
          </MenuItem>
        </Link>
        <Divider sx={{ borderColor: theme.palette.border.main }} />
        <Link href="/setting">
          <MenuItem
            sx={{
              color: "gray.1",
              "&:hover": {
                background: (theme) => theme.palette.background.main,
              },
            }}
          >
            <Icon icon="appearance" size={24} />
            تنظیمات
          </MenuItem>
        </Link>
        <MenuItem
          sx={{
            color: "gray.1",
            "&:hover": {
              background: (theme) => theme.palette.background.main,
            },
          }}
          onClick={logoutUser}
        >
          <Icon icon="log-out" size={24} />
          خروج
        </MenuItem>
      </Menu>
    </div>
  );
}

export default DropDown;
