import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export const Display9 = () => {
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

      // Sorting the listingsList by a specific order, assuming 'order' is a field in your Firestore document
      listingsList.sort((a, b) => a.order - b.order);

      setListings(listingsList);
    };

    fetchListings();
  }, [userId]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {listings.map((listing) => (
          <div className="col-6" key={listing.id}>
            <div className="listing d-flex justify-content-center align-items-center">
              <img src={listing.url} alt="Listing" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
