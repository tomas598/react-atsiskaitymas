import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { addListing } from "../../services/uploadImages";
import { Display1 } from "../../displays/Display1";
import { Display2 } from "../../displays/Display2";
import { Display3 } from "../../displays/Display3";
import { Display4 } from "../../displays/Display4";
import { Display5 } from "../../displays/Display5";
import { Display6 } from "../../displays/Display6";
import { Display7 } from "../../displays/Display7";
import { Display8 } from "../../displays/Display8";
import { Display9 } from "../../displays/Display9";
import "../../styles/Home/Home.scss";

export const Home = () => {
  const [inputData, setInputData] = useState({
    name: "",
    url: "",
    userId: "",
  });
  const [urlValid, setUrlValid] = useState(true);
  const [listings, setListings] = useState([]);
  const [tempSelectedDisplay, setTempSelectedDisplay] = useState(null);
  const [selectedDisplay, setSelectedDisplay] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setInputData((prevData) => ({
          ...prevData,
          userId: user.uid,
        }));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsCollection = collection(db, "listings");
      const listingsSnapshot = await getDocs(listingsCollection);
      const listingsList = listingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(listingsList);
    };

    fetchListings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "url") {
      setUrlValid(value.startsWith("https://"));
    }
  };

  const handleSubmit = async () => {
    try {
      await addListing(inputData);
      setListings([...listings, inputData]);
      setInputData({ name: "", url: "", userId: inputData.userId });
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  const handleDisplayClick = (displayNum) => {
    setTempSelectedDisplay(displayNum);
  };

  const handleDisplaySave = () => {
    setSelectedDisplay(tempSelectedDisplay);
  };

  const renderSelectedDisplay = () => {
    switch (selectedDisplay) {
      case 1:
        return <Display1 />;
      case 2:
        return <Display2 />;
      case 3:
        return <Display3 />;
      case 4:
        return <Display4 />;
      case 5:
        return <Display5 />;
      case 6:
        return <Display6 />;
      case 7:
        return <Display7 />;
      case 8:
        return <Display8 />;
      case 9:
        return <Display9 />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="modal-buttons-div">
        <div className="modal-buttons-div__container">
          <button
            type="button"
            className="modal-buttons-div__container__add-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            +
          </button>

          <div
            className="modal fade"
            id="exampleModal1"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Upload a picture
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body-1 container mt-3">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name..."
                      name="name"
                      value={inputData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="url..."
                      name="url"
                      value={inputData.url}
                      onChange={handleChange}
                    />
                    {!urlValid && (
                      <div className="text-danger">Invalid URL</div>
                    )}
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button
                    type="button"
                    className="modal-buttons-div__container__add-button"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="modal-buttons-div__container__add-button"
                    onClick={handleSubmit}
                    data-bs-dismiss="modal"
                    disabled={!urlValid}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="modal-buttons-div__container__change-display-button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
          >
            Change display
          </button>

          <div
            className="modal fade"
            id="exampleModal2"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Select a display
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="modal-body__buttons">
                    <div className="modal-body__buttons__row-1">
                      <div className="modal-body__buttons__row-1__button-1">
                        <div
                          className="modal-body__buttons__row-1__button-1__square"
                          onClick={() => handleDisplayClick(1)}
                        >
                          <div className="modal-body__buttons__row-1__button-1__square__circle"></div>
                        </div>
                      </div>
                      <div
                        className="modal-body__buttons__row-1__button-2"
                        onClick={() => handleDisplayClick(2)}
                      >
                        <div className="modal-body__buttons__row-1__button-2__right-div"></div>
                        <div className="modal-body__buttons__row-1__button-2__left-div"></div>
                      </div>
                      <div
                        className="modal-body__buttons__row-1__button-3"
                        onClick={() => handleDisplayClick(3)}
                      >
                        <div className="modal-body__buttons__row-1__button-3__div-1">
                          <div className="modal-body__buttons__row-1__button-3__div-1__square-1"></div>
                          <div className="modal-body__buttons__row-1__button-3__div-1__square-2"></div>
                        </div>
                        <div className="modal-body__buttons__row-1__button-3__div-2">
                          <div className="modal-body__buttons__row-1__button-3__div-2__square-3"></div>
                          <div className="modal-body__buttons__row-1__button-3__div-2__square-4"></div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body__buttons__row-2">
                      <div
                        className="modal-body__buttons__row-2__button-1"
                        onClick={() => handleDisplayClick(4)}
                      >
                        <div className="modal-body__buttons__row-2__button-1__square"></div>
                      </div>
                      <div
                        className="modal-body__buttons__row-2__button-2"
                        onClick={() => handleDisplayClick(5)}
                      >
                        <div className="modal-body__buttons__row-2__button-2__div-1"></div>
                        <div className="modal-body__buttons__row-2__button-2__div-2"></div>
                      </div>
                      <div
                        className="modal-body__buttons__row-2__button-3"
                        onClick={() => handleDisplayClick(6)}
                      >
                        <div className="modal-body__buttons__row-2__button-3__div-1">
                          <div className="modal-body__buttons__row-2__button-3__div-1__circle"></div>
                          <div className="modal-body__buttons__row-2__button-3__div-1__square"></div>
                        </div>
                        <div className="modal-body__buttons__row-2__button-3__div-2">
                          <div className="modal-body__buttons__row-2__button-3__div-2__square"></div>
                          <div className="modal-body__buttons__row-2__button-3__div-2__circle"></div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body__buttons__row-3">
                      <div
                        className="modal-body__buttons__row-3__button-1"
                        onClick={() => handleDisplayClick(7)}
                      >
                        <div className="modal-body__buttons__row-3__button-1__div-1"></div>
                        <div className="modal-body__buttons__row-3__button-1__div-2"></div>
                      </div>
                      <div
                        className="modal-body__buttons__row-3__button-2"
                        onClick={() => handleDisplayClick(8)}
                      >
                        <div className="modal-body__buttons__row-3__button-2__div-1">
                          <div className="modal-body__buttons__row-3__button-2__div-1__element-1"></div>
                          <div className="modal-body__buttons__row-3__button-2__div-1__element-2"></div>
                        </div>
                        <div className="modal-body__buttons__row-3__button-2__div-2"></div>
                      </div>
                      <div
                        className="modal-body__buttons__row-3__button-3"
                        onClick={() => handleDisplayClick(9)}
                      >
                        <div className="modal-body__buttons__row-3__button-3__div-2"></div>
                        <div className="modal-body__buttons__row-3__button-3__div-1">
                          <div className="modal-body__buttons__row-3__button-3__div-1__element-1"></div>
                          <div className="modal-body__buttons__row-3__button-3__div-1__element-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button
                    type="button"
                    className="modal-buttons-div__container__add-button"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="modal-buttons-div__container__add-button"
                    onClick={handleDisplaySave}
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="selected-display">{renderSelectedDisplay()}</div>
    </div>
  );
};
