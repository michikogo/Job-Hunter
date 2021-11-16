import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
// useHistory became useNavigate
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Dashboard = () => {
  const naviage = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  const populateQuote = async () => {
    const request = await fetch("http://localhost:5000/directory/contents", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    console.log("here");
    console.log(data);

    if (data.status === "ok") {
      setUsername(data.name);
    } else {
      alert(data.error);
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = jwt.decode(token);
  //     if (!user) {
  //       localStorage.removeItem("token");
  //       naviage("/login");
  //     } else {
  //       populateQuote();
  //     }
  //   } else {
  //     naviage("/login");
  //   }
  // }, []);

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <p>Hello {username}</p>
      <div className="register-button-div">
        <input
          type="submit"
          value="Add Application"
          className="register-button"
          onClick={handleShow}
        />
      </div>
      <div>
        <div style={{ position: "block" }}>
          {showModal && <Modal username={username} handleClose={handleClose} />}
        </div>
        <div style={{ position: "block" }}>
          <p>
            Michiko's Org - 2021-02-17 Settings Access Manager Billing All
            Clusters Get Help Michiko Directory Atlas Realm Charts DEPLOYMENT
            Databases Triggers Data Lake SECURITY Database Access Network Access
            Advanced MICHIKO'S ORG - 2021-02-17 > DIRECTORY > DATABASES
            UserSchema VERSION 4.4.10 REGION AWS N. Virginia (us-east-1)
            Overview Real Time Metrics Collections Search Profiler Performance
            Advisor Online Archive Command Line Tools DATABASES: 1 COLLECTIONS:
            2 VISUALIZE YOUR DATA REFRESH Create Database NAMESPACES
            directory-schema directory-data user-data directory-schema.user-data
            COLLECTION SIZE: 625B TOTAL DOCUMENTS: 4 INDEXES TOTAL SIZE: 72KB
            Find Indexes Schema Anti-Patterns 0 Aggregation Search Indexes
            INSERT DOCUMENT FILTER    QUERY RESULTS 0 System StatusAll Good
            ©2021 MongoDB, Inc.StatusTermsPrivacyAtlas BlogContact Sales
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
