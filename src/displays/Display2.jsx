import React, { useState, useEffect, useRef } from "react";
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

export const Display2 = () => {
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const rowRefs = useRef([]);

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

  useEffect(() => {
    const setRowHeights = () => {
      rowRefs.current.forEach((rowRef) => {
        const images = Array.from(rowRef.querySelectorAll("img"));
        if (images.length === 0) return;
        let maxHeight = 0;
        images.forEach((img) => {
          const height = img.offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        });
        images.forEach((img) => {
          img.style.height = `${maxHeight}px`;
        });
      });
    };

    setRowHeights();

    const handleResize = () => {
      setRowHeights();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [listings]);

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
          <div
            className="col-6  mb-4"
            key={listing.id}
            ref={(el) => (rowRefs.current[index] = el)}
          >
            <div className="listing">
              <img
                src={listing.url}
                alt="logo"
                className="img-fluid rounded"
                style={{
                  height: "600px",
                  width: "100%",
                  objectFit: "cover",
                }}
                onClick={() => handleShowModal(listing.url, listing.id)}
              />
              <button
                onClick={() => handleDelete(listing.id)}
                className="delete-btn"
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
              className="img-fluid"
              style={{ maxHeight: "470px", width: "100%", objectFit: "cover" }}
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

export default Display2;
