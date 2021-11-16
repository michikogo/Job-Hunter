import React from "react";

import { trash, trashHover, edit, editHover } from "../../Assets/index";

const Table = ({ userData }) => {
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
              <td className="dashboard-col">{e.companyName}</td>
              <td className="dashboard-col">{e.role}</td>
              <td className="dashboard-col">{e.location}</td>
              <td className="dashboard-col">{e.dateApplied}</td>
              <td className="dashboard-col">{e.linkedAccounts}</td>
              <td className="dashboard-col">{e.status}</td>
              <td style={{ width: "3rem", textAlign: "center" }}>
                <span style={{ margin: "0px 2px" }}>
                  <img
                    src={edit}
                    className="dashboard-edit"
                    onMouseOver={(e) => (e.currentTarget.src = editHover)}
                    onMouseOut={(e) => (e.currentTarget.src = edit)}
                  />
                </span>
                <span style={{ margin: "0px 2px" }}>
                  <img
                    src={trash}
                    className="dashboard-trash"
                    onMouseOver={(e) => (e.currentTarget.src = trashHover)}
                    onMouseOut={(e) => (e.currentTarget.src = trash)}
                  />
                </span>
              </td>
            </tr>
          );
        })}
    </table>
  );
};

export default Table;
