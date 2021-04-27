import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const Container = styled(Paper)({
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50% , -50%)",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: 500,
  width: 300,
});

const CustomField = styled(TextField)({
  width: "100%",
});

function JoinRoom({ id, userName }) {
  const history = useHistory();
  const [values, setValues] = useState({
    room_name: "",
    room_code: "",
    room_password: "",
  });
  const [code, setCode] = useState(false);

  const writing = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const switching = () => {
    setCode(!code);
  };

  const join = () => {
    axios
      .post("http://localhost:4000/join-room", {
        name: values.room_name,
        code: values.room_code,
        password: values.room_password,
        id: id,
        userName: userName,
      })
      .then(({ data }) => {
        alert(JSON.stringify(data, null, 2));
        history.push(`/chat/room/${data.name}`);
      });
  };

  return (
    <>
      <Container elevation={10}>
        <Typography variant="h4" color="primary">
          Let's join to Room
        </Typography>
        <CustomField
          type="text"
          name="room_name"
          placeholder="Name..."
          label="Name"
          onChange={(e) => writing(e)}
          value={values.room_name}
          disabled={code}
        />
        <CustomField
          type="password"
          name="room_password"
          placeholder="Password..."
          label="Password"
          onChange={(e) => writing(e)}
          value={values.room_password}
          disabled={code}
        />
        <CustomField
          type="text"
          name="room_code"
          placeholder="Code..."
          label="Code"
          onChange={(e) => writing(e)}
          value={values.room_code}
          disabled={!code}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Switch
              color="secondary"
              size="large"
              onChange={switching}
              value={code}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" color="secondary">
              I have a room code.
            </Typography>
          </Grid>
        </Grid>
        <Button
          size="large"
          variant="contained"
          style={{ height: 40, width: "60%", background: "Lime" }}
          onClick={join}
        >
          Join
        </Button>
      </Container>
    </>
  );
}

const mapState = (store) => {
  const { user } = store;
  return {
    id: user.data.iat,
    userName: user.data.username,
  };
};

export default connect(mapState)(JoinRoom);
