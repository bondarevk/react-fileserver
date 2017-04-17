import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import './Twitter.css';
import Message from "./Message/Message";

class Twitter extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      inputMessage: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      messages: this.state.messages.concat({
        text: this.state.inputMessage,
        sender: 'Guest',
        date: new Date()
      }),
      inputMessage: ''
    })
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

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.inputMessage} onChange={this.handleChange.bind(this)} name="name"/>
          <input type="submit" value="Add"/>
        </form>

        <div>
          <ul>
            {
              this.state.messages.map((message, key) => {
                return <li key={key}>
                  <Message text={message.text} sender={message.sender} time={message.date.toLocaleString()}/>
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
