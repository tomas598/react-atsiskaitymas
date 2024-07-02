import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export const Display6 = () => {
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState(null);
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

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {listings.map((listing, index) => (
          <div className="col-6" key={listing.id}>
            <div className="listing d-flex justify-content-center align-items-center">
              {index === 0 ||
              index % 3 === 0 ||
              index % 4 === 0 ||
              index / 7 === 1 ||
              index / 8 === 1 ||
              index / 11 === 1 ||
              index / 12 === 1 ||
              index / 15 === 1 ||
              index / 16 === 1 ? (
                <img
                  src={listing.url}
                  alt="logo"
                  style={{
                    width: "450px",
                    height: "450px",
                    borderRadius: "100%",
                  }}
                />
              ) : (
                <img
                  src={listing.url}
                  alt="logo"
                  style={{
                    width: "450px",
                    height: "450px",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
