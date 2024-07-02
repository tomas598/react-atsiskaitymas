import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export const Display4 = () => {
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
        {listings.map((listing) => (
          <div className="col-12" key={listing.id}>
            <div className="listing d-flex justify-content-center align-items-center">
              <img
                src={listing.url}
                alt="logo"
                style={{
                  width: "600px",
                  height: "600px",

                  marginTop: "130px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
