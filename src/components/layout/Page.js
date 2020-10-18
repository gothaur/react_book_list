import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Books from "../books/Books";

class Page extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Books} />
        {/* <Route path="/task/add/" exact component={Form} />
        <Route path="/task/:taskId/" component={Task} /> */}
      </Switch>
    );
  }
}

export default Page;
