import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
// useHistory became useNavigate
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const naviage = useNavigate();
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [linkedAccounts, setLinkedAccounts] = useState("");
  const [status, setStatus] = useState("");

  const populateQuote = async () => {
    const request = await fetch("http://localhost:5000/directory/contents", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data1) => {
        console.log("data");
        console.log(data1);
      });

    // const data = await request.json();
    // console.log("here");
    // console.log(data);

    // if (data.status === "ok") {
    //   setUsername(data.email);
    // } else {
    //   alert(data.error);
    // }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        naviage("/login");
      } else {
        populateQuote();
      }
    } else {
      naviage("/login");
    }
  }, []);

  const updateCode = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:5000/directory/contents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username,
        companyName,
        role,
        location,
        dateApplied,
        linkedAccounts,
        status,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      // setQuote(tempQuote);
      // setTempQuote("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <p>Hello {username}</p>
      <form onSubmit={updateCode}>
        <input
          type="text"
          placeholder="Quote"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Quote"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Quote"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Quote"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Quote"
          value={linkedAccounts}
          onChange={(e) => setLinkedAccounts(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Quote"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input type="submit" value="update quote" />
      </form>
    </div>
  );
};

export default Dashboard;
