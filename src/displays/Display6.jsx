import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Display6 = () => {
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setUserId(user.uid);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      if (!userId) return;
      const listingsCollection = collection(db, "listings");
      const q = query(listingsCollection, where("userId", "==", userId));
      const listingsSnapshot = await getDocs(q);
      const listingsList = listingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(listingsList);
    };
    fetchListings();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "listings", id));
      setListings(listings.filter((listing) => listing.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleShowModal = (image, id) => {
    setSelectedImage(image);
    setSelectedId(id);
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {listings.map((listing, index) => (
          <div className="col-6 position-relative" key={listing.id}>
            <div className="listing d-flex justify-content-center align-items-center">
              <img
                src={listing.url}
                alt="logo"
                style={{
                  width: "450px",
                  height: "450px",
                  objectFit: "cover",
                  borderRadius:
                    index === 0 ||
                    index % 3 === 0 ||
                    index % 4 === 0 ||
                    index / 7 === 1 ||
                    index / 8 === 1 ||
                    index / 11 === 1 ||
                    index / 12 === 1 ||
                    index / 15 === 1 ||
                    index / 16 === 1
                      ? "100%"
                      : "0",
                }}
                onClick={() => handleShowModal(listing.url, listing.id)}
              />
              <button
                onClick={() => handleDelete(listing.id)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaTrash size={24} color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "470px", height: "470px" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(selectedId)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
