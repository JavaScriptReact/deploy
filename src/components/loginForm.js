import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../redux/actions/index";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, styled } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    width: "100%",
  },
}));

const CustomField = styled(TextField)({
  width: "100%",
});

function LoginForm() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const history = useHistory();
  const { url } = useRouteMatch();

  const [Data, setData] = useState({ email: "", password: "" });

  const handler = () => {
    history.push(`${url}?method-sign-up`);
  };

  const writing = (event) => {
    const { name, value } = event.target;
    setData({ ...Data, [name]: value });
  };

  const login = () => {
    if (Data.email && Data.password) {
      axios
        .post(
          "http://localhost:4000/login",
          { ...Data, makeCookie: true },
          { withCredentials: true }
        )
        .then((response) => {
          const { user, token } = response.data;

          if (user) {
            dispatch({
              type: USER_LOGIN,
              payload: {
                token: token,
                user: user,
              },
            });
            history.push("/");
          } else {
            alert("Error with login");
          }
        });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" className={styles.text}>
            Login
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CustomField
            type="text"
            placeholder="Email..."
            label="Email"
            name="email"
            value={Data.email}
            onChange={(e) => writing(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomField
            type="password"
            placeholder="Password..."
            label="Password"
            name="password"
            value={Data.password}
            onChange={(e) => writing(e)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={login}
          >
            Login
          </Button>
        </Grid>

        <Grid item sx={12}>
          <Typography variant="h6" className={styles.text}>
            Don't have an account yet ?{" "}
            <Link style={{ cursor: "pointer" }} onClick={handler}>
              Sign up here.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default LoginForm;
