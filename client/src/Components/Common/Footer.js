import React from "react";
import { logo } from "../../Assets";
import "./index.css";

const Footer = () => {
  return (
    <div className="header-container">
      <div></div>
      <div style={{ textAlign: "center" }}>
        <img src={logo} width="150" />
      </div>
    </div>
  );
};

export default Footer;
