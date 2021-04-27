import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

function API() {
  return <h1>Api of my application.</h1>;
}

export default API;
