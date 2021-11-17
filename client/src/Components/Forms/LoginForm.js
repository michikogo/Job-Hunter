import React, { useState } from "react";
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const loginUser = async (event) => {
    event.preventDefault();
    if (passwordChecker === "") {
      setPasswordChecker(true);
    } else {
      setPasswordChecker(false);
    }
    if (emailChecker === "") {
      setEmailChecker(true);
    } else {
      setEmailChecker(false);
    }

    if (!emailChecker && !passwordChecker) {
      const createData = { email: email, password: password };
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createData),
      });

      const data = await response.json();
      console.log(data);

      if (data.user) {
        // to see localstorage in console.log
        localStorage.setItem("token", data.user);
        setErrorLogin(false);
        window.location.href = "/dashboard";
      } else {
        setErrorLogin(true);
      }
    }
  };

  return (
    <div className="register-div">
      <h1>Login</h1>
      <div className="login-error">
        <p className={errorLogin ? "error-message" : "error-message-hide"}>
          Please check email and password
        </p>
      </div>
      <form onSubmit={loginUser}>
        <div className="form-input">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div></div>
          <small
            className={emailChecker ? "error-message" : "error-message-hide"}
          >
            Missing email
          </small>
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div></div>
          <small
            className={passwordChecker ? "error-message" : "error-message-hide"}
          >
            Missing password
          </small>
        </div>
        <div className="register-button-div">
          <input type="submit" value="Login" className="register-button" />
        </div>
      </form>
      <div className="register-question">
        <p>Do not have an account?</p>
        <p>
          <a href="/register">Lets Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
