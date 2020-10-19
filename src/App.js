import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/layout/Header";
import Dashboard from "./components/books/Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
          <Dashboard />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
