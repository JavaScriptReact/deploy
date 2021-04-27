import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";

import LoginForm from "../components/loginForm";
import SignUpForm from "../components/signUpForm";
import HomeButton from "../components/HomeButton";

import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: 550,
    width: 400,
    padding: 10,
  },
  homeButton: {
    margin: 10,
  },
});

function Auth() {
  const styles = useStyles();
  const location = useLocation();
  const method = new URLSearchParams(location.search).get("method");
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (method !== "sign-up" && method !== "login") {
      history.push(`${url}?method=sign-up`);
    }
  }, [method, history, url]);

  return (
    <>
      <HomeButton className={styles.homeButton} />
      <Paper
        className={styles.paper}
        elevation={15}
        style={{ height: method === "login" && 300 }}
      >
        {method === "sign-up" ? <SignUpForm /> : <LoginForm />}
      </Paper>
    </>
  );
}

export default Auth;
