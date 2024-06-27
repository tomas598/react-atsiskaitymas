import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzQ_2h4zi7zRCmYOXWUZ73O88F31f33co",
  authDomain: "react-atsiskaitymas.firebaseapp.com",
  projectId: "react-atsiskaitymas",
  storageBucket: "react-atsiskaitymas.appspot.com",
  messagingSenderId: "243279265555",
  appId: "1:243279265555:web:b98c377e1aa47971dda4e6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
