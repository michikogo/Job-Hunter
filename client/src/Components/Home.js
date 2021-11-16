import React from "react";
import { homeImage } from "../Assets";
import Register from "./Register";
import RegisterForm from "./RegisterForm";
const Home = () => {
  return (
    <div className="container">
      <div>
        <h1>Organize and schedule your job applications with us!</h1>
        <img src={homeImage} className="home-image" />
      </div>
      <div></div>
      <div className="home-register">
        <h3 className="home-register-text">
          Sign up now! We love to help you organize your job applications.
        </h3>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Home;
