import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const CustomBadge = withStyles({
  badge: {
    backgroundColor: "lime",
    color: "lime",
    height: 12,
    width: 12,
    bottom: 2,
    right: 2,
    border: "solid 1px green",
  },
})(Badge);

const useStyles = makeStyles((theme) => ({
  members: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  member: {
    marginRight: 12,
    height: 50,
    width: 50,
    "&:hover": {
      transform: "scale(1.05)",
      cursor: "pointer",
    },
  },
}));

function ApBar({ id, members }) {
  const [Data, setData] = useState([]);
  const classes = useStyles();

  return (
    <>
      <AppBar position={"sticky"} color="primary" style={{ width: "99%" }}>
        <ToolBar>
          <Grid container spacing={2}>
            <Grid item xs={1} style={{ borderRight: "dotted 2px white" }}>
              <CustomBadge
                variant="dot"
                overlap="circle"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Avatar
                  style={{ transform: "scale(1.1)", background: "lightblue" }}
                >
                  You
                </Avatar>
              </CustomBadge>
            </Grid>
            <Grid xs={11} item className={classes.members}>
              <RoomMembers members={members} clas={classes.member} />
            </Grid>
          </Grid>
        </ToolBar>
      </AppBar>
    </>
  );
}

const colors = [
  "red",
  "blue",
  "orange",
  "purple",
  "lime",
  "green",
  "pink",
  "lightblue",
  "brown",
];

function RoomMembers({ members, clas }) {
  return (
    <>
      {members.map((member) => {
        return (
          <Avatar
            className={clas}
            style={{
              background:
                colors[Math.round(Math.random() * colors.length)] || "blue",
            }}
          >
            {String(member.userName).slice(0, 2)}
          </Avatar>
        );
      })}
    </>
  );
}

const mapState = (store) => {
  const { room } = store;
  return {
    members: room.members,
  };
};

export default connect(mapState, {})(ApBar);
