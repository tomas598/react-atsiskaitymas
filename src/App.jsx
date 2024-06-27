import React from "react";
import { AuthProvider } from "./context/authContext/AuthContext";
import { Header } from "./components/header/Header";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {" "}
        {/* Wrap everything inside BrowserRouter */}
        <Header />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
