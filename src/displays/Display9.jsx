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

export const Display9 = () => {
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
      setShowModal(false); // Close modal after deletion
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
      <div className="row g-4">
        {listings.map((listing, index) => (
          <div
            key={listing.id}
            className={`col-md-6 ${index % 3 === 2 ? "h-auto" : "h-25"}`}
          >
            <div className="card position-relative h-100">
              <img
                src={listing.url}
                alt="Listing"
                className={`img-fluid ${
                  index === 3 || index === 0 ? "w-100" : "w-50"
                }`}
                style={{
                  objectFit: "cover",

                  cursor: "pointer",
                }}
                onClick={() => handleShowModal(listing.url, listing.id)}
              />
              <button
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-3"
                onClick={() => handleDelete(listing.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="img-fluid"
              style={{ maxHeight: "70vh", width: "100%", objectFit: "contain" }}
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
