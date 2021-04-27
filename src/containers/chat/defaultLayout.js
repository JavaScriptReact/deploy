import React from "react";
import AppBar from "../../components/chat/AppBar";
import SideMenu from "../../components/chat/SideMenu";
import ChatScreen from "../../components/chat/ChatScreen";

import Grid from "@material-ui/core/Grid";

const container = {
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  padding: 5,
  margin: 0,
};

function DefaultLayout({ id }) {
  return (
    <section className="chat-app" style={container}>
      <Grid container spacing={1} style={{ height: "100%" }}>
        <Grid item xs={12} style={{ height: "12%" }}>
          <AppBar id={id} />
        </Grid>
        <Grid container spacing={1} style={{ height: "88%" }}>
          <Grid item xs={3}>
            <SideMenu />
          </Grid>
          <Grid item xs={9}>
            <ChatScreen />
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}

export default DefaultLayout;
