import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import App from './components/App/App'
import Twitter from './components/Twitter/Twitter'
import NotFound from "./components/NotFound/NotFound";
import Files from "./components/Files/Files";

const Routes = () => (
  <BrowserRouter>
    <div>
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <Link className="navbar-brand" to="/">Whoop</Link>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/files">Files</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Lessons
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/twitter">Twitter</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/twitter" params={{title: "Twitter"}} component={Twitter} />
          <Route path="/files" component={Files} />
          <Route component={NotFound}/>
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default Routes;