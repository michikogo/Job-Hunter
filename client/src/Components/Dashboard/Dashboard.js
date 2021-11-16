import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
// useHistory became useNavigate
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Table from "./Table";
import Pagination from "./Pagination";

const Dashboard = () => {
  const naviage = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const populateQuote = async () => {
    const request = await fetch("http://localhost:5000/directory/contents", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await request.json();
    console.log("here");
    console.log(data);
    setUserData(data.content);
    if (data.status === "ok") {
      setUsername(data.name);
    } else {
      alert(data.error);
    }
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

  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className={
        showModal
          ? "dashboard-container modal-background"
          : "dashboard-container"
      }
    >
      <h2 className={showModal && "modal-hide"}>Hello {username}</h2>
      <div
        // className="register-button-div"
        className={
          showModal ? "register-button-div modal-hidden" : "register-button-div"
        }
      >
        <input
          type="submit"
          value="Add Application"
          className={
            showModal ? "modal-hide register-button" : "register-button"
          }
          onClick={handleShow}
        />
      </div>
      <div style={{ position: "relative" }}>
        <div className="modal-position">
          {showModal && <Modal username={username} handleClose={handleClose} />}
        </div>
        <div
          class={
            showModal
              ? "dashboard-background dashboard-hide-modal "
              : "dashboard-background "
          }
        >
          <Table userData={currentPosts} />
        </div>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#ecfee8",
            borderRadius: "5px",
          }}
        >
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={userData.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
