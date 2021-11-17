import React, { useState, useEffect } from "react";

import { trash, trashHover, edit, editHover } from "../../Assets/index";

const Table = ({ userData, refresh, setRefresh }) => {
  const [currentID, setCurrentID] = useState("");
  const [updateCompanyName, setUpdateCompanyName] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateDateApplied, setUpdateDateApplied] = useState("");
  const [updateLinkedAccounts, setUpdateLinkedAccounts] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  const handleEdit = async (id) => {
    console.log(id);
    console.log(updateCompanyName);
    console.log(updateRole);
    console.log(updateLocation);
    console.log(updateDateApplied);
    console.log(updateLinkedAccounts);
    console.log(updateStatus);

    const updateData = {
      companyName: updateCompanyName,
      role: updateRole,
      location: updateLocation,
      dateApplied: updateDateApplied,
      linkedAccounts: updateLinkedAccounts,
      status: updateStatus,
    };
    const req = await fetch(`http://localhost:5000/directory/contents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(updateData),
    });

    const data = await req.json();

    if (data.status === "ok") {
      console.log(data);
      handleCancel();
    } else {
      alert(data.error);
    }
  };

  const handleCancel = () => {
    setCurrentID("");
    setUpdateCompanyName("");
    setUpdateRole("");
    setUpdateLocation("");
    setUpdateDateApplied("");
    setUpdateLinkedAccounts("");
    setUpdateStatus("");
    setRefresh(!refresh);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/directory/contents/${id}`, {
      method: "DELETE",
    });
    setRefresh(!refresh);
  };

  return (
    <table class="dashboard-table">
      <tr>
        <th style={{ textAlign: "center" }}>Company Name</th>
        <th style={{ textAlign: "center" }}>Role</th>
        <th style={{ textAlign: "center" }}>Location</th>
        <th style={{ textAlign: "center" }}>Date Applied</th>
        <th style={{ textAlign: "center" }}>Linked Accounts</th>
        <th style={{ textAlign: "center" }}>Status</th>
        <th style={{ textAlign: "center" }}>Action</th>
      </tr>
      {userData &&
        userData.map((e, i) => {
          return (
            <tr key={i}>
              <td className="dashboard-col">
                {currentID === i ? (
                  <div>
                    <input
                      type="text"
                      placeholder={e.companyName}
                      value={updateCompanyName}
                      onChange={(e) => setUpdateCompanyName(e.target.value)}
                    />
                  </div>
                ) : (
                  e.companyName
                )}
              </td>
              <td className="dashboard-col">
                {currentID === i ? (
                  <div>
                    <input
                      type="text"
                      placeholder={e.role}
                      value={updateRole}
                      onChange={(e) => setUpdateRole(e.target.value)}
                    />
                  </div>
                ) : (
                  e.role
                )}
              </td>
              <td className="dashboard-col">
                {currentID === i ? (
                  <div>
                    <input
                      type="text"
                      placeholder={e.location}
                      value={updateLocation}
                      onChange={(e) => setUpdateLocation(e.target.value)}
                    />
                  </div>
                ) : (
                  e.location
                )}
              </td>
              <td className="dashboard-col">
                {currentID === i ? (
                  <div>
                    <input
                      type="date"
                      placeholder={e.dateApplied}
                      value={updateDateApplied}
                      onChange={(e) => setUpdateDateApplied(e.target.value)}
                    />
                  </div>
                ) : (
                  e.dateApplied
                )}
              </td>
              <td className="dashboard-col">
                {currentID === i ? (
                  <div>
                    <input
                      type="text"
                      placeholder={e.linkedAccounts}
                      value={updateLinkedAccounts}
                      onChange={(e) => setUpdateLinkedAccounts(e.target.value)}
                    />
                  </div>
                ) : (
                  e.linkedAccounts
                )}
              </td>
              <td className="dashboard-col">
                {currentID === i ? (
                  <div>
                    <select
                      type="select"
                      placeholder={e.status}
                      value={updateStatus}
                      onChange={(e) => setUpdateStatus(e.target.value)}
                    >
                      <option selected value=""></option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Technical Exam">Technical Exam</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                ) : (
                  e.status
                )}
              </td>
              <td style={{ width: "3rem", textAlign: "center" }}>
                {currentID === i ? (
                  <>
                    <div style={{ textAlign: "right" }}>
                      <input
                        type="submit"
                        value="Update"
                        className="register-button"
                        onClick={() => handleEdit(e._id)}
                      />
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <input
                        type="submit"
                        value="Cancel"
                        className="register-button"
                        onClick={handleCancel}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <span style={{ margin: "0px 2px" }}>
                      <img
                        src={edit}
                        className="dashboard-edit"
                        onClick={() => setCurrentID(i)}
                        onMouseOver={(e) => (e.currentTarget.src = editHover)}
                        onMouseOut={(e) => (e.currentTarget.src = edit)}
                      />
                    </span>
                    <span style={{ margin: "0px 2px" }}>
                      <img
                        src={trash}
                        className="dashboard-trash"
                        onClick={() => handleDelete(e._id)}
                        onMouseOver={(e) => (e.currentTarget.src = trashHover)}
                        onMouseOut={(e) => (e.currentTarget.src = trash)}
                      />
                    </span>
                  </>
                )}
              </td>
            </tr>
          );
        })}
    </table>
  );
};

export default Table;
