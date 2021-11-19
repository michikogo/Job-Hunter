import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const Welcome = ({ username, showModal, setShowModal }) => {
  // store picked quote
  const [pickedQuote, setPickedQuote] = useState([]);
  // state of modal
  const handleShow = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  // fetch quote
  useEffect(() => {
    const dailyQuote = async () => {
      const response = await fetch("https://type.fit/api/quotes");
      var data = await response.json();
      const i = Math.floor(Math.random() * data.length);
      // console.log(data[i])
      setPickedQuote(data[i]);
    };
    dailyQuote();
  }, []);

  return (
    <div
      className={
        showModal ? "dashboard-container modal-grey" : "dashboard-container"
      }
    >
      <div className="dashboard-button">
        <div className="dashboard-button-small-view">
          {showModal ? (
            <input
              type="submit"
              value="Add"
              className="dashboard-button-disabled"
            />
          ) : (
            <input
              type="submit"
              value="Add"
              className="custom-button"
              onClick={handleShow}
            />
          )}
        </div>
      </div>
      <div className="dashboard-grid">
        <h2>Hello {username}</h2>
        <div className="dashboard-button">
          <div className="dashboard-button-normal-view">
            {showModal ? (
              <input
                type="submit"
                value="Add Application"
                className="dashboard-button-disabled"
              />
            ) : (
              <input
                type="submit"
                value="Add Application"
                className="custom-button"
                onClick={handleShow}
              />
            )}
          </div>
        </div>
      </div>
      {pickedQuote && (
        <div className="quote-container">
          <div>
            <span>Remember </span>
            {pickedQuote.author === null ? (
              <span>this:</span>
            ) : (
              <span>
                <i>{pickedQuote.author}</i> once said:
              </span>
            )}
          </div>
          <div className="quote-text">
            <h4>{pickedQuote.text}</h4>
          </div>
          <div>Good Luck! You got this!</div>
        </div>
      )}
      <div className="modal-position">
        {showModal && <Modal handleClose={handleClose} />}
      </div>
    </div>
  );
};

export default Welcome;
