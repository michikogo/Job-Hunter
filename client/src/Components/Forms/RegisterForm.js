import React, { useState } from "react";
// useHistory became useNavigate
import { useNavigate } from "react-router-dom";
import "./index.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [checkerFirstName, setCheckerFirstName] = useState(false);
  const [lastName, setLastName] = useState("");
  const [checkerLastName, setCheckerLastName] = useState(false);
  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    if (firstName === "") {
      setCheckerFirstName(true);
    } else {
      setCheckerFirstName(false);
    }
    if (lastName === "") {
      setCheckerLastName(true);
    } else {
      setCheckerLastName(false);
    }

    if (password !== confirmPassword || password === "") {
      setPasswordChecker(true);
    } else {
      setPasswordChecker(false);
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLocaleLowerCase())) {
      setEmailChecker(true);
    } else {
      setEmailChecker(false);
    }
    if (
      !checkerFirstName &&
      !checkerLastName &&
      !emailChecker &&
      !passwordChecker
    ) {
      const name = firstName + " " + lastName;
      const createData = { name: name, email: email, password: password };
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createData),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "ok") {
        console.log("ok");
        navigate("/dashboard");
      } else {
        setErrorRegister(true);
      }
    }
  };

  return (
    <div className="register-container">
      <h1 style={{ textAlign: "center" }}>Create a Account</h1>
      {/* ERROR MESSAGE */}
      <div className="login-error">
        <p className={errorRegister ? "error-message" : "error-message-hide"}>
          Please use different email
        </p>
      </div>
      {/* FORM */}
      <form onSubmit={registerUser}>
        <div className="form-input">
          <label className="register-label">First Name</label>
          <input
            type="text"
            value={firstName}
            className="register-input"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div></div>
          <small
            className={emailChecker ? "error-message" : "error-message-hide"}
          >
            Missing First Name
          </small>
        </div>
        <div className="form-input">
          <label className="register-label">Last Name</label>
          <input
            type="text"
            value={lastName}
            className="register-input"
            onChange={(e) => setLastName(e.target.value)}
          />
          <div></div>
          <small
            className={emailChecker ? "error-message" : "error-message-hide"}
          >
            Missing Last Name
          </small>
        </div>
        <div className="form-input">
          <label className="register-label">Email Address</label>
          <input
            type="text"
            value={email}
            className="register-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div></div>
          <small
            className={emailChecker ? "error-message" : "error-message-hide"}
          >
            Not a valid email
          </small>
        </div>
        <div className="form-input">
          <label className="register-label">Password</label>
          <input
            type="password"
            value={password}
            className="register-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div></div>
          <small
            className={passwordChecker ? "error-message" : "error-message-hide"}
          >
            Empty or not matched password
          </small>
        </div>
        <div className="form-input">
          <label className="register-label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            className="register-input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div></div>
          <small
            className={passwordChecker ? "error-message" : "error-message-hide"}
          >
            Empty or not matched password
          </small>
        </div>
        <div className="register-button">
          <input type="submit" value="Register" className="custom-button" />
        </div>
      </form>
      <div className="register-question">
        <p style={{ marginBottom: "0px" }}>Have an account?</p>
        <p className="register-redirect">
          <a href="/login">Lets Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
