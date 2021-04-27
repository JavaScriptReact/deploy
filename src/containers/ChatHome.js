import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import ChatHomeMenu from "./ChatHomeMenu";
import ChatRoomMenu from "./ChatRoomHome";
import ChatRoom from "./ChatRoom";

function ChatHome() {
  const { path } = useRouteMatch();

  return (
    <>
      <section style={{ overflow: "hidden" }}>
        <Switch>
          <Route path="/chat" exact>
            <ChatHomeMenu />
          </Route>
          <Route path={`${path}/room`} exact>
            <ChatRoomMenu />
          </Route>
          <Route path={`${path}/room/:id`}>
            <ChatRoom />
          </Route>
        </Switch>
      </section>
    </>
  );
}

export default ChatHome;
