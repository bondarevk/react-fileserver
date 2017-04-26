import React from "react";
import ReactDOM from "react-dom";
import {observable} from "mobx";
import "./index.css";
import Routes from "./routes";

global.jQuery = require("jquery");
require('bootstrap');


class User {
  @observable username = 'Guest';
}
const user = new User();

ReactDOM.render(
  <Routes user={user}/>,
  document.getElementById('root')
);
