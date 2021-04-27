import React, { useRef, useEffect } from "react";
import AccountMenu from "./AccountMenu";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "blue",
    color: "white",
    top: 0,
  },
  header: {
    color: "white",
  },
  menuButton: {
    color: "white",
    fontSize: 20,
  },
  userInfo: {
    marginLeft: "60%",
    height: 60,
    width: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  account: {
    color: "white",
  },
}));

function AppBarComponent({ auth, signed, data }) {
  const [logedOut, setLogedOut] = React.useState(false);
  const history = useHistory();
  const account = useRef(null);
  const styles = useStyles();

  const [openMenu, setOpenMenu] = React.useState(false);

  const open = () => {
    setOpenMenu(true);
  };

  const close = () => {
    setOpenMenu(false);
  };

  const logOut = () => {
    axios
      .get("http://localhost:4000/log-out", { withCredentials: true })
      .then(({ data }) => {
        window.location.reload();
      });
  };

  return (
    <AppBar position="sticky" className={styles.root}>
      <Toolbar>
        <Tooltip title="menu" placement="bottom">
          <IconButton className={styles.menuButton}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Typography className={styles.header} variant="h4">
          Menu
        </Typography>
        <section className={styles.userInfo}>
          {!signed ? (
            <UnLogged auth={auth} />
          ) : (
            <Logged action={logOut} data={data} />
          )}
          <Tooltip title="account" placement="bottom">
            <IconButton ref={account} className={styles.account} onClick={open}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <AccountMenu close={close} open={openMenu} target={account.current} />
        </section>
      </Toolbar>
    </AppBar>
  );
}

function UnLogged({ auth }) {
  return (
    <>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        onClick={() => auth("sign-up")}
      >
        Sign Up
      </Button>
      <Button
        size="large"
        color="secondary"
        variant="contained"
        onClick={() => auth("login")}
      >
        Login
      </Button>
    </>
  );
}

function Logged({ action, data }) {
  return (
    <>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        onClick={action}
      >
        Log Out
      </Button>
      <Typography variant="h5" style={{ color: "white" }}>
        {data.username}
      </Typography>
    </>
  );
}

const mapState = (store) => {
  const { user } = store;
  return {
    signed: user.signed,
    data: user.data,
  };
};

export default connect(mapState, {})(AppBarComponent);
