import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_VERIFY } from "./redux/actions/index";

import HomePage from "./HomePage";
import NavBar from "./containers/NavBar";
import Auth from "./containers/authentication";
import API from "./containers/API";
import Chat from "./containers/ChatHome";

import "./styles/styl/style.css";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:4000/user-verify", { withCredentials: true })
      .then((response) => {
        const { data } = response;
        if (data.status === "ok") {
          dispatch({
            type: USER_VERIFY,
            payload: {
              token: data.token,
              data: data.data,
            },
          });
        } else if (data.redirect) {
          history.push(data.redirect);
        }
      });
  }, [dispatch, history]);

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/authenticate" exact>
          <Auth />
        </Route>
        <Route path="/api" exact>
          <API />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
      </Switch>
    </>
  );
}

export default App;
