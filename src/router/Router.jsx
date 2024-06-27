import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/login/Login";
import { Register } from "../components/register/Register";
import { Home } from "../components/home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
