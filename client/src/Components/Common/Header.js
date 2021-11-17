import { useEffect, useState } from "react";
import { logo } from "../../Assets/index.js";
import "./index.css";

const Header = () => {
  const [authNavBar, setAuthNavBar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      // console.log("Auth", token);
      setAuthNavBar(true);
    } else {
      // console.log("Unauth: ", token);
      setAuthNavBar(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="header-container">
      {authNavBar ? (
        // Signed in
        <div className="header-grid">
          <div className="header-col1">
            <a href="/">
              <img src={logo} width="150" />
            </a>
            <a href="/dashboard">
              <p style={{ padding: "0px 1rem" }}>Dashboard</p>
            </a>
          </div>
          <div className="header-col2">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        // Not signed in
        <div className="header-grid">
          <a href="/">
            <img src={logo} width="150" />
          </a>
          <div className="header-col2">
            <a href="/login">Login</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
