import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./App.css";

import Header from "./Components/Common/Header";
import Register from "./Components/Forms/Register";
import Login from "./Components/Forms/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import Footer from "./Components/Common/Footer";

const App = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/!" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
