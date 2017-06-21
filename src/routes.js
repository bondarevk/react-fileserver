import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import App from "./components/App/App";
import Twitter from "./components/Twitter/Twitter";
import NotFound from "./components/NotFound/NotFound";
import Files from "./components/Files/Files";
import UserControl from "./components/UserControl/UserControl";
import {observer, Provider} from "mobx-react";

const Routes = observer((props) => (<div>
  <Provider {...props}>
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">

          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                  data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>

          <Link className="navbar-brand" to="/">Whoop</Link>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/files">Files</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  [ ... ]
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to="/twitter">Chat</Link>
                  <Link className="dropdown-item" to="/user">User Panel (Mobx)</Link>
                </div>
              </li>
            </ul>
            <span className="navbar-text">
            Username: {props.user.username}
          </span>
          </div>
        </nav>

        <main>
          <Switch>
            <Route exact path="/" user={props.user} component={App}/>
            <Route path="/twitter" component={Twitter}/>
            <Route path="/user" component={UserControl}/>
            <Route path="/files" component={Files}/>
            <Route component={NotFound}/>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  </Provider>
</div>));

export default Routes;