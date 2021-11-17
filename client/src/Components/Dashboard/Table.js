import React, { useState, useEffect } from "react";

import {
  trash,
  trashHover,
  edit,
  editHover,
  downActive,
  upActive,
} from "../../Assets/index";

const Table = ({
  userData,
  currentID,
  setCurrentID,
  refresh,
  setRefresh,
  searchCompanyName,
}) => {
  const [updateCompanyName, setUpdateCompanyName] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateDateApplied, setUpdateDateApplied] = useState("");
  const [updateLinkedAccounts, setUpdateLinkedAccounts] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  const [sortCompanyName, setSortCompanyName] = useState("");
  const [sortDateApplied, setSortDateApplied] = useState("");
  const [sortStatus, setSortStatus] = useState("");

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
    <div style={{ overflowY: "scroll" }}>
      <table class="dashboard-table">
        <tr>
          <th style={{ textAlign: "center" }}>
            Company Name
            <span>
              <img
                src={upActive}
                width="10"
                onClick={() => setSortCompanyName("asc")}
                onDoubleClick={() => setSortCompanyName("")}
              />
              <img
                src={downActive}
                width="10"
                onClick={() => setSortCompanyName("desc")}
                onDoubleClick={() => setSortCompanyName("")}
              />
            </span>
          </th>
          <th style={{ textAlign: "center" }}>Role</th>
          <th style={{ textAlign: "center" }}>Location</th>
          <th style={{ textAlign: "center" }}>
            Date Applied
            <span>
              <img
                src={upActive}
                width="10"
                onClick={() => setSortDateApplied("asc")}
                onDoubleClick={() => setSortDateApplied("")}
              />
              <img
                src={downActive}
                width="10"
                onClick={() => setSortDateApplied("desc")}
                onDoubleClick={() => setSortDateApplied("")}
              />
            </span>
          </th>
          <th style={{ textAlign: "center" }}>Linked Accounts</th>
          <th style={{ textAlign: "center" }}>
            Status
            <span>
              <img
                src={upActive}
                width="10"
                onClick={() => setSortStatus("asc")}
                onDoubleClick={() => setSortStatus("")}
              />
              <img
                src={downActive}
                width="10"
                onClick={() => setSortStatus("desc")}
                onDoubleClick={() => setSortStatus("")}
              />
            </span>
          </th>
          <th style={{ textAlign: "center" }}>Action</th>
        </tr>
        {userData &&
          userData
            .filter((e, i) => {
              // searching thru company name
              return e.companyName
                .toLowerCase()
                .includes(searchCompanyName.replace(/\s+/g, "").toLowerCase());

              // const resultInput = (
              //   value.firstName.toLowerCase() + value.lastName.toLowerCase()
              // ).includes(searchInput.replace(/\s+/g, "").toLowerCase());

              // const resultType = value.tag.toString().search(searchType) !== -1;

              // if (searchType) {
              //   return resultType;
              // }

              // // if (searchInput && searchType) {
              //   return resultInput && resultType;
              // } else if (searchType) {
              //   return resultType;
              // } else if (searchInput) {
              //   return resultInput;
              // } else return value;
            })
            .sort((firstelement, secondelement) => {
              if (sortCompanyName === "asc") {
                return firstelement.companyName > secondelement.companyName
                  ? 1
                  : -1;
              } else if (sortCompanyName === "desc") {
                return firstelement.companyName < secondelement.companyName
                  ? 1
                  : -1;
              }

              if (sortDateApplied === "asc") {
                return firstelement.dateApplied > secondelement.dateApplied
                  ? 1
                  : -1;
              } else if (sortDateApplied === "desc") {
                return firstelement.dateApplied < secondelement.dateApplied
                  ? 1
                  : -1;
              }

              if (sortStatus === "asc") {
                return firstelement.status > secondelement.status ? 1 : -1;
              } else if (sortStatus === "desc") {
                return firstelement.status < secondelement.status ? 1 : -1;
              }
            })
            .map((e, i) => {
              {
                console.log(searchCompanyName);
              }
              return (
                <tr key={i}>
                  <td className="dashboard-col">
                    {currentID === i ? (
                      <div>
                        <input
                          type="text"
                          placeholder={e.companyName}
                          value={updateCompanyName}
                          className="register-input"
                          style={{ width: "10rem" }}
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
                          className="register-input"
                          style={{ width: "10rem" }}
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
                          className="register-input"
                          style={{ width: "10rem" }}
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
                          className="register-input"
                          style={{ width: "10rem" }}
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
                          className="register-input"
                          style={{ width: "10rem" }}
                          onChange={(e) =>
                            setUpdateLinkedAccounts(e.target.value)
                          }
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
                          className="register-input"
                          style={{ width: "10rem" }}
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
                  <td className={"table-action"}>
                    {currentID === i ? (
                      <>
                        <div style={{ textAlign: "right" }}>
                          <input
                            type="submit"
                            value="Update"
                            className="custom-button"
                            onClick={() => handleEdit(e._id)}
                          />
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <input
                            type="submit"
                            value="Cancel"
                            style={{ marginTop: "0.5rem" }}
                            className="custom-button"
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
                            onMouseOver={(e) =>
                              (e.currentTarget.src = editHover)
                            }
                            onMouseOut={(e) => (e.currentTarget.src = edit)}
                          />
                        </span>
                        <span style={{ margin: "0px 2px" }}>
                          <img
                            src={trash}
                            className="dashboard-trash"
                            onClick={() => handleDelete(e._id)}
                            onMouseOver={(e) =>
                              (e.currentTarget.src = trashHover)
                            }
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
    </div>
  );
};

export default Table;
