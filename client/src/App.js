import React from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
