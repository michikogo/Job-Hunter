import { useEffect, useState } from "react";
import { logo } from "../Assets/index.js";

const Header = () => {
  const [authNavBar, setAuthNavBar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthNavBar(true);
    } else {
      setAuthNavBar(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="header-div">
      <div>
        <a href="/">
          <img src={logo} alt="" className="header-image" />
        </a>
      </div>
      <div className="header-login">
        {authNavBar ? (
          <a href="/" onClick={handleLogout} className="header-login-link">
            Logout
          </a>
        ) : (
          <a href="/login" className="header-login-link">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
