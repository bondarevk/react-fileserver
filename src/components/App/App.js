import React, {Component} from "react";
import * as $ from "jquery";
import {Helmet} from "react-helmet";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      c: ''
    }
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: 'api/weather',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        day: 1
      },
      success: (data) => {
        console.log(data);
        this.setState({
          c: data.c
        })
      }
    })
  }

  render() {
    return (
      <div className="container App">
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Home</h2>
          <h3>{this.state.c}</h3>
        </div>
      </div>
    );
  }

}

export default App;
