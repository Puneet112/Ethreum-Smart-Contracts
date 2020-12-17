import React, { Component } from "react";
import { Link } from "react-router-dom";
import farmer from "../farmer.png";

class Navbar extends Component {
  render() {
    let content;
    if (this.props.account) {
      content = this.props.account;
    } else {
      content = (
        <Link to="/tokens">
          <button className="btn btn-lg btn-outline-light tokens">
            Tokens
          </button>
        </Link>
      );
    }
    return (
      <nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          <img
            src={farmer}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          <span>DApp Token Farm</span>
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <div>
              <div id="account">{content}</div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
