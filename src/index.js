import React from "react";
import ReactDOM from "react-dom";
import {observable} from "mobx";
import "./index.css";
import Routes from "./routes";

global.jQuery = require("jquery");
require('bootstrap');

const user = observable({username: 'Guest'});

ReactDOM.render(
  <Routes user={user}/>,
  document.getElementById('root')
);
