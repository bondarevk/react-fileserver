import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="container App">
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Home</h2>
        </div>
      </div>
    );
  }

}

export default App;
