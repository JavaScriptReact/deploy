import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import JoinRoom from "../components/JoinRoom";
import CreateRoom from "../components/CreateRoom";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const Container = styled(Paper)({
  height: 300,
  width: 300,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50% , -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const CustomButton = styled(Button)({
  width: "70%",
  height: 40,
});

function ChatRoomHome() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [view, setView] = useState("default");

  useEffect(() => {
    const action = new URLSearchParams(location.search).get("action");
    setView(action);
  }, [location]);

  const createRoom = () => {
    history.push(`${url}?action=create`);
  };

  const joinRoom = () => {
    history.push(`${url}?action=join`);
  };

  if (view === "create") return <CreateRoom />;
  if (view === "join") return <JoinRoom />;

  return (
    <>
      <Container elevation={10}>
        <CustomButton
          size="large"
          variant="contained"
          color="secondary"
          onClick={createRoom}
        >
          Create Room
        </CustomButton>
        <CustomButton
          size="large"
          variant="contained"
          color="primary"
          onClick={joinRoom}
        >
          Join Room
        </CustomButton>
      </Container>
    </>
  );
}

export default ChatRoomHome;
