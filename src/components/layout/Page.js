import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Books from "../books/Books";

class Page extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Books} />
      </Switch>
    );
  }
}

export default Page;
