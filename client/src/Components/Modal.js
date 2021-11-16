import React, { useState, useEffect } from "react";

const Modal = ({ username, handleClose }) => {
  const [companyName, setCompanyName] = useState("");
  const [checkCompanyName, setCheckCompanyName] = useState(false);
  const [role, setRole] = useState("");
  const [checkRole, setCheckRole] = useState(false);
  const [location, setLocation] = useState("");
  const [checkLocation, setCheckLocation] = useState(false);
  const [dateApplied, setDateApplied] = useState("");
  const [checkDateApplied, setCheckDateApplied] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState("");
  const [checkLinkedAccounts, setCheckLinkedAccounts] = useState(false);
  const [status, setStatus] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);

  const checkMissing = () => {
    if (companyName === "") {
      setCheckCompanyName(true);
    } else {
      setCompanyName(false);
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

    if (linkedAccounts === "") {
      setCheckLinkedAccounts(true);
    } else {
      setCheckLinkedAccounts(false);
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
      !checkLinkedAccounts &&
      !checkStatus
    ) {
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
    }
  };

  return (
    <div className="modal-container">
      <p className="modal-close" onClick={handleClose}>
        X
      </p>
      <h1>Add Application</h1>
      <form onSubmit={updateCode}>
        <div className="form-input">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
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
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <div></div>
          <small className={checkRole ? "error-message" : "error-message-hide"}>
            Missing Role
          </small>
        </div>
        <div className="form-input">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div></div>
          <small
            className={checkLocation ? "error-message" : "error-message-hide"}
          >
            Missing location
          </small>
        </div>
        <div className="form-input">
          <label>Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
          />
          <div></div>
          <small
            className={
              checkDateApplied ? "error-message" : "error-message-hide"
            }
          >
            Missing Date Applied
          </small>
        </div>
        <div className="form-input">
          <label>Linked Accounts</label>
          <input
            type="text"
            value={linkedAccounts}
            onChange={(e) => setLinkedAccounts(e.target.value)}
          />
          <div></div>
          <small
            className={
              checkLinkedAccounts ? "error-message" : "error-message-hide"
            }
          >
            Missing No linked accounts
          </small>
        </div>
        <div className="form-input">
          <label>Status</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div></div>
          <small
            className={checkStatus ? "error-message" : "error-message-hide"}
          >
            Missing status
          </small>
        </div>
        <div className="register-button-div">
          <input type="submit" value="Add" className="register-button" />
        </div>
      </form>
    </div>
  );
};

export default Modal;
