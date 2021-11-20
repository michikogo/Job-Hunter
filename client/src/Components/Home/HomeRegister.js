import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../Forms/Common/ErrorMessage";
import InvalidInput from "../Forms/Common/InvalidInput";
import Required from "../Forms/Common/Required";
import "./index.css";

const HomeRegister = () => {
  // to redirect to another page
  const navigate = useNavigate();
  // useStates of fields
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
  // Use to show error message for specific fields
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
  // to show error message when there is error
  const [errorRegister, setErrorRegister] = useState(false);

  // update value of input field
  const registerInputOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterInput((prevState) => ({ ...prevState, [name]: value }));
  };
  // check if inputs are valid
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
  // Adding user if all fields are valid
  const createUser = async () => {
    setErrorRegister(false);
    if (
      checkerFirstName === false &&
      checkerLastName === false &&
      checkerEmail === false &&
      checkerPassword === false
    ) {
      const name = firstName + " " + lastName;
      const createData = { name: name, email: email, password: password };
      // const response = await fetch("http://localhost:8000/user/register", {
      const response = await fetch(
        "https://lit-journey-80521.herokuapp.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createData),
        }
      );
      const data = await response.json();
      // console.log(data);
      if (data.status === "ok") {
        navigate("/dashboard");
      } else {
        setErrorRegister(true);
      }
    }
  };
  // acts as main function
  const registerUser = async (e) => {
    e.preventDefault();
    isValid();
    await createUser();
  };

  return (
    <div className="home-register-container">
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

export default HomeRegister;
