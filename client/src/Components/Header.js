import React from "react";
import { logo } from "../Assets/index.js";

const Header = () => {
  return (
    <div className="header-div">
      <img src={logo} alt="" className="header-image" />
      <p className="header-login">Login</p>
    </div>
  );
};

export default Header;
