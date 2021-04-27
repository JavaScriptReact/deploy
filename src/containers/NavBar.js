import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import AppBarComponent from "../components/AppBar";

function NavBar() {
  const history = useHistory();
  const location = useLocation();

  const [displayAppBar, setDisplayAppBar] = useState(true);

  useEffect(() => {
    const { pathname } = location;
    const isAuth =
      pathname.includes("authenticate") || pathname.includes("chat");
    setDisplayAppBar(isAuth ? false : true);
  }, [location]);

  useEffect(() => {
    console.log(history);
  }, [history]);

  const auth = (method) => {
    history.push(`/authenticate?method=${method}`);
  };

  return <>{displayAppBar && <AppBarComponent auth={auth} />}</>;
}

export default NavBar;
