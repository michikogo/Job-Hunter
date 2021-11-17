import React from "react";
import { homeImage } from "../Assets";
import RegisterForm from "./Forms/RegisterForm";
const Home = () => {
  return (
    <div className="home-container">
      <div>
        <h1>Organize and schedule your job applications with us!</h1>
        <img src={homeImage} className="home-image" />
      </div>
      <div></div>
      <div style={{ paddingTop: "5rem" }}>
        <h3>
          Sign up now! We love to help you organize your job applications.
        </h3>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Home;
