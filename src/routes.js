import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './components/App/App'
import Twitter from './components/Twitter/Twitter'
import NotFound from "./components/NotFound/NotFound";
import Files from "./components/Files/Files";

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/twitter" component={Twitter} />
        <Route path="/files" component={Files} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;