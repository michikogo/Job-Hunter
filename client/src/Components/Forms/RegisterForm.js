import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./Common/ErrorMessage";
import InvalidInput from "./Common/InvalidInput";
import Required from "./Common/Required";
import "./index.css";

const RegisterForm = () => {
  // used for redirecting to /dashboard
  const navigate = useNavigate();
  const inputInitial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [
    { firstName, lastName, email, password, confirmPassword },
    setRegisterInput,
  ] = useState(inputInitial);
  // used to show error messages
  const initialChecker = {
    checkerFirstName: "",
    checkerLastName: "",
    checkerEmail: "",
    checkerPassword: "",
  };
  const [
    { checkerFirstName, checkerLastName, checkerEmail, checkerPassword },
    setCheckRegister,
  ] = useState(initialChecker);
  // used to show error message when fetch returns error
  const [errorRegister, setErrorRegister] = useState(false);
  // appending the letters to create into words
  const registerInputOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput((prevState) => ({ ...prevState, [name]: value }));
  };
  // Update states and show error message when it is false
  const isValid = () => {
    if (firstName === "") {
      setCheckRegister((prevState) => ({
        ...prevState,
        checkerFirstName: true,
      }));
    } else {
      setCheckRegister((prevState) => ({
        ...prevState,
        checkerFirstName: false,
      }));
    }
    if (lastName === "") {
      setCheckRegister((prevState) => ({
        ...prevState,
        checkerLastName: true,
      }));
    } else {
      setCheckRegister((prevState) => ({
        ...prevState,
        checkerLastName: false,
      }));
    }
    if (password !== confirmPassword || password === "") {
      setCheckRegister((prevState) => ({
        ...prevState,
        checkerPassword: true,
      }));
    } else {
      setCheckRegister((prevState) => ({
        ...prevState,
        checkerPassword: false,
      }));
    }
    if (email === "") {
      setCheckRegister((prevState) => ({ ...prevState, checkerEmail: true }));
    } else {
      setCheckRegister((prevState) => ({ ...prevState, checkerEmail: false }));
    }
  };
  // Adding user
  const createUser = async () => {
    if (
      checkerFirstName === false &&
      checkerLastName === false &&
      checkerEmail === false &&
      checkerPassword === false
    ) {
      const name = firstName + " " + lastName;
      const createData = { name: name, email: email, password: password };

      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createData),
      });
      const data = await response.json();
      // console.log(data)
      if (data.status === "ok") {
        navigate("/dashboard");
      } else {
        setErrorRegister(true);
      }
    }
  };
  // main function
  const registerUser = (e) => {
    e.preventDefault();
    isValid();
    createUser();
  };

  return (
    <div className="register-container">
      <h1 style={{ textAlign: "center" }}>Create a Account</h1>
      <InvalidInput
        showMessage={errorRegister}
        message=" Please use different email"
      />
      <form onSubmit={registerUser}>
        <div className="form-input">
          <label className="register-label">
            First Name
            <Required />
          </label>
          <input
            name="firstName"
            type="text"
            value={firstName}
            className="register-input"
            onChange={registerInputOnChange}
          />
          <ErrorMessage
            showMessage={checkerFirstName}
            message="Missing First Name"
          />
        </div>
        <div className="form-input">
          <label className="register-label">
            Last Name
            <Required />
          </label>
          <input
            name="lastName"
            type="text"
            value={lastName}
            className="register-input"
            onChange={registerInputOnChange}
          />
          <ErrorMessage
            showMessage={checkerLastName}
            message="Missing Last Name"
          />
        </div>
        <div className="form-input">
          <label className="register-label">
            Email Address
            <Required />
          </label>
          <input
            name="email"
            type="text"
            value={email}
            className="register-input"
            onChange={registerInputOnChange}
          />
          <ErrorMessage showMessage={checkerEmail} message="Invalid email" />
        </div>
        <div className="form-input">
          <label className="register-label">
            Password
            <Required />
          </label>
          <input
            name="password"
            type="password"
            value={password}
            className="register-input"
            onChange={registerInputOnChange}
          />
          <ErrorMessage
            showMessage={checkerPassword}
            message="Empty or not matched password"
          />
        </div>
        <div className="form-input">
          <label className="register-label">
            Confirm Password
            <Required />
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            className="register-input"
            onChange={registerInputOnChange}
          />
          <ErrorMessage
            showMessage={checkerPassword}
            message="Empty or not matched password"
          />
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
