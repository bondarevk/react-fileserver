import React, {Component} from "react";
import {Helmet} from "react-helmet";
import * as io from "socket.io-client";
import "./Twitter.css";
import Message from "./Message/Message";

class Twitter extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      messages: [],
      inputMessage: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    let message = {
      text: this.state.inputMessage
    };

    this.socket.emit('create message', message);

    this.setState({
      inputMessage: ''
    })
  }

  componentWillMount() {
    this.socket = io.connect();

    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });

    this.socket.on('clear', () => {
      this.setState({
        messages: []
      });
    });

    this.socket.on('new', (data) => {
      console.log(data);
      if (Array.isArray(data)) {
        this.setState({
          messages: data.reverse().concat(this.state.messages)
        });
      } else {
        this.refs['whoop'].play();
        this.refs['whoop'].volume = 1.0;
        this.setState({
          messages: [data].concat(this.state.messages)
        });
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleChange(event) {
    this.setState({inputMessage: event.target.value})
  }

  render() {
    return (
      <div className="container">

        <Helmet>
          <title>Twitter</title>
        </Helmet>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.inputMessage} onChange={this.handleChange} name="name"/>
          <input type="submit" value="Add"/>
        </form>

        <audio ref="whoop" src="sound.mp3" preload="auto"/>

        <div>
          <ul>
            {
              this.state.messages.map((message) => {
                return <li key={message.id}>
                  <Message text={message.text} sender={message.sender} time={message.timestamp}/>
                </li>
              })
            }
          </ul>
        </div>

      </div>
    );
  }
}

export default Twitter;
