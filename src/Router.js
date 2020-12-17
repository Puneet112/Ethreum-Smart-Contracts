import React from "react";
import { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import App from "./components/App";

class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tokens" component={App} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Router;
