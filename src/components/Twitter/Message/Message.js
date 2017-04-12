import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  render() {
    return (
      <div>
        <blockquote className="twitter-tweet">
          <p>{this.props.text}</p>
          <span> - {this.props.sender}</span>
          <a> {this.props.time}</a>
        </blockquote>
      </div>
    )
  }
}

export default Message;