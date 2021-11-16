import React from "react";

import { trash, trashHover, edit, editHover } from "../../Assets/index";

const Table = ({ userData }) => {
  return (
    <table class="dashboard-table">
      <tr>
        <th>Company Name</th>
        <th>Role</th>
        <th>Location</th>
        <th>Date Applied</th>
        <th>Linked Accounts</th>
        <th>Status</th>
        <th></th>
      </tr>
      {userData &&
        userData.map((e, i) => {
          return (
            <tr key={i}>
              <td>{e.companyName}</td>
              <td>{e.role}</td>
              <td>{e.location}</td>
              <td>{e.dateApplied}</td>
              <td>{e.linkedAccounts}</td>
              <td>{e.status}</td>
              <td style={{ width: "3rem", textAlign: "center" }}>
                <span style={{ margin: "0px 2px" }}>
                  <img
                    src={edit}
                    className="dashboard-edit"
                    onMouseOver={(e) => {
                      e.currentTarget.src = editHover;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.src = edit;
                    }}
                  />
                </span>
                <span style={{ margin: "0px 2px" }}>
                  <img src={trash} className="dashboard-trash" />
                </span>
              </td>
            </tr>
          );
        })}
    </table>
  );
};

export default Table;
