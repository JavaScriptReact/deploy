import React from "react";
import { useHistory } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import FacebookIcon from "@material-ui/icons/Facebook";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const rooms = [
  { name: "Facebook" },
  { name: "Instagram" },
  { name: "Google" },
  { name: "SnapChat" },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "100%",
    background: "whitesmoke",
    boxShadow: "inset 0 0 2px black",
    borderRadius: 10,
  },
  list: {
    width: "100%",
  },
}));

function SideMenu() {
  const classes = useStyles();
  const history = useHistory();

  const showRoom = (room) => {
    history.push(`/chat/room/${room}`);
  };

  return (
    <section className={classes.paper}>
      <List className={classes.list}>
        {rooms.map((room) => {
          return <ListContent room={room} action={showRoom} />;
        })}
      </List>
    </section>
  );
}

function ListContent({ room, action }) {
  return (
    <ListItem
      button
      style={{ borderBottom: "dotted 1px black" }}
      onClick={() => action(room.name)}
    >
      <ListItemIcon>
        <FacebookIcon
          style={{
            background: "blue",
            color: "white",
            borderRadius: "50%",
          }}
        />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6" color="primary">
          {room.name}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default SideMenu;
