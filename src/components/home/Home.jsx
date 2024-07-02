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

  const [listings, setListings] = useState([]);
  const [tempSelectedDisplay, setTempSelectedDisplay] = useState(null); // Temporary state to track selected display component
  const [selectedDisplay, setSelectedDisplay] = useState(1); // Set initial state to 1 to render Display1 by default

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
    setInputData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addListing(inputData);
      // Update listings state with the newly added item
      setListings([...listings, inputData]);
      // Reset input fields
      setInputData({ name: "", url: "", userId: inputData.userId });
    } catch (error) {
      console.error("Error adding listing:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleDisplayClick = (displayNum) => {
    setTempSelectedDisplay(displayNum); // Set the temporary selected display component
  };

  const handleDisplaySave = () => {
    setSelectedDisplay(tempSelectedDisplay); // Set the selected display component from temp
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
    <div className="container-fluid w-100">
      <div className="modal-buttons d-flex flex-direction-column w-100">
        <div className="divForAddButton d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
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
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divForAddButton d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
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
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div
                    className="display-1-logo"
                    onClick={() => handleDisplayClick(1)}
                  >
                    <div className="display-1-logo__circle"></div>
                  </div>

                  <button
                    key={2}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(2)}
                  >
                    2
                  </button>
                  <button
                    key={3}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(3)}
                  >
                    3
                  </button>
                  <button
                    key={4}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(4)}
                  >
                    4
                  </button>
                  <button
                    key={5}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(5)}
                  >
                    5
                  </button>
                  <button
                    key={6}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(6)}
                  >
                    6
                  </button>
                  <button
                    key={7}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(7)}
                  >
                    7
                  </button>
                  <button
                    key={8}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(8)}
                  >
                    8
                  </button>
                  <button
                    key={9}
                    className="btn btn-secondary"
                    onClick={() => handleDisplayClick(9)}
                  >
                    9
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
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

      {/* Render selected display component */}
      <div className="selected-display">{renderSelectedDisplay()}</div>
    </div>
  );
};
