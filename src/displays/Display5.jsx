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

export const Display5 = () => {
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
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 g-4 justify-content-center">
        {listings.map((listing) => (
          <div key={listing.id} className="col mb-4">
            <div className="card h-100 position-relative">
              <img
                src={listing.url}
                alt="Listing"
                className="card-img-top"
                style={{ objectFit: "cover", height: "300px" }}
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
