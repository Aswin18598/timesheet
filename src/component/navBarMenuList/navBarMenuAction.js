import React from "react"
import { styled } from "@mui/material/styles"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import LogoutIcon from "@mui/icons-material/Logout"

export default function NavBarMenuAction({
  handleMenuClose,
  isOpen,
  logOutChange,
}) {
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 150,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px ",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
      },
    },
  }))

  return (
    <>
      <StyledMenu open={isOpen} onClose={handleMenuClose} sx={{ top: "3rem" }}>
        {/* <MenuItem onClick={handleMenuClose} disableRipple>
          <AccountCircleIcon />
          Profile
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleMenuClose()
            logOutChange()
          }}
          disableRipple
        >
          <LogoutIcon />
          Log Out
        </MenuItem>
      </StyledMenu>
    </>
  )
}
