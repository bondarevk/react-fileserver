import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Helmet} from "react-helmet";
import "./UserControl.css";

@inject("user")
@observer
class UserControl extends Component {

  constructor() {
    super();
    this.state = {
      inputUsername: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.user.username = this.state.inputUsername;
    console.log(this.state.inputUsername);
  }

  render() {
    return (
      <div className="container">

        <Helmet>
          <title>User Panel</title>
        </Helmet>

        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
          <input className="form-control" type="text" value={this.state.inputUsername}
                 onChange={event => this.setState({inputUsername: event.target.value})} placeholder="username"
                 name="name"/>
          <input className="btn btn-primary btn-set-username" type="submit" value="Set"/>
        </form>

      </div>
    );
  }
}

export default UserControl;
