import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "./socket-server/useChat";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "96.5%",
    height: "96%",
    boxShadow: "inset 0 0 2px black",
    background: "#e6e6ed",
    borderRadius: 20,
    padding: 10,
  },
  header: {
    borderRadius: 20,
    width: "100%",
    height: "10%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  content: {
    width: "100%",
    height: "80%",
    background: "lightblue",
  },
  action: {
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  field: {
    width: "70%",
    background: "white",
  },
}));

function ChatScreen({ token }) {
  const classes = useStyles();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const { message, sendMessage } = useChat(id, token);

  const Send = () => {
    sendMessage(value);
    setValue("");
  };

  return (
    <section className={classes.container}>
      <section className={classes.header}>
        <Typography variant="h4" color="primary">
          {id}
        </Typography>
      </section>
      <section className={classes.content}>
        {message.map((msg) => {
          return (
            <h1>
              {msg.id} : {msg.message}
            </h1>
          );
        })}
      </section>
      <section className={classes.action}>
        <TextField
          type="text"
          placeholder="write message..."
          className={classes.field}
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && Send()}
        />
        <Button color="primary" size="large" variant="contained" onClick={Send}>
          Send
        </Button>
      </section>
    </section>
  );
}

const mapStateToProps = (store) => {
  const { user } = store;
  return {
    token: user.token,
  };
};

export default connect(mapStateToProps, {})(ChatScreen);
