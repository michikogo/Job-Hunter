import React, { useState } from "react";

import TableButtons from "./TableButtons";

const TableContents = ({
  regenerate,
  setRegenerate,
  e,
  i,
  showModal,
  currentID,
  setCurrentID,
}) => {
  const initialUpdate = {
    updateCompanyName: "",
    updateRole: "",
    updateLocation: "",
    updateDateApplied: "",
    updateLinkedAccounts: "",
    updateStatus: "",
  };
  const [updateRow, setUpdateRow] = useState(initialUpdate);

  // Used when editing rows
  const updateOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateRow((prev) => ({ ...prev, [name]: value }));
  };
  // Remove Inputs when cancel or submit
  const handleCancel = () => {
    setCurrentID("");
    setUpdateRow((prev) => ({
      ...prev,
      initialUpdate,
    }));
    setRegenerate(!regenerate);
  };

  // Send updated data to backend
  const handleEdit = async (id) => {
    const updateData = {
      companyName: updateRow.updateCompanyName,
      role: updateRow.updateRole,
      location: updateRow.updateLocation,
      dateApplied: updateRow.updateDateApplied,
      linkedAccounts: updateRow.updateLinkedAccounts,
      status: updateRow.updateStatus,
    };
    const req = await fetch(`http://localhost:8000/directory/contents/${id}`, {
      // const req = await fetch(`/directory/contents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(updateData),
    });
    const data = await req.json();
    console.log(data);
    if (data.status === "ok") {
      handleCancel();
    } else {
      alert(data.error);
    }
  };
  // Let backend know that delete the id
  const handleDelete = (id) => {
    // fetch(`/directory/contents/${id}`, {
    fetch(`http://localhost:8000/directory/contents/${id}`, {
      method: "DELETE",
    });
    setRegenerate(!regenerate);
  };

  return (
    <>
      <td>
        {currentID === i ? (
          <div>
            <input
              name="updateCompanyName"
              type="text"
              placeholder={e.companyName}
              value={updateRow.updateCompanyName}
              className="register-input"
              style={{ width: "10rem" }}
              onChange={updateOnChange}
            />
          </div>
        ) : (
          <p>{e.companyName}</p>
        )}
      </td>
      <td>
        {currentID === i ? (
          <div>
            <input
              name="updateRole"
              type="text"
              placeholder={e.role}
              value={updateRow.updateRole}
              className="register-input"
              style={{ width: "10rem" }}
              onChange={updateOnChange}
            />
          </div>
        ) : (
          <p>{e.role}</p>
        )}
      </td>
      <td>
        {currentID === i ? (
          <div>
            <input
              name="updateLocation"
              type="text"
              placeholder={e.location}
              value={updateRow.updateLocation}
              className="register-input"
              style={{ width: "10rem" }}
              onChange={updateOnChange}
            />
          </div>
        ) : (
          <p>{e.location}</p>
        )}
      </td>
      <td>
        {currentID === i ? (
          <div>
            <input
              name="updateDateApplied"
              type="date"
              placeholder={e.dateApplied}
              value={updateRow.updateDateApplied}
              className="register-input"
              style={{ width: "10rem" }}
              onChange={updateOnChange}
            />
          </div>
        ) : (
          <p>{e.dateApplied}</p>
        )}
      </td>
      <td>
        {currentID === i ? (
          <div>
            <input
              name="updateLinkedAccounts"
              type="text"
              placeholder={e.linkedAccounts}
              value={updateRow.updateLinkedAccounts}
              className="register-input"
              style={{ width: "10rem" }}
              onChange={updateOnChange}
            />
          </div>
        ) : e.linkedAccounts.startsWith("https") ||
          e.linkedAccounts.startsWith("http") ? (
          <a href={e.linkedAccounts} target="_blank">
            <p>{e.linkedAccounts}</p>
          </a>
        ) : (
          <p>{e.linkedAccounts}</p>
        )}
      </td>
      <td>
        {currentID === i ? (
          <div>
            <select
              name="updateStatus"
              type="select"
              placeholder={e.status}
              value={updateRow.updateStatus}
              className="register-input"
              style={{ width: "10rem" }}
              onChange={updateOnChange}
            >
              <option defaultValue value=""></option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Technical Exam">Technical Exam</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ) : (
          <>
            {e.status === "Applied" && (
              <p className="table-applied">{e.status}</p>
            )}
            {e.status === "Interview" && (
              <p className="table-interview">{e.status}</p>
            )}
            {e.status === "Technical Exam" && (
              <p className="table-technicalExam">{e.status}</p>
            )}
            {e.status === "Offer" && <p className="table-offer">{e.status}</p>}
            {e.status === "Rejected" && (
              <p className="table-reject">{e.status}</p>
            )}
          </>
        )}
      </td>
      <td className="table-action">
        <TableButtons
          i={i}
          e={e}
          showModal={showModal}
          currentID={currentID}
          setCurrentID={setCurrentID}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      </td>
    </>
  );
};

export default TableContents;
