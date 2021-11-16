import React, { useState } from "react";
// useHistory became useNavigate
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordChecker(true);
    } else {
      setEmailChecker(false);
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLocaleLowerCase())) {
      setEmailChecker(true);
    } else {
      setEmailChecker(false);
    }
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
      navigate("/login");
    }
  };

  return (
    <div className="register-div">
      <h1>Create a Account</h1>
      <form onSubmit={registerUser}>
        <div className="form-input form-input-padding">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-input form-input-padding">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label>Email Address</label>
          <input
            type="text"
            value={email}
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
            Password does not match
          </small>
        </div>
        <div className="form-input">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div></div>
          <small
            className={passwordChecker ? "error-message" : "error-message-hide"}
          >
            Password does not match
          </small>
        </div>
        <div className="register-button-div">
          <input type="submit" value="Register" className="register-button" />
        </div>
      </form>
      <div className="register-question">
        <p>Have a account?</p>
        <p>
          <a href="/login">Lets Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
