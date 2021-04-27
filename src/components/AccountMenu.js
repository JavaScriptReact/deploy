import React from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function AccountMenu({ close, open, target }) {
  return (
    <>
      <Menu
        style={{
          marginTop: 50,
        }}
        open={open}
        onClose={close}
        anchorEl={target}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
      >
        <MenuItem onClick={close}>Sign Up</MenuItem>
        <MenuItem onClick={close}>Login</MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;
