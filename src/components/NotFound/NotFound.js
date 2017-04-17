import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import './NotFound.css';

class NotFound extends Component {

  render() {
    return (
      <div>

        <Helmet>
          <title>Not Found</title>
        </Helmet>

        <h2 style={{textAlign: "center"}}>
          Not Found ;(
        </h2>

      </div>
    );
  }

}

export default NotFound;
