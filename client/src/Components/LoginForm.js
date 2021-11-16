import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    console.log(email);
    console.log(password);

    event.preventDefault();
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
      alert("login successful");
      window.location.href = "/dashboard";
    } else {
      alert("please check username and password");
    }
  };

  return (
    <div className="register-div">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div className="form-input form-input-padding">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input form-input-padding">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
