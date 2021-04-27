import React from "react";
import { useHistory } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const CustomPaper = styled(Paper)({
  height: 350,
  width: 350,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50% , -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",
});

const CustomButton = styled(Button)({
  width: "80%",
  height: 45,
});

function ChatHomeMenu() {
  const history = useHistory();

  const goRoom = () => {
    history.push("/chat/room");
  };

  return (
    <>
      <CustomPaper elevation={10}>
        <Typography variant="h4" color="primary">
          Choose One :
        </Typography>
        <CustomButton
          color="primary"
          variant="contained"
          size="large"
          onClick={goRoom}
        >
          Room Chat
        </CustomButton>
        <CustomButton
          color="primary"
          variant="contained"
          size="large"
          style={{ background: "lime" }}
        >
          Single Chat
        </CustomButton>
      </CustomPaper>
    </>
  );
}

export default ChatHomeMenu;
