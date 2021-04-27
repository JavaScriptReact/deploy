import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_SIGN, USER_CHAT } from "../redux/actions/index";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GoogleIcon from "@material-ui/icons/AssignmentInd";
import UserIcon from "@material-ui/icons/PersonAdd";
import Link from "@material-ui/core/Link";

const ServerUrl = "http://localhost:4000";

const Texts = styled(TextField)({
  width: "100%",
  textAlign: "center",
  display: "flex",
  jsutifyContent: "center",
});

const SignButton = styled(Button)({
  width: "90%",
});

const textFieldData = [
  { xs: 6, type: "text", label: "First Name", name: "first_name" },
  { xs: 6, type: "text", label: "Last Name", name: "last_name" },
  { xs: 12, type: "text", label: "Username", name: "username" },
  { xs: 12, type: "email", label: "Email", name: "email" },
  { xs: 12, type: "number", label: "Phone Number", name: "phone" },
  { xs: 12, type: "password", label: "Password", name: "password" },
];

function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const goToLogin = () => {
    history.push("/authenticate?method=login");
  };

  const signUp = () => {
    if (
      values.first_name &&
      values.last_name &&
      values.username &&
      values.email &&
      values.phone &&
      values.password
    ) {
      axios
        .post(
          `http://localhost:4000/sign-up`,
          { ...values },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const { data } = response;
          console.log(data);
          dispatch({
            type: USER_SIGN,
            payload: {
              token: data.token,
              user: data.user,
            },
          });
          history.push("/");
        });
    }
  };

  return (
    <>
      <Typography
        style={{ textAlign: "center", marginBottom: 5 }}
        color="primary"
        variant="h3"
      >
        Sign Up
      </Typography>
      <Grid container spacing={2}>
        {textFieldData.map((value) => {
          return (
            <Input
              key={value.name}
              {...value}
              action={setValues}
              values={values}
            />
          );
        })}
        <Grid
          xs={12}
          item
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SignButton
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<GoogleIcon />}
          >
            Sign Up with Google
          </SignButton>
        </Grid>
        <Grid
          xs={12}
          item
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SignButton
            style={{ width: "70%" }}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<UserIcon />}
            onClick={signUp}
          >
            Sign Up
          </SignButton>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", marginTop: 5 }}
          >
            Already have an account ?{" "}
            <Link style={{ cursor: "pointer" }} onClick={goToLogin}>
              Login here.
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

function Input({ xs, type, label, name, action, values }) {
  const handler = (event) => {
    const { name, value } = event.target;
    action({ ...values, [name]: value });
  };

  return (
    <Grid item xs={xs}>
      <Texts
        type={type}
        label={label}
        required
        placeholder="write something..."
        name={name}
        onChange={(event) => handler(event)}
        value={values[name]}
        inputProps={{
          style: {
            paddingLeft: 10,
          },
        }}
      />
    </Grid>
  );
}

export default SignUp;
