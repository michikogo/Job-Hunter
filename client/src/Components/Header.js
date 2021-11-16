import React from "react";
import { logo } from "../Assets/index.js";

const Header = () => {
  return (
    <div className="header-div">
      <a href="/">
        <img src={logo} alt="" className="header-image" />
      </a>

      <a href="/login" className="header-login">
        Login
      </a>
    </div>
  );
};

export default Header;
