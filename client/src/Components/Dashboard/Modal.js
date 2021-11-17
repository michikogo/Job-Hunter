import React, { useState } from "react";

const Modal = ({ handleClose }) => {
  // Sending the inputs to backend
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [linkedAccounts, setLinkedAccounts] = useState("");
  const [status, setStatus] = useState("");

  // For error message to show
  const [checkCompanyName, setCheckCompanyName] = useState(false);
  const [checkRole, setCheckRole] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [checkDateApplied, setCheckDateApplied] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);

  const checkMissing = () => {
    console.log(status);
    if (companyName === "") {
      setCheckCompanyName(true);
    } else {
      setCheckCompanyName(false);
    }

    if (role === "") {
      setCheckRole(true);
    } else {
      setCheckRole(false);
    }

    if (location === "") {
      setCheckLocation(true);
    } else {
      setCheckLocation(false);
    }

    if (dateApplied === "") {
      setCheckDateApplied(true);
    } else {
      setCheckDateApplied(false);
    }

    if (status === "") {
      setCheckStatus(true);
    } else {
      setCheckStatus(false);
    }
  };
  const updateCode = async (e) => {
    e.preventDefault();
    checkMissing();

    if (
      !checkCompanyName &&
      !checkRole &&
      !checkLocation &&
      !checkDateApplied &&
      !checkStatus
    ) {
      const req = await fetch("http://localhost:5000/directory/contents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
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
        handleClose();
      } else {
        alert(data.error);
      }
    }
  };

  return (
    <div className="modal-container">
      <p className="modal-close" onClick={handleClose}>
        X
      </p>
      <h1 style={{ textAlign: "center", paddingBottom: "2rem" }}>
        Add Application
      </h1>
      <form onSubmit={updateCode}>
        <div className="form-input">
          <label className="register-label">Company Name</label>
          <input
            type="text"
            value={companyName}
            className="register-input"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div></div>
          <small
            className={
              checkCompanyName ? "error-message" : "error-message-hide"
            }
          >
            Missing Company name
          </small>
        </div>
        <div className="form-input">
          <label className="register-label">Role</label>
          <input
            type="text"
            value={role}
            className="register-input"
            onChange={(e) => setRole(e.target.value)}
          />
          <div></div>
          <small className={checkRole ? "error-message" : "error-message-hide"}>
            Missing Role
          </small>
        </div>
        <div className="form-input">
          <label className="register-label">Location</label>
          <input
            type="text"
            value={location}
            className="register-input"
            onChange={(e) => setLocation(e.target.value)}
          />
          <div></div>
          <small
            className={checkLocation ? "error-message" : "error-message-hide"}
          >
            Missing location
          </small>
        </div>
        <div className="form-input" style={{ paddingBottom: "15px" }}>
          <label className="register-label">Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            className="register-input"
            onChange={(e) => setDateApplied(e.target.value)}
          />
        </div>
        <div className="form-input" style={{ paddingBottom: "15px" }}>
          <label className="register-label">Linked Accounts</label>
          <input
            type="text"
            value={linkedAccounts}
            className="register-input"
            onChange={(e) => setLinkedAccounts(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label className="register-label">Status</label>
          <select
            type="select"
            value={status}
            className="register-input"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option selected value=""></option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Technical Exam">Technical Exam</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div></div>
          <small
            className={checkStatus ? "error-message" : "error-message-hide"}
          >
            Missing status
          </small>
        </div>
        <div className="register-button">
          <input type="submit" value="Add" className="custom-button" />
        </div>
      </form>
    </div>
  );
};

export default Modal;
