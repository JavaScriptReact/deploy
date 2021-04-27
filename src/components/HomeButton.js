import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import HomeIcon from "@material-ui/icons/Home";

function HomeButton({ className }) {
  const [home, setHome] = useState(false);

  const backToHome = () => {
    setHome(true);
  };

  if (home) return <Redirect to="/" />;

  return (
    <Tooltip title="Back to Home">
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={<HomeIcon />}
        onClick={backToHome}
        className={className}
      >
        Home
      </Button>
    </Tooltip>
  );
}

export default HomeButton;
