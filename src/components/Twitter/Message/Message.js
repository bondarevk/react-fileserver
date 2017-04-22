import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Message.css";

class Message extends Component {
  render() {
    return (
      <div>
        <blockquote className="twitter-tweet">
          <p>{this.props.text}</p>
          <span> - <b>{this.props.sender}</b></span>
          <a>
            <small className="text-muted">{this.props.time}</small>
          </a>
        </blockquote>
      </div>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};


export default Message;