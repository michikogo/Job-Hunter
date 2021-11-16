import React from "react";
import { logo } from "../Assets/index.js";

const Header = () => {
  return (
    <div className="header-div">
      <div>
        <a href="/">
          <img src={logo} alt="" className="header-image" />
        </a>
      </div>
      <div className="header-login">
        <a href="/login" className="header-login-link">
          Login
        </a>
      </div>
    </div>
  );
};

export default Header;
