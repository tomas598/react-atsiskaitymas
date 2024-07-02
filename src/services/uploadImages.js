import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function addListing(listing) {
  try {
    const docRef = await addDoc(collection(db, "listings"), listing);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
