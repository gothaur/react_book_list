import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="nav-link">
          Lista Książek
        </NavLink>
      </nav>
    );
  }
}

export default Header;
