import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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
  height: 400,
  width: 300,
});

const CustomField = styled(TextField)({
  width: "100%",
});

function CreateRoom({ admin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [Data, setData] = useState({ room_name: "", room_password: "" });

  const writing = (event) => {
    const { name, value } = event.target;
    setData({ ...Data, [name]: value });
  };

  const create = () => {
    if (Data.room_name && Data.room_password) {
      axios
        .post(
          "http://localhost:4000/create-room",
          { name: Data.room_name, password: Data.room_password, admin: admin },
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          dispatch({
            type: "ROOM_CREATE",
            payload: {
              admin: admin,
              name: Data.room_name,
            },
          });
          history.push(`/chat/room/${Data.room_name}`);
        });
    } else {
      alert("Wrong room's name or password");
    }
  };

  return (
    <>
      <Container elevation={10}>
        <Typography variant="h4" color="primary">
          Create Room :
        </Typography>
        <CustomField
          type="text"
          name="room_name"
          label="Name"
          placeholder="Room's name"
          value={Data.room_name}
          onChange={(e) => writing(e)}
        />
        <CustomField
          type="password"
          name="room_password"
          label="Password"
          placeholder="Room's password"
          value={Data.room_password}
          onChange={(e) => writing(e)}
        />
        <Button
          color="secondary"
          size="large"
          variant="contained"
          style={{ width: "65%" }}
          onClick={create}
        >
          Create
        </Button>
      </Container>
    </>
  );
}

const mapState = (store) => {
  const { user } = store;
  return {
    admin: user.id,
  };
};

export default connect(mapState)(CreateRoom);
