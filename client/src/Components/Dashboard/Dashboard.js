import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./index.css";
import Modal from "./Modal";
import Table from "./Table";
import Pagination from "./Pagination";
import { inbox } from "../../Assets";

const Dashboard = () => {
  const naviage = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [pickedQuote, setPickedQuote] = useState([]);
  const [searchCompanyName, setSearchCompanyName] = useState("");

  const [currentID, setCurrentID] = useState("");
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [refresh, setRefresh] = useState("");

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

  const dailyQuote = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    var data = await response.json();
    const i = Math.floor(Math.random() * data.length);
    console.log(data[i]);
    setPickedQuote(data[i]);
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
        dailyQuote();
      }
    } else {
      naviage("/login");
    }
  }, [showModal, refresh]);

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
    <>
      <div
        className={
          showModal
            ? "dashboard-container modal-background"
            : "dashboard-container"
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: " auto auto" }}>
          <h2 className={showModal && "modal-hide"}>Hello {username}</h2>
          {/* BUTTON ADD APPLICATION */}
          <div style={{ textAlign: "right" }}>
            <input
              type="submit"
              value="Add Application"
              className={
                showModal ? "custom-button modal-hide" : "custom-button"
              }
              onClick={handleShow}
            />
          </div>
        </div>
        {pickedQuote && (
          <div
            className={
              showModal ? "dashboard-quote modal-hide" : "dashboard-quote"
            }
          >
            <div>
              Remember
              {(
                <span>
                  <i>{pickedQuote.author}</i> once said:
                </span>
              ) || <span>this:</span>}
            </div>
            <div style={{ textAlign: "center", paddingLeft: "10px" }}>
              <h4>{pickedQuote.text}</h4>
            </div>
            <div>Good Luck! You got this!</div>
          </div>
        )}
        <div style={{ position: "relative" }}>
          {/* SHOW MODAL */}
          <div className="modal-position">
            {showModal && <Modal handleClose={handleClose} />}
          </div>
        </div>
      </div>
      {/* START OF NEW SECTION */}

      <div
        class={
          showModal
            ? "dashboard-background modal-hide modal-background"
            : "dashboard-background "
        }
      >
        {/* SEARCH */}
        <div style={{ textAlign: "left", paddingLeft: "5rem" }}>
          <label style={{ paddingRight: "20px" }} className="register-label">
            Search Company Name
          </label>
          <input
            type="search"
            className="register-input"
            value={searchCompanyName}
            style={{ width: "20rem" }}
            onChange={(e) => setSearchCompanyName(e.target.value)}
          />
        </div>
        {/* TABLE and PAGINATION */}
        {userData.length ? (
          <>
            <Table
              userData={currentPosts}
              currentID={currentID}
              setCurrentID={setCurrentID}
              setRefresh={setRefresh}
              refresh={refresh}
              searchCompanyName={searchCompanyName}
            />

            <Pagination
              currentID={currentID}
              postsPerPage={postsPerPage}
              totalPosts={userData.length}
              paginate={paginate}
            />
          </>
        ) : (
          <div style={{ padding: "10rem 0rem" }}>
            <img src={inbox} width="100" />
            <br />
            <small>Start Applying</small>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
